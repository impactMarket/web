import { Community } from '../../page-components';
import Api from '../../apis/api';

type ServerSideProps = {
    query?: {
        communityId?: string | number;
    };
};

export const getServerSideProps = async (serverSideProps: ServerSideProps) => {
    const communityId = serverSideProps?.query?.communityId;
    const data = await Api.getCommunity(communityId);

    if (!data) {
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
