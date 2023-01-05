import { GhostElement, Text } from '../../theme/components';
import { ImpactMarketDaoContext } from '..';
import { JsonRpcProvider } from '@ethersproject/providers';
import { String } from '../String/String';
import { TopbarColumn, TopbarContent, TopbarLeft, TopbarStyle, TopbarWallet } from './Topbar.style';
import { WalletConnect } from './WalletConnect';
import { colors } from '../../theme';
import { currencyValue } from '../../helpers/currencyValue';

import { circulatingSupply as getCirculatingSupply, getPACTTradingMetrics } from '@impact-market/utils';
import { useData } from '../DataProvider/DataProvider';
import React, { useContext, useEffect, useLayoutEffect, useRef, useState } from 'react';
import envConfig from '../../../config';

const getString = (name: string) => `page.governanceToken.metrics.${name}`;

type TokenMetricItem = {
    name: string;
};

type PactMetricsType = {
    marketCap?: number | string;
    priceCUSD?: number | string;
};

export const Topbar = ({ setTopbarHeight }: any) => {
    const { config } = useData();
    const provider = useContext(ImpactMarketDaoContext).provider || new JsonRpcProvider(envConfig.networkRpcUrl);

    const [isLoading, setIsLoading] = useState(false);

    const items = config?.topBarTokenMetrics as TokenMetricItem[];

    const [pactTradingMetrics, setPactTradingMetrics] = useState<PactMetricsType>({});

    useEffect(() => {
        const loadPactPriceVolumeLiquidity = async () => {
            setIsLoading(true);
            try {
                const response = await getPACTTradingMetrics(envConfig.chainId);
                const circulatingSupply = await getCirculatingSupply(provider, envConfig.chainId);

                const { priceUSD: priceCUSD } = response;

                const marketCap = +priceCUSD * circulatingSupply;

                setPactTradingMetrics({
                    ...response,
                    marketCap,
                    priceCUSD
                });
                setIsLoading(false);
            } catch (error) {
                setIsLoading(false);
                console.log(error);
            }
        };

        loadPactPriceVolumeLiquidity();
    }, []);

    const getValue = (name: keyof PactMetricsType) => {
        if (typeof pactTradingMetrics?.[name] !== 'string' && isNaN(+pactTradingMetrics?.[name])) {
            return '--';
        }

        if (name === 'priceCUSD') {
            return `~$${Number(pactTradingMetrics?.priceCUSD).toLocaleString('en', {
                maximumFractionDigits: pactTradingMetrics?.priceCUSD < 1 ? 5 : 2
            })}`;
        }

        if (name === 'marketCap') {
            return currencyValue(pactTradingMetrics?.marketCap, { symbol: '~$' });
        }

        return pactTradingMetrics[name] || '--';
    };

    // Get topbar div height
    const topbarRef = useRef(null);

    useLayoutEffect(() => {
        setTopbarHeight(topbarRef.current.offsetHeight);
    }, []);

    return (
        <TopbarStyle ref={topbarRef}>
            <TopbarContent>
                <TopbarLeft>
                    {items.map(({ name }, key) => (
                        <TopbarColumn key={key}>
                            {name === 'priceCUSD' && (
                                <Text sFontSize={{ sm: 1, xs: 0.75 }} sFontWeight="700">
                                    <String id="pact" />
                                </Text>
                            )}
                            <Text sFontSize={{ sm: 1, xs: 0.75 }} sFontWeight="500">
                                <String id={`${getString(name as keyof PactMetricsType)}.topbar`.toLowerCase()} />
                            </Text>
                            {isLoading ? (
                                <GhostElement color={colors.g500} sHeight={0.6} sWidth={3} />
                            ) : (
                                <Text sColor={colors.b300} sFontSize={{ sm: 1, xs: 0.75 }} sFontWeight="500">
                                    {getValue(name as keyof PactMetricsType)}
                                </Text>
                            )}
                        </TopbarColumn>
                    ))}
                </TopbarLeft>
                <TopbarWallet>
                    <WalletConnect />
                </TopbarWallet>
            </TopbarContent>
        </TopbarStyle>
    );
};
