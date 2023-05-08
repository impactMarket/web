import { ApolloClient, HttpLink, InMemoryCache, concat, gql } from '@apollo/client';
import {
    CommunityListRequestArguments,
    CommunityListRequestResponseType,
    DataResponseType,
    IClaimLocation,
    ICommunities,
    ICommunity,
    ICommunityCampaign,
    ICommunityDashboard,
    IDemographics,
    IGlobalApiResult,
    IGlobalDashboard,
    IGlobalNumbers,
    IManager,
    IMicrocredit,
    IStories
} from './types';
import { Numbers } from 'humanify-numbers';
import { RetryLink } from '@apollo/client/link/retry';
import { createQueryParamsFromObj } from '../helpers/createQueryParamsFromObj';
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
    static async getCommunities(
        requestOptions: CommunityListRequestArguments
    ): Promise<CommunityListRequestResponseType> {
        const params = ['country', 'filter', 'limit', 'name', 'offset', 'orderBy'];
        const baseOptions = { limit: 10, orderBy: 'bigger', page: 1, status: 'valid' };
        const options = Object.assign({}, baseOptions, requestOptions);
        const { page, limit } = options;

        const offset = (page - 1) * limit;
        const query = createQueryParamsFromObj({ offset, ...options }, params);
        const url = `/communities/${query}&state=base&state=ubi`;

        const response = await getRequest<{ data: ICommunities }>(url);

        const items = response?.data.rows || [];
        const count = response?.data.count;

        return { count, items, page };
    }
    static async getCommunity(communityId?: number | string): Promise<any> {
        const communityResponse = await getRequest<DataResponseType<ICommunity>>(`/community/${communityId}`);
        const managersResponse = await getRequest<DataResponseType<IManager[]>>(`/community/${communityId}/managers`);
        const dashboardResponse = await getRequest<DataResponseType<ICommunityDashboard[]>>(
            `/community/${communityId}/dashboard`
        );
        const claimLocations = await getRequest<DataResponseType<IClaimLocation[]>>(
            `/community/${communityId}/claim-location`
        );
        const campaignResponse = await getRequest<DataResponseType<ICommunityCampaign>>(
            `/community/${communityId}/campaign`
        );

        const data = {
            ...communityResponse?.data,
            campaign: campaignResponse?.data,
            claimLocations: claimLocations?.data || [],
            dashboard: dashboardResponse?.data || {},
            managers: managersResponse?.data || {}
        };

        return communityResponse?.success ? data : undefined;
    }
    static async getCommunityCount(groupBy: string = 'country'): Promise<any> {
        const response = await getRequest<DataResponseType<any>>(`/community/count?groupBy=${groupBy}`);

        return response?.data;
    }
    static async getGlobalNumbers(): Promise<IGlobalNumbers | {}> {
        const response = await getRequest<IGlobalNumbers | undefined>('/global/numbers');

        const data = response?.data || ({} as any);

        const result = {
            backers: data?.backers || null,
            beneficiaries: Numbers.stringify(+(data?.beneficiaries || 0)) || null,
            claimed: `$${Numbers.stringify(+(data?.claimed || 0))}` || null,
            communities: data?.communities || null,
            countries: data?.countries || null
        };

        return result || {};
    }
    static async getGlobalValues(): Promise<IGlobalDashboard | {}> {
        // retry with intervals
        const retry = new RetryLink({ attempts: { max: 100 }, delay: { max: 30000 } });
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
                    ubidailyEntities(first: 30, skip: 1, orderBy: id, orderDirection: desc) {
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

        const result = (await getRequest<IGlobalApiResult | undefined>('/global/status')) || {};
        const demographics = await getRequest<IDemographics[] | undefined>('/global/demographics');

        return {
            ...result,
            daily: ubiDailyEntityMonth.data.ubidailyEntities,
            demographics,
            general: ubiDailyEntityZero.data.ubidailyEntity
        };
    }
    static async getMicrocreditData(): Promise<IMicrocredit[]> {
        const result = await getRequest<IMicrocredit[]>('/protocol/microcredit');

        return result ? result : [];
    }

    static async getPendingCommunities(requestOptions: CommunityListRequestArguments): Promise<any> {
        const params = ['country', 'extended', 'filter', 'limit', 'name', 'offset', 'orderBy'];
        const baseOptions = { extended: false, limit: 4, orderBy: 'bigger', page: 1 };
        const options = Object.assign({}, baseOptions, requestOptions);
        const { page, limit } = options;

        const offset = (page - 1) * limit;
        const query = createQueryParamsFromObj({ offset, ...options }, params);
        const response = await getRequest<any | undefined>(
            `/community/list/${query}&status=pending&fields=id;requestByAddress;name;description;country;city;cover.*;contract.communityId;contract.maxClaim;contract.baseInterval;contract.claimAmount;contract.incrementInterval;proposal.*`
        );

        const items = response?.data || [];
        const count = response?.count;

        return { count, items, page };
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

        const result = await axios.post('api/subscribe', { data, recaptchaToken });

        return { success: result?.data?.success };
    }

    static async subscribeEmail(email: string): Promise<any> {
        const result = await postRequest('/subscribe', { email });

        return { success: result === 'OK' };
    }
}
