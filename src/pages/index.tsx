import { Homepage } from '../page-components';
import { NextPageContext } from 'next';
import Api from '../apis/api';

export const getServerSideProps = async (context: NextPageContext) => {
    const numbers = await Api.getGlobalNumbers();
    const { query } = context;
    const meta = {} as any;

    if (query?.contribute === 'true') {
        meta.image = 'https://impactmarket.com/img/share-governance.jpg';
        meta['image:height'] = 1080;
        meta['image:width'] = 1080;
    }

    const data = {
        numbers
    };

    return {
        props: {
            data,
            meta,
            page: 'homepage'
        }
    };
};

export default Homepage;
