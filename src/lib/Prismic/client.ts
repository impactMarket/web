// eslint-disable-next-line import/named
import {
    ClientConfig,
    createClient,
    getRepositoryEndpoint
} from '@prismicio/client';
import config from '../../../prismicConfiguration';

const { accessToken, repoName } = config;
const endpoint = getRepositoryEndpoint(repoName);

const client = (options: ClientConfig = {}) =>
    createClient(endpoint, { ...options, accessToken });

export default client;
