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
    IManager
} from './types';
import { Numbers } from 'humanify-numbers';
import { createQueryParamsFromObj } from '../helpers/createQueryParamsFromObj';
import { getRequest, postRequest } from './client';
import axios from 'axios';

export default class Api {
    static async getAllClaimLocation(): Promise<IClaimLocation[]> {
        const result = await getRequest<IClaimLocation[]>('/claim-location');

        return result ? result : [];
    }

    static async getCommunities(
        requestOptions: CommunityListRequestArguments
    ): Promise<CommunityListRequestResponseType> {
        const params = ['country', 'extended', 'filter', 'limit', 'name', 'offset', 'orderBy'];
        const baseOptions = { extended: false, limit: 10, orderBy: 'bigger', page: 1 };
        const options = Object.assign({}, baseOptions, requestOptions);
        const { page, limit } = options;

        const offset = (page - 1) * limit;
        const query = createQueryParamsFromObj({ offset, ...options }, params);
        const url = `/community/list/${query}`;

        const response = await getRequest<ICommunities>(url);

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
        const result = (await getRequest<IGlobalApiResult | undefined>('/global/status')) || {};
        const demographics = await getRequest<IDemographics[] | undefined>('/global/demographics');

        return { ...result, demographics };
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
