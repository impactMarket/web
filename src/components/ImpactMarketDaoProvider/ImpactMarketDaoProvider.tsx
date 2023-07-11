import { ImpactProvider } from '@impact-market/utils';
import React from 'react';
import config from '../../../config';
import useMounted from '../../hooks/useMounted';
import { useAccount, useNetwork, useWalletClient } from 'wagmi';
import { Web3Modal } from '@web3modal/react';
import { WagmiConfig } from 'wagmi';
import { ethereumClient, projectId, wagmiConfig } from '../../hooks/useWallet';

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
            <Web3Modal
                projectId={projectId}
                ethereumClient={ethereumClient}
                explorerRecommendedWalletIds={[
                    // libera
                    'b7cd38c9393f14b8031bc10bc0613895d0d092c33d836547faf8a9b782f6cbcc',
                    // valora
                    'd01c7758d741b363e637a817a09bcf579feae4db9f5bb16f599fdd1f66e2f974',
                    // metamask
                    'c57ca95b47569778a828d19178114f4db188b89b763c899ba0be274e97267d96'
                ]}
            />
        </>
    );
};
