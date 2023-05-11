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
    const { chain } = useNetwork();

    return (
        <ImpactProvider
            jsonRpc={config.networkRpcUrl || chain?.rpcUrls.public.http[0] || ''}
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
            <Web3Modal projectId={projectId} ethereumClient={ethereumClient} />
        </>
    );
};
