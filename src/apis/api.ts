import {
    DataResponseType,
    IClaimLocation,
    ICommunities,
    ICommunity,
    ICommunityDashboard,
    IDemographics,
    IGlobalApiResult,
    IGlobalDashboard,
    IManager
} from './types';
import { getRequest, postRequest } from './client';

export default class Api {
    static async getAllClaimLocation(): Promise<IClaimLocation[]> {
        const result = await getRequest<IClaimLocation[]>('/claim-location');

        return result ? result : [];
    }

    static async getCommunities(
        { filter = '', limit = 10, page = 0 } = { filter: '', limit: 10, page: 0 }
    ): Promise<any> {
        const offset = (page - 1) * limit;

        const response = await getRequest<ICommunities>(
            `/community/list/?offset=${offset}&limit=${limit}&filter=${filter}`
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

        const data = {
            ...communityResponse?.data,
            dashboard: dashboardResponse?.data || {},
            managers: managersResponse?.data || {}
        };

        return communityResponse?.success ? data : undefined;
    }

    static async getGlobalValues(): Promise<IGlobalDashboard | {}> {
        const result = (await getRequest<IGlobalApiResult | undefined>('/global/status')) || {};
        const demographics = await getRequest<IDemographics[] | undefined>('/global/demographics');

        return { ...result, demographics };
    }

    static async listCommunities(order: string): Promise<ICommunity[]> {
        const result = await getRequest<ICommunity[]>(`/community/list/full/${order}`);

        return result ? result : [];
    }

    static async subscribeEmail(email: string): Promise<any> {
        const result = await postRequest('/subscribe', { email });

        return { success: result === 'OK' };
    }
}
