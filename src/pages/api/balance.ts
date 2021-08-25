import { getWalletsBalance } from '@impact-market/utils';
import type { NextApiResponse } from 'next';

type Data = {
    celo?: number;
    eth?: number;
};

const balanceHandler = async (_: any, res: NextApiResponse<Data>) => {
    try {
        const balance = await getWalletsBalance({
            etherscanApiKey: 'I3IGR2WIJD8EU3J2E8531I9W53GYBCF2DH',
            wallets: {
                bitcoin: 'bc1qe7ksg8va9uzfu4pl9ea8zyftad94p0tgtuavk4',
                celo: '0xC483Cd9FC68e58074d1D82b7a9fFdE948Db6d119',
                ethereum: '0x4D93536aa77FE4fDD48DC7f2c228410eC49c233C'
            }
        });

        res.status(200).json({ ...balance });
    } catch (error) {
        console.log(error);

        res.status(500);
    }
};

export default balanceHandler;
