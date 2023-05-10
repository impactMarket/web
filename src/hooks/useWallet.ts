import { useAccount, useDisconnect } from 'wagmi'
import { deleteCookie, setCookie, getCookie } from 'cookies-next';

import { configureChains, createConfig } from 'wagmi';
import { jsonRpcProvider } from 'wagmi/providers/jsonRpc';
import { EthereumClient, w3mConnectors } from '@web3modal/ethereum';
import { celo } from '@wagmi/chains';
import { useWeb3Modal } from '@web3modal/react';
import { useEffect } from 'react';
import { getAddress } from '@ethersproject/address';
import Api from '../apis/api';

export const projectId = 'e14be5c27cfd796596686bdc6876e836';

const { chains, publicClient } = configureChains(
    [celo],
    [jsonRpcProvider({ rpc: chain => ({ http: chain.rpcUrls.default.http[0] }) })]
);

export const wagmiConfig = createConfig({
    autoConnect: true,
    connectors: w3mConnectors({ projectId, version: 2, chains }),
    publicClient,
});

export const ethereumClient = new EthereumClient(wagmiConfig, chains);

export const useWallet = () => {
    const { open } = useWeb3Modal();
    const { disconnect: disconnect_ } = useDisconnect();
    const { address, isConnected } = useAccount()

    useEffect(() => {
        const connectUser = async () => {
            const hasAuthToken = getCookie('AUTH_TOKEN');

            if (!hasAuthToken) {
                // @ts-ignore
                const payload = await Api.createUser(getAddress(address));

                // Create cookie to save Auth Token
                const expiryDate = new Date();

                expiryDate.setTime(expiryDate.getTime() + 30 * 24 * 60 * 60 * 1000);
                setCookie('AUTH_TOKEN', payload?.data?.token, { expires: expiryDate });
            }
        };

        if (isConnected && address) {
            connectUser();    
        }
    }, [isConnected, address]);

    const disconnect = async () => {
        try {
            disconnect_();

            deleteCookie('AUTH_TOKEN');
            deleteCookie('SIGNATURE');
            deleteCookie('MESSAGE');

            return true;
        } catch (error) {
            console.log('Error disconnecting from wallet!\n', error);

            return false;
        }
    };

    return { address, connect: open, disconnect, wrongNetwork: false };
};
