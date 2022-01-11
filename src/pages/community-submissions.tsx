import { CommunitySubmissions } from '../page-components';

export const getStaticProps = () => {
    return {
        props: {
            page: 'communitySubmissions',
            wip: true
        }
    };
};

export default CommunitySubmissions;
