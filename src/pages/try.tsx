import { Tokenomics } from '../page-components/Governance/Tokenomics/Tokenomics';

export const getServerSideProps = () => {
    return {
        props: {
            page: 'try'
        }
    };
};

export default Tokenomics;
