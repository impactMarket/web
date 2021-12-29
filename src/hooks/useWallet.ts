import { ImpactMarketDaoContext } from '../components';
import { useRouter } from 'next/router';
import React from 'react';

export const useWallet = () => {
    const { address, connect: connectFromHook, destroy, wrongNetwork } = React.useContext(ImpactMarketDaoContext);
    const { asPath, push } = useRouter();

    const connect = async () => {
        try {
            await connectFromHook();

            if (asPath !== '/governance') {
                return push('/governance');
            }
        } catch (error) {
            console.log(error);
        }
    };

    const disconnect = async () => {
        try {
            await destroy();

            return;
        } catch (error) {
            console.log(error);
        }
    };

    return { address, connect, disconnect, wrongNetwork };
};
