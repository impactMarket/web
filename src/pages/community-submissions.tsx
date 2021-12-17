import { CommunitySubmissions } from '../page-components';

export const getStaticProps = () => {
    return {
        props: {
            page: 'communitiySubmissions',
            wip: true
        }
    };
};

export default CommunitySubmissions;
