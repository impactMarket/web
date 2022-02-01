import '@celo-tools/use-contractkit/lib/styles.css';
import {
    Alfajores,
    CeloMainnet,
    ContractKitProvider,
    useContractKit,
    useProviderOrSigner
} from '@celo-tools/use-contractkit';
import { ImpactMarketProvider } from '@impact-market/utils';
import { JsonRpcProvider, JsonRpcSigner } from '@ethersproject/providers';
import { modal } from 'react-modal-handler';
import { useRouter } from 'next/router';
import React, { createContext, useEffect, useState } from 'react';
import config from '../../../config';
import useMounted from '../../hooks/useMounted';

type ProviderProps = {
    children?: any;
};

type ContextProps = {
    address?: string;
    connect?: Function;
    destroy?: Function;
    initialised?: boolean;
    provider?: object;
    signer?: object;
    wrongNetwork?: boolean;
};

const network = config.isDaoTestnet ? Alfajores : CeloMainnet;
const rpcUrl = config.networkRpcUrl || Alfajores.rpcUrl;

export const ImpactMarketDaoContext = createContext<ContextProps>({});

const Wrapper = (props: any) => {
    const { address, connect, destroy, initialised, network: walletNetwork } = useContractKit();
    const { asPath, query, isReady, push } = useRouter();
    const { children, provider } = props;
    const signer = useProviderOrSigner();
    const [wrongNetwork, setWrongNetwork] = useState<boolean | undefined>();

    useEffect(() => {
        if (initialised && !!provider) {
            const verifyNetwork = async () => {
                const network = await provider?.getNetwork();

                setWrongNetwork(network.chainId !== walletNetwork.chainId);
            };

            verifyNetwork();
        }
    }, [initialised, walletNetwork]);

    useEffect(() => {
        if (initialised && query?.contribute === 'true') {
            modal.open('governanceContribute', {
                onSuccess: () => asPath !== '/governance' && push('/governance')
            });
        }
    }, [initialised, isReady, query]);

    if (!initialised || typeof wrongNetwork !== 'boolean') {
        return null;
    }

    return (
        <ImpactMarketDaoContext.Provider
            value={{
                address,
                connect,
                destroy,
                initialised,
                provider,
                signer,
                wrongNetwork
            }}
        >
            <ImpactMarketProvider
                address={address}
                provider={provider}
                signer={signer instanceof JsonRpcSigner ? signer : null}
            >
                {children}
            </ImpactMarketProvider>
        </ImpactMarketDaoContext.Provider>
    );
};

export const ImpactMarketDaoProvider = ({ children }: ProviderProps) => {
    const isMounted = useMounted();

    if (!isMounted) {
        return null;
    }

    const provider = new JsonRpcProvider(rpcUrl);

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
                url: 'https://impactmarket.com'
            }}
            network={network}
            networks={[CeloMainnet, Alfajores]}
        >
            <Wrapper provider={provider}>{children}</Wrapper>
        </ContractKitProvider>
    );
};
