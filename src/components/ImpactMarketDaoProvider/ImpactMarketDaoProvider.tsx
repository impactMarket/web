import '@celo-tools/use-contractkit/lib/styles.css';
import {
    Alfajores,
    ContractKitProvider,
    Mainnet,
    useConnectedSigner,
    useContractKit,
    useProvider
} from '@celo-tools/use-contractkit';
import { ImpactMarketProvider } from '@impact-market/utils';
import { JsonRpcProvider } from '@ethersproject/providers';
import React, { useEffect, useState } from 'react';
import config from '../../../config';

type ProviderProps = {
    children?: any;
};

const network = config.isDaoMainnet ? Mainnet : Alfajores;

const Wrapper = (props: ProviderProps) => {
    const { children } = props;
    const signer = useConnectedSigner();
    const { address } = useContractKit();
    const [, setIsInDifferentNetwork] = useState(false);
    const provider = new JsonRpcProvider(network.rpcUrl);
    const walletProvider = useProvider();

    useEffect(() => {
        const verifyNetwork = async () => {
            const network = await provider?.getNetwork();
            const walletNetwork = await walletProvider?.getNetwork();

            setIsInDifferentNetwork(network.chainId !== walletNetwork.chainId);
        };

        if (walletProvider) {
            verifyNetwork();
        }
    }, [walletProvider, provider]);

    return (
        <ImpactMarketProvider address={address} provider={provider} signer={signer}>
            {children}
        </ImpactMarketProvider>
    );
};

export const ImpactMarketDaoProvider = ({ children }: ProviderProps) => {
    return (
        <ContractKitProvider
            dapp={{
                description: 'Decentralized Poverty Alleviation Protocol',
                icon: 'https://impact-market.com/favicon.png',
                name: 'impactMarket web',
                url: 'https://impactmarket.com'
            }}
            network={network}
        >
            {typeof window === 'undefined' ? null : <Wrapper>{children}</Wrapper>}
        </ContractKitProvider>
    );
};
