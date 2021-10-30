import { Fundraise } from '../page-components';

export const getStaticProps = () => {
    return {
        props: {
            footerOptions: {
                hideDonateButton: true,
                whiteBackground: true
            },
            page: 'Fundraise'
        }
    };
};

export default Fundraise;
