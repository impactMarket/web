import { GovernanceToken } from '../page-components';

export const getServerSideProps = () => {
    return {
        props: {
            page: 'governanceToken'
        }
    };
};

export default GovernanceToken;
