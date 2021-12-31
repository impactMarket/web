import { Fundraise } from '../page-components';

export const getStaticProps = () => {
    return {
        props: {
            footerOptions: {
                whiteBackground: true
            },
            page: 'fundraise'
        }
    };
};

export default Fundraise;
