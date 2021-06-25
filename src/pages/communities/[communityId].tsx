import { Community } from '../../page-components';
import Api from '../../apis/api';
import { getServerSideString } from '../../components/DataProvider/DataProvider';

type ServerSideProps = {
    query?: {
        communityId?: string | number;
    };
    locale: string;
};

const communitiesErrorStatus = ['removed', 'pending'];
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

    const { name, description, coverImage: image } = data;
    const title = getServerSideString(locale, 'communityTitle', { name });

    return {
        props: {
            data,
            meta: {
              description,
              image,
              title
            },
            page: 'community',
        }
    };
};

export default Community;
