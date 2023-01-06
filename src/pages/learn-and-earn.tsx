// eslint-disable-next-line import/named
// eslint-disable-next-line import/named
import { ClientConfig } from '@prismicio/client';
import { GetStaticProps } from 'next';
import { LearnAndEarn } from '../page-components';
import Prismic from '../lib/Prismic/Prismic';
import getTypesToFetchWithConfigs from '../lib/Prismic/helpers/getTypesToFetchWithConfigs';

export const getStaticProps: GetStaticProps = async ({ locale: lang, previewData }) => {
    const clientOptions = previewData as ClientConfig;
    const types = getTypesToFetchWithConfigs(['website_learn_and_earn']);

    const data = await Prismic.getByTypes({ clientOptions, lang, types });

    return {
        props: {
            data,
            page: 'learnAndEarn'
        }
    };
};

export default LearnAndEarn;
