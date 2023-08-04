import { ClientConfig } from '@prismicio/client';
import { GetStaticProps } from 'next';
import { PrivacyPolicy } from '../../page-components/Libera/PrivacyPolicy';
import Prismic from '../../lib/Prismic/Prismic';
import getTypesToFetchWithConfigs from '../../lib/Prismic/helpers/getTypesToFetchWithConfigs';

export const getStaticProps: GetStaticProps = async ({
    locale: lang,
    previewData
}) => {
    const clientOptions = previewData as ClientConfig;
    const types = getTypesToFetchWithConfigs(['website_libera']);

    const data = await Prismic.getByTypes({ clientOptions, lang, types });

    return {
        props: {
            data,
            page: 'libera'
        }
    };
};

export default PrivacyPolicy;
