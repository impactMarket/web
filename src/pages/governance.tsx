import { Governance } from '../page-components';

export const getServerSideProps = () => {
    return {
        props: {
            footerOptions: {
                whiteBackground: true
            },
            page: 'governanceToken'
        }
    };
};

export default Governance;
