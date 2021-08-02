import {
    DataResponseType,
    IClaimLocation,
    ICommunities,
    ICommunity,
    ICommunityDashboard,
    IDemographics,
    IGlobalApiResult,
    IGlobalDashboard,
    IGlobalNumbers,
    IManager
} from './types';
import { Numbers } from 'humanify-numbers';
import { getRequest, postRequest } from './client';
import axios from 'axios';

export default class Api {
    static async getAllClaimLocation(): Promise<IClaimLocation[]> {
        const result = await getRequest<IClaimLocation[]>('/claim-location');

        return result ? result : [];
    }

    static async getCommunities(
        { extended = false, filter = '', limit = 10, name = '', orderBy = 'bigger', page = 1 }: any = {
            extended: false,
            filter: '',
            limit: 10,
            name: '',
            orderBy: 'bigger',
            page: 1
        }
    ): Promise<any> {
        const offset = (page - 1) * limit;

        const response = await getRequest<ICommunities>(
            `/community/list/?offset=${offset}&limit=${limit}&filter=${filter}&orderBy=${orderBy}${
                extended ? '&extended=true' : ''
            }${name ? `&name=${name}` : ''}`
        );
        const items = response?.data || [];
        const count = response?.count;

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

        const data = {
            ...communityResponse?.data,
            claimLocations: claimLocations?.data || [],
            dashboard: dashboardResponse?.data || {},
            managers: managersResponse?.data || {}
        };

        return communityResponse?.success ? data : undefined;
    }

    static async getGlobalNumbers(): Promise<IGlobalNumbers | {}> {
        const response = await getRequest<IGlobalNumbers | undefined>('/global/numbers');

        const data = response?.data;

        const result = {
            backers: data?.backers,
            beneficiaries: Numbers.stringify(+(data?.beneficiaries || 0)),
            claimed: `$${Numbers.stringify(+(data?.claimed || 0))}`,
            communities: data?.communities,
            countries: data?.countries
        };

        return result || {};
    }

    static async getGlobalValues(): Promise<IGlobalDashboard | {}> {
        const result = (await getRequest<IGlobalApiResult | undefined>('/global/status')) || {};
        const demographics = await getRequest<IDemographics[] | undefined>('/global/demographics');

        return { ...result, demographics };
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
