import { Fundraise } from '../page-components';

export const getStaticProps = () => {
    return {
        props: {
            footerOptions: {
                hideDonateButton: true,
                whiteBackground: true
            },
            page: 'fundraise'
        }
    };
};

export default Fundraise;
