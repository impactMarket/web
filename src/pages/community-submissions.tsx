import { CommunitySubmissions } from '../page-components';
import { GetStaticProps } from 'next';
import Prismic from '../lib/Prismic/Prismic';
import getTypesToFetchWithConfigs from '../lib/Prismic/helpers/getTypesToFetchWithConfigs';

export const getStaticProps: GetStaticProps = async ({ locale: lang, previewData }) => {
    const clientOptions = previewData ? { ref: previewData } : null;

    const types = getTypesToFetchWithConfigs(['website_community_submissions_page']);

    const data = await Prismic.getByTypes({ clientOptions, lang, types });

    return {
        props: {
            data,
            page: 'communitySubmissions'
        }
    };
};

export default CommunitySubmissions;
