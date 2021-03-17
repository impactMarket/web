import { postRequest } from './client';

export default class Api {
    static async subscribeEmail(email: string): Promise<any> {
        const result = await postRequest('/subscribe', { email });

        return { success: result === 'OK' };
    }
}
