import { ImpactProvider } from '@impact-market/utils';
import React from 'react';
import config from '../../../config';
import useMounted from '../../hooks/useMounted';
import { useAccount, useNetwork, useWalletClient } from 'wagmi';
import { WagmiConfig } from 'wagmi';
import { projectId, wagmiConfig, chains } from '../../hooks/useWallet';
import { createWeb3Modal } from '@web3modal/wagmi/react';
import { celo, celoAlfajores } from '@wagmi/chains';

createWeb3Modal({
    wagmiConfig,
    projectId,
    chains,
    featuredWalletIds: [
        // libera
        'b7cd38c9393f14b8031bc10bc0613895d0d092c33d836547faf8a9b782f6cbcc',
        // valora
        'd01c7758d741b363e637a817a09bcf579feae4db9f5bb16f599fdd1f66e2f974'
    ],
    themeMode: 'light',
    defaultChain: config.chainId === 42220 ? celo : celoAlfajores
});

const Wrapper = ({ children }: { children: any }) => {
    const { address } = useAccount();
    const { data: signer } = useWalletClient();
    const { chains } = useNetwork();
    const chain = chains[0];

    return (
        <ImpactProvider
            jsonRpc={
                config.networkRpcUrl || chain?.rpcUrls.public.http[0] || ''
            }
            signer={signer ?? null}
            address={address ?? null}
            networkId={chain?.id || config.chainId || 44787}
        >
            {children}
        </ImpactProvider>
    );
};

export const ImpactMarketDaoProvider = ({ children }: { children: any }) => {
    const isMounted = useMounted();

    if (!isMounted) {
        return null;
    }

    return (
        <>
            <WagmiConfig config={wagmiConfig}>
                <Wrapper>{children}</Wrapper>
            </WagmiConfig>
        </>
    );
};
