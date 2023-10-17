import {
    ApolloClient,
    HttpLink,
    InMemoryCache,
    concat,
    gql
} from '@apollo/client';
import {
    IClaimLocation,
    IDemographics,
    IGlobalApiResult,
    IGlobalDashboard,
    IGlobalNumbers,
    IMicrocredit,
    IMicrocreditDemographics,
    IStories
} from './types';
import { Numbers } from 'humanify-numbers';
import { RetryLink } from '@apollo/client/link/retry';
import { getRequest, postRequest } from './client';
import axios from 'axios';
import config from '../../config';

export default class Api {
    static async createUser(address: any): Promise<any> {
        const result = await postRequest('/users', { address });

        return result ? result : [];
    }

    static async getAllClaimLocation(): Promise<IClaimLocation[]> {
        const result = await getRequest<IClaimLocation[]>('/claims-location');

        return result ? result : [];
    }
    static async getGlobalNumbers(): Promise<IGlobalNumbers | {}> {
        const response = await getRequest<IGlobalNumbers | undefined>(
            '/global/numbers'
        );

        const data = response?.data || ({} as any);

        const result = {
            backers: data?.backers || null,
            beneficiaries:
                Numbers.stringify(+(data?.beneficiaries || 0)) || null,
            claimed: `$${Numbers.stringify(+(data?.claimed || 0))}` || null,
            communities: data?.communities || null,
            countries: data?.countries || null
        };

        return result || {};
    }
    static async getGlobalValues(): Promise<IGlobalDashboard | {}> {
        // retry with intervals
        const retry = new RetryLink({
            attempts: { max: 100 },
            delay: { max: 30000 }
        });
        const http = new HttpLink({ uri: config.subgraphUrl });
        const link = concat(retry, http);
        const client = new ApolloClient({
            cache: new InMemoryCache(),
            link
        });

        const ubiDailyEntityZero = await client.query({
            query: gql`
                query GetUbiDaily {
                    ubidailyEntity(id: 0) {
                        claimed
                        contributed
                        contributors
                        beneficiaries
                        volume
                        transactions
                        reach
                    }
                }
            `
        });

        const ubiDailyEntityMonth = await client.query({
            query: gql`
                query GetUbiDailyMonth {
                    ubidailyEntities(
                        first: 30
                        skip: 1
                        orderBy: id
                        orderDirection: desc
                    ) {
                        id
                        claimed
                        claims
                        beneficiaries
                        contributed
                        contributors
                        fundingRate
                        volume
                        transactions
                        reach
                    }
                }
            `
        });

        const result =
            (await getRequest<IGlobalApiResult | undefined>(
                '/global/status'
            )) || {};
        const demographics = await getRequest<IDemographics[] | undefined>(
            '/global/demographics'
        );

        return {
            ...result,
            daily: ubiDailyEntityMonth.data.ubidailyEntities,
            demographics,
            general: ubiDailyEntityZero.data.ubidailyEntity
        };
    }
    static async getMicrocreditData(): Promise<IMicrocredit[]> {
        const result = await getRequest<IMicrocredit[]>(
            '/protocol/microcredit'
        );

        return result ? result : [];
    }
    static async getMicrocreditDemographics(): Promise<
        IMicrocreditDemographics[]
    > {
        const result = await getRequest<IMicrocreditDemographics[]>(
            '/microcredit/demographics'
        );

        return result ? result : [];
    }

    static async getStories(): Promise<IStories[]> {
        const result = await getRequest<IStories[]>('/stories?limit=3');

        return result ? result : [];
    }
    static async submitHubspotContact({
        email,
        name,
        recaptchaToken
    }: {
        email: string;
        name: string;
        recaptchaToken: string;
    }): Promise<any> {
        const fields = [
            { name: 'email', value: email },
            { name: 'firstname', value: name }
        ];

        const context = {
            pageName: 'Homepage',
            pageUri: 'https://impactMarket.com'
        };

        const date = new Date();
        const submittedAt = date.getTime();

        const data = { context, fields, submittedAt };

        const result = await axios.post('api/subscribe', {
            data,
            recaptchaToken
        });

        return { success: result?.data?.success };
    }

    static async subscribeEmail(email: string): Promise<any> {
        const result = await postRequest('/subscribe', { email });

        return { success: result === 'OK' };
    }
}
