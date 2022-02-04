// eslint-disable-next-line import/named
import { ClientConfig } from '@prismicio/client';
import { Community } from '../../page-components';
import { GetStaticPaths, GetStaticProps } from 'next';
import { getServerSideString } from '../../components/TranslationProvider/TranslationProvider';
import Api from '../../apis/api';
import Prismic from '../../lib/Prismic/Prismic';
import getTypesToFetchWithConfigs from '../../lib/Prismic/helpers/getTypesToFetchWithConfigs';

const communitiesErrorStatus = ['removed'];
const communitiesHiddenStatus = ['private'];

const getCommunity = async (communityId: string | number) => {
    try {
        const dataFromApi = await Api.getCommunity(communityId);
        const status = dataFromApi?.status;
        const visibility = dataFromApi?.visibility;
        const withError = communitiesErrorStatus.includes(status) || communitiesHiddenStatus.includes(visibility);

        if (!dataFromApi || withError) {
            return false;
        }

        return dataFromApi;
    } catch (error) {
        return false;
    }
};

export const getStaticProps: GetStaticProps = async ({ locale: lang, params, previewData }) => {
    const clientOptions = previewData as ClientConfig;
    const { communityId } = params || {};

    const types = getTypesToFetchWithConfigs(['website_community_page']);

    const data = await Prismic.getByTypes({ clientOptions, lang, types });

    const community = await getCommunity(communityId as string);

    if (!community) {
        return {
            props: {
                statusCode: 404
            },
            revalidate: 3600
        };
    }

    const { name, description, cover } = community;
    const title = getServerSideString(lang, 'communityTitle', { name });
    const image = cover?.url;

    const meta = { description, image, title };

    return {
        props: {
            data: {
                ...data,
                communityDataFromApi: community
            },
            footerOptions: {
                whiteBackground: true
            },
            meta,
            page: 'community'
        },
        revalidate: 3600
    };
};

export const getStaticPaths: GetStaticPaths = () => {
    return { fallback: 'blocking', paths: [] };
};

export default Community;
