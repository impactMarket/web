// eslint-disable-next-line import/named
import { ClientConfig } from '@prismicio/client';
import { GetStaticProps } from 'next';
import { Governance } from '../page-components';
import Prismic from '../lib/Prismic/Prismic';
import getTypesToFetchWithConfigs from '../lib/Prismic/helpers/getTypesToFetchWithConfigs';

export const getStaticProps: GetStaticProps = async ({ locale: lang, previewData }) => {
    const clientOptions = previewData as ClientConfig;

    const types = getTypesToFetchWithConfigs(['website_governance_page', 'website_dao_articles']);

    const data = await Prismic.getByTypes({ clientOptions, lang, types });

    return {
        props: {
            data,
            footerOptions: {
                whiteBackground: true
            },
            page: 'governanceToken'
        }
    };
};

export default Governance;
