import { Homepage } from '../page-components';

export const getStaticProps = () => {
    return {
        props: {
            page: 'homepage'
        }
    };
};

export default Homepage;
