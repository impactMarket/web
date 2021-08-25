import axios from 'axios';
import config from '../../config';

let cachedClient: any = null;

const getClient = (forceStaging?: boolean) => {
    if (cachedClient) {
        return cachedClient;
    }

    cachedClient = axios.create({
        baseURL: forceStaging ? config.stagingApiUrl : config.baseApiUrl
    });

    return cachedClient;
};

export async function getRequest<T>(endpoint: string, forceStaging: boolean = false): Promise<T | undefined> {
    const client = getClient(forceStaging);
    let response: T | undefined;

    try {
        const result = await client.get(endpoint);

        if (result.status >= 400) {
            return undefined;
        }

        if (result.data === '') {
            response = undefined;
        } else {
            response = result.data as T;
        }
    } catch (error) {
        // TODO: handle error
        // console.log(error);
    }

    return response;
}

export async function postRequest<T>(endpoint: string, body: object): Promise<T | undefined> {
    const client = getClient();
    let response: T | undefined;

    try {
        const result = await client.post(endpoint, body);

        if (result.status >= 400) {
            return undefined;
        }
        if (result.data === '') {
            response = undefined;
        } else {
            response = result.data as T;
        }
    } catch (error) {
        // TODO: handle error
        // console.log(error);
    }

    return response;
}
