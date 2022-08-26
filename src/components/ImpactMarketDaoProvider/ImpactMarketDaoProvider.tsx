import '@celo/react-celo/lib/styles.css';
import { Alfajores, CeloProvider, Mainnet, useCelo, useConnectedSigner } from '@celo/react-celo';
import { ImpactProvider } from '@impact-market/utils';
import { JsonRpcProvider } from '@ethersproject/providers';
import { modal } from 'react-modal-handler';
import { useRouter } from 'next/router';
import React, { createContext, useEffect } from 'react';
import config from '../../../config';
import useMounted from '../../hooks/useMounted';

type ProviderProps = {
    children?: any;
};

type ContextProps = {
    address?: string;
    initialised?: boolean;
    provider?: object;
    signer?: object;
};

const network = config.isDaoTestnet ? Alfajores : Mainnet;
const rpcUrl = config.networkRpcUrl || Alfajores.rpcUrl;

export const ImpactMarketDaoContext = createContext<ContextProps>({});

const Wrapper = (props: any) => {
    const { address, initialised, kit } = useCelo();
    const { asPath, query, isReady, push } = useRouter();
    const { children, provider } = props;
    const signer = useConnectedSigner();

    useEffect(() => {
        if (initialised && query?.contribute === 'true') {
            modal.open('governanceContribute', {
                onSuccess: () => asPath !== '/governance' && push('/governance')
            });
        }
    }, [initialised, isReady, query]);

    if (!initialised) {
        return null;
    }

    return (
        <ImpactMarketDaoContext.Provider
            value={{
                address,
                initialised,
                provider,
                signer
            }}
        >
            <ImpactProvider address={address} connection={kit.connection} jsonRpc={config.networkRpcUrl}>
                {children}
            </ImpactProvider>
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
        <CeloProvider
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
            networks={[Mainnet, Alfajores]}
        >
            <Wrapper provider={provider}>{children}</Wrapper>
        </CeloProvider>
    );
};
