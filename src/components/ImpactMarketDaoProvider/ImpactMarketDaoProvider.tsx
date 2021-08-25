import '@celo-tools/use-contractkit/lib/styles.css';
import {
    Alfajores,
    ContractKitProvider,
    useConnectedSigner,
    useContractKit,
    useProvider
} from '@celo-tools/use-contractkit';
import { ImpactMarketProvider } from '@impact-market/utils';
import React from 'react';

type ProviderProps = {
    children?: any;
};

const Wrapper = (props: ProviderProps) => {
    const { children } = props;
    const provider = useProvider();
    const signer = useConnectedSigner();
    const { address } = useContractKit();

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
            network={Alfajores}
        >
            {typeof window === 'undefined' ? null : <Wrapper>{children}</Wrapper>}
        </ContractKitProvider>
    );
};
