import { ImpactMarketDaoContext } from '../components';
import React from 'react';

export const useWallet = () => {
    const { address, connect: connectFromHook, destroy, wrongNetwork } = React.useContext(ImpactMarketDaoContext);

    const connect = async (callback?: Function) => {
        console.log('callback ->', typeof callback);
        try {
            await connectFromHook();

            if (!!callback) {
                await callback();
            }

            return true;
        } catch (error) {
            console.log(error);

            return false;
        }
    };

    const disconnect = async () => {
        try {
            await destroy();

            return true;
        } catch (error) {
            console.log(error);

            return false;
        }
    };

    return { address, connect, disconnect, wrongNetwork };
};
