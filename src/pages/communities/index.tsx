import { Communities } from '../../page-components';

export const getStaticProps = () => {
    return {
        props: {
            page: 'communities'
        }
    };
};

export default Communities;
