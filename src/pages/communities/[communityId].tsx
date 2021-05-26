import { Community } from '../../page-components';
import Api from '../../apis/api';

type ServerSideProps = {
    query?: {
        communityId?: string | number;
    };
};

const communitiesErrorStatus = ['removed', 'pending'];
const communitiesHiddenStatus = ['private'];

export const getServerSideProps = async (serverSideProps: ServerSideProps) => {
    const communityId = serverSideProps?.query?.communityId;
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

    return {
        props: {
            data,
            page: 'community'
        }
    };
};

export default Community;
