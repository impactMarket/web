// eslint-disable-next-line import/named
import { ClientConfig } from '@prismicio/client';
import { CryptoHub } from '../page-components';
import { GetStaticProps } from 'next';
import Prismic from '../lib/Prismic/Prismic';
import getTypesToFetchWithConfigs from '../lib/Prismic/helpers/getTypesToFetchWithConfigs';

export const getStaticProps: GetStaticProps = async ({ locale: lang, previewData }) => {
    const clientOptions = previewData as ClientConfig;
    const types = getTypesToFetchWithConfigs(['website_crypto_hub', 'website_staking', 'website_stories']);

    const data = await Prismic.getByTypes({ clientOptions, lang, types });

    return {
        props: {
            data,
            page: 'cryptoHub'
        }
    };
};

export default CryptoHub;
