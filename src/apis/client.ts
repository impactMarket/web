import axios from 'axios';
import config from '../../config';

const { baseApiUrl: baseURL, isProduction } = config;

let cachedClient: any = null;

const getClient = () => {
    if (cachedClient) {
        return cachedClient;
    }

    cachedClient = axios.create({ baseURL });

    return cachedClient;
};

export async function getRequest<T>(endpoint: string): Promise<T | undefined> {
    const client = getClient();
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
        if (!isProduction) {
            console.log(error);
        }
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
        if (!isProduction) {
            console.log(error);
        }
    }

    return response;
}
