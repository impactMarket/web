import { Homepage } from '../page-components';
import Api from '../apis/api';

export const getServerSideProps = async () => {
    const numbers = await Api.getGlobalNumbers();

    const data = {
        numbers
    };

    return {
        props: {
            data,
            page: 'homepage'
        }
    };
};

export default Homepage;
