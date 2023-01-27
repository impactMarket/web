import 'react-celo-impactmarket/lib/styles.css';
import {
    Alfajores,
    CeloProvider,
    Mainnet,
    SupportedProviders,
    useCelo,
    useConnectedSigner
} from 'react-celo-impactmarket';
import { BaseProvider, JsonRpcProvider } from '@ethersproject/providers';
import { ImpactProvider } from '@impact-market/utils';
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
    provider?: BaseProvider;
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
            <ImpactProvider
                address={address}
                connection={kit.connection}
                jsonRpc={config.networkRpcUrl}
                networkId={config.chainId}
            >
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

    const networks = [
        { ...Mainnet, rpcUrl: config.networkRpcUrl },
        { ...Alfajores, rpcUrl: config.networkRpcUrl }
    ];

    const provider = new JsonRpcProvider(rpcUrl);

    return (
        <CeloProvider
            connectModal={{
                providersOptions: {
                    // This option hides specific wallets from the default list
                    hideFromDefaults: [
                        SupportedProviders.PrivateKey,
                        SupportedProviders.CeloTerminal,
                        SupportedProviders.CeloWallet,
                        SupportedProviders.CeloDance,
                        SupportedProviders.Injected,
                        SupportedProviders.Omni,
                        SupportedProviders.CoinbaseWallet
                    ]
                }
            }}
            dapp={{
                description: 'Human Empowerment Protocol',
                icon: 'https://www.impactmarket.com/img/android-chrome-192x192.png',
                name: 'impactMarket',
                url: 'https://www.impactmarket.com'
            }}
            network={network}
            networks={networks}
        >
            <Wrapper provider={provider}>{children}</Wrapper>
        </CeloProvider>
    );
};
