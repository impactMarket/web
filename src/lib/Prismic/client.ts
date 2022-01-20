// eslint-disable-next-line import/named
import { ClientConfig, createClient, getEndpoint } from '@prismicio/client';
import config from '../../../prismicConfiguration';

const { accessToken, repoName } = config;
const endpoint = getEndpoint(repoName);

const client = (options: ClientConfig = {}) => createClient(endpoint, { ...options, accessToken });

export default client;
