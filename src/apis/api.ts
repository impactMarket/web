import { IClaimLocation, ICommunity, IDemographics, IGlobalApiResult, IGlobalDashboard } from './types';
import { getRequest, postRequest } from './client';

export default class Api {
    static async getAllClaimLocation(): Promise<IClaimLocation[]> {
        const result = await getRequest<IClaimLocation[]>('/claim-location');

        return result ? result : [];
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
