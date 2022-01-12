import { CommunitySubmissions } from '../page-components';

export const getStaticProps = () => {
    return {
        props: {
            page: 'communitySubmissions'
        }
    };
};

export default CommunitySubmissions;
