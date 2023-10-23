import { useAccount, useDisconnect } from 'wagmi';
import { deleteCookie, setCookie, getCookie } from 'cookies-next';
import { celo, celoAlfajores } from '@wagmi/chains';
import { useWeb3Modal } from '@web3modal/wagmi/react';
import { useEffect } from 'react';
import { getAddress } from '@ethersproject/address';
import Api from '../apis/api';
import config from '../../config';
import { configureChains, createConfig } from 'wagmi';
import { publicProvider } from 'wagmi/providers/public';
import { InjectedConnector } from 'wagmi/connectors/injected';
import { WalletConnectConnector } from 'wagmi/connectors/walletConnect';
import { walletConnectProvider } from '@web3modal/wagmi';

export const projectId = config.walletConnectProjectId;

const metadata = {
    name: 'impactMarket',
    description: 'impactMarket',
    url: 'https://impactmarket.com',
    icons: ['https://avatars.githubusercontent.com/u/42247406']
};

export const { chains, publicClient } = configureChains(
    [config.chainId === 42220 ? celo : celoAlfajores],
    [walletConnectProvider({ projectId }), publicProvider()]
);

export const wagmiConfig = createConfig({
    autoConnect: true,
    connectors: [
        new WalletConnectConnector({
            chains,
            options: { projectId, showQrModal: false, metadata }
        }),
        new InjectedConnector({ chains, options: { shimDisconnect: true } })
    ],
    publicClient
});

export const useWallet = () => {
    const { open } = useWeb3Modal();
    const { disconnect: disconnect_ } = useDisconnect();
    const { address, isConnected } = useAccount();

    useEffect(() => {
        const connectUser = async () => {
            const hasAuthToken = getCookie('AUTH_TOKEN');

            if (!hasAuthToken) {
                // @ts-ignore
                const payload = await Api.createUser(getAddress(address));

                // Create cookie to save Auth Token
                const expiryDate = new Date();

                expiryDate.setTime(
                    expiryDate.getTime() + 30 * 24 * 60 * 60 * 1000
                );
                setCookie('AUTH_TOKEN', payload?.data?.token, {
                    expires: expiryDate
                });
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
