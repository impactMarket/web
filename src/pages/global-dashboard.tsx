// eslint-disable-next-line import/named
import { ClientConfig } from '@prismicio/client';
import { GetServerSideProps } from 'next';
import { GlobalDashboard } from '../page-components';
import Api from '../apis/api';
import Prismic from '../lib/Prismic/Prismic';
import getTypesToFetchWithConfigs from '../lib/Prismic/helpers/getTypesToFetchWithConfigs';

export const getServerSideProps: GetServerSideProps = async ({ locale: lang, previewData }) => {
    const clientOptions = previewData as ClientConfig;

    const types = getTypesToFetchWithConfigs(['website_global_dashboard_page', 'website_stories']);

    const data = await Prismic.getByTypes({ clientOptions, lang, types });

    const dataFromApi = await Api.getGlobalValues();

    return {
        props: {
            data: {
                ...data,
                dataFromApi
            },
            page: 'globalDashboard',
            revalidate: 10
        }
    };
};

export default GlobalDashboard;
