import { CommunitySubmissions } from '../page-components';

export const getStaticProps = () => {
    return {
        props: {
            page: 'communitiySubmissions'
        }
    };
};

export default CommunitySubmissions;
