import { Community } from '../../page-components';
import { getServerSideString } from '../../components/TranslationProvider/TranslationProvider';
import Api from '../../apis/api';

type ServerSideProps = {
    query?: {
        communityId?: string | number;
    };
    locale: string;
};

const communitiesErrorStatus = ['removed'];
const communitiesHiddenStatus = ['private'];

export const getServerSideProps = async (serverSideProps: ServerSideProps) => {
    const communityId = serverSideProps?.query?.communityId;
    const locale = serverSideProps?.locale;
    const data = await Api.getCommunity(communityId);
    const status = data?.status;
    const visibility = data?.visibility;
    const withError = communitiesErrorStatus.includes(status) || communitiesHiddenStatus.includes(visibility);

    if (!data || withError) {
        return {
            props: {
                statusCode: 404
            }
        };
    }

    const { name, description, cover } = data;
    const title = getServerSideString(locale, 'communityTitle', { name });
    const image = cover?.url;

    return {
        props: {
            data,
            meta: {
                description,
                image,
                title
            },
            page: 'community'
        }
    };
};

export default Community;
