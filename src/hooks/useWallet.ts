import { Alfajores, Mainnet, useCelo } from 'react-celo-impactmarket';
import { deleteCookie, setCookie } from 'cookies-next';
import { getAddress } from '@ethersproject/address';
import Api from '../apis/api';
import config from '../../config';

const network = config.isDaoTestnet ? Alfajores : Mainnet;

export const useWallet = () => {
    const { address, connect: connectFromHook, disconnect: disconnectFromHook, network: walletNetwork } = useCelo();

    const wrongNetwork = network?.chainId !== walletNetwork?.chainId;

    const connect = async () => {
        try {
            if (localStorage.getItem('walletconnect')) {
                localStorage.removeItem('walletconnect');
            }

            const connector = await connectFromHook();

            // @ts-ignore
            const payload = await Api.createUser(getAddress(connector.kit.connection.config.from));

            // Create cookie to save Auth Token
            const expiryDate = new Date();

            expiryDate.setTime(expiryDate.getTime() + 30 * 24 * 60 * 60 * 1000);
            setCookie('AUTH_TOKEN', payload?.data?.token, { expires: expiryDate });

            return true;
        } catch (error) {
            console.log('Error connecting to wallet! ', error);

            return false;
        }
    };

    const disconnect = async () => {
        try {
            await disconnectFromHook();

            deleteCookie('AUTH_TOKEN');
            deleteCookie('SIGNATURE');
            deleteCookie('MESSAGE');

            localStorage.removeItem('walletconnect');

            return true;
        } catch (error) {
            console.log('Error disconnecting from wallet!\n', error);

            return false;
        }
    };

    return { address, connect, disconnect, wrongNetwork };
};
