import { Governance } from '../page-components';

export const getServerSideProps = () => {
    return {
        props: {
            footerOptions: {
                hideDonateButton: true,
                whiteBackground: true
            },
            page: 'governanceToken'
        }
    };
};

export default Governance;
