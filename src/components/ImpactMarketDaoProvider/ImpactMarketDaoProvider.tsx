import '@celo-tools/use-contractkit/lib/styles.css';
import {
    Alfajores,
    Celo,
    ContractKitProvider,
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

const network = config.isDaoTestnet ? Alfajores : Celo;
const rpcUrl = config.networkRpcUrl || Alfajores.rpcUrl;

const Wrapper = (props: ProviderProps) => {
    const { address } = useContractKit();
    const { children } = props;

    const [, setIsInDifferentNetwork] = useState(false);

    const provider = new JsonRpcProvider(rpcUrl);
    const signer = useConnectedSigner();
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
            connectModal={{
                reactModalProps: {
                    overlayClassName: 'tw-fixed tw-bg-gray-100 dark:tw-bg-gray-700 tw-bg-opacity-75 tw-inset-0',
                    style: {
                        content: {
                            background: 'unset',
                            border: 'unset',
                            bottom: 'auto',
                            color: 'black',
                            left: '50%',
                            padding: 'unset',
                            right: 'auto',
                            top: '50%',
                            transform: 'translate(-50%, -50%)'
                        },
                        overlay: {
                            zIndex: 100
                        }
                    }
                }
            }}
            dapp={{
                description: 'Decentralized Poverty Alleviation Protocol',
                icon: 'https://impact-market.com/favicon.png',
                name: 'impactMarket web',
                supportedNetworks: [Celo, Alfajores],
                url: 'https://impactmarket.com'
            }}
            network={network}
        >
            {typeof window === 'undefined' ? null : <Wrapper>{children}</Wrapper>}
        </ContractKitProvider>
    );
};
