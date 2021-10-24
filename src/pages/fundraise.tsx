import { Fundraise } from '../page-components';

export const getStaticProps = () => {
    return {
        props: {
            footerOptions: {
                hideDonateButton: true,
                whiteBackground: true
            },
            page: 'Fundraise',
            wip: true
        }
    };
};

export default Fundraise;
