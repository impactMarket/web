import { Communities } from '../../page-components';
import { GetStaticProps } from 'next';
import Prismic from '../../lib/Prismic/Prismic';
import getTypesToFetchWithConfigs from '../../lib/Prismic/helpers/getTypesToFetchWithConfigs';

export const getStaticProps: GetStaticProps = async ({ locale: lang, previewData }) => {
    const clientOptions = previewData ? { ref: previewData } : null;

    const types = getTypesToFetchWithConfigs(['website_homepage', 'website_dao_articles']);

    const data = await Prismic.getByTypes({ clientOptions, lang, types });

    return {
        props: {
            data,
            page: 'communities'
        }
    };
};

export default Communities;
