// eslint-disable-next-line import/named
import { ClientConfig } from '@prismicio/client';
import { GetStaticProps } from 'next';
import { MicrocreditDashboard } from '../../page-components/Microcredit/Dashboard';
import Prismic from '../../lib/Prismic/Prismic';
import getTypesToFetchWithConfigs from '../../lib/Prismic/helpers/getTypesToFetchWithConfigs';

export const getStaticProps: GetStaticProps = async ({ locale: lang, previewData }) => {
    const clientOptions = previewData as ClientConfig;
    const types = getTypesToFetchWithConfigs(['website_microcredit_dashboard', 'website_stories']);

    const data = await Prismic.getByTypes({ clientOptions, lang, types });

    return {
        props: {
            data,
            page: 'microcreditDashboard'
        }
    };
};

export default MicrocreditDashboard;
