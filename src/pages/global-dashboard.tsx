import { GlobalDashboard } from '../page-components';
import Api from '../apis/api';

export const getServerSideProps = async () => {
    const data = await Api.getGlobalValues();

    return {
        props: {
            data,
            page: 'globalDashboard'
        }
    };
};

export default GlobalDashboard;
