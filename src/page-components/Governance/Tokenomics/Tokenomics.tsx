import { BaseProvider } from '@ethersproject/providers';
import {
    Col,
    Div,
    GhostElement,
    Grid,
    InfoTooltip,
    RichContentFormat,
    Row,
    Section,
    Text
} from '../../../theme/components';
import { GeneratedPropsTypes } from '../../../theme/Types';
import { ImpactMarketDaoContext, String } from '../../../components';
import { currencyValue } from '../../../helpers/currencyValue';
import { dashboard } from '../../../apis/dashboard';
import { circulatingSupply as getCirculatingSupply, getPACTTradingMetrics } from '@impact-market/utils';
import { numericalValue } from '../../../helpers/numericalValue';
import { useData } from '../../../components/DataProvider/DataProvider';
import Api from '../../../apis/api';
import React, { useContext, useEffect, useState } from 'react';
import styled from 'styled-components';

const Item = styled.div`
    position: relative;
`;

type TokenMetricItem = {
    name: string;
    tooltip?: string;
};

const getString = (name: string) => `page.governanceToken.metrics.${name}`;

type PactMetricsType = {
    circulatingSupply?: number | string;
    dailyVolumeUSD?: number | string;
    marketCap?: number | string;
    priceCUSD?: number | string;
    tokenHolders?: number | string;
    totalCUSD?: number | string;
    totalLiquidityUSD?: number | string;
    transfers?: number | string;
};

export const Tokenomics = (props: GeneratedPropsTypes) => {
    const { config } = useData();
    const { provider } = useContext(ImpactMarketDaoContext);

    const [isLoading, setIsLoading] = useState(false);

    const items = config?.tokenMetrics as TokenMetricItem[];

    const [pactTradingMetrics, setPactTradingMetrics] = useState<PactMetricsType>({});

    useEffect(() => {
        const loadPactPriceVolumeLiquidity = async () => {
            setIsLoading(true);
            try {
                const response = await getPACTTradingMetrics(provider as BaseProvider);
                const circulatingSupply = await getCirculatingSupply(provider as BaseProvider);
                const globalDashboard = await Api.getGlobalValues();

                const { priceUSD: priceCUSD } = response;

                const marketCap = +priceCUSD * circulatingSupply;

                const { value } = dashboard.getTotalRaised(globalDashboard) || {};
                const totalCUSD = value;

                setPactTradingMetrics({ ...response, circulatingSupply, marketCap, priceCUSD, totalCUSD });
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

        if (name === 'transfers') {
            return numericalValue(pactTradingMetrics?.transfers);
        }

        if (name === 'priceCUSD') {
            return `~$${Number(pactTradingMetrics?.priceCUSD).toLocaleString('en', {
                maximumFractionDigits: pactTradingMetrics?.priceCUSD < 1 ? 5 : 2
            })} cUSD`;
        }

        if (name === 'tokenHolders') {
            return numericalValue(pactTradingMetrics?.tokenHolders);
        }

        if (name === 'marketCap') {
            return currencyValue(pactTradingMetrics?.marketCap, { suffix: 'cUSD', symbol: '~$' });
        }

        if (name === 'circulatingSupply') {
            return currencyValue(pactTradingMetrics?.circulatingSupply, {
                isToken: true,
                suffix: 'PACT'
            });
        }

        if (name === 'totalCUSD') {
            return `${pactTradingMetrics[name]} cUSD`;
        }

        return pactTradingMetrics[name] || '--';
    };

    return (
        <Section {...props}>
            <Grid>
                <Row pb={1.5} pt={1.5}>
                    {items.map(({ name, tooltip }, index) => (
                        <Col key={index} md={4} pb={0.5} pt={0.5} sm={2} xs={12}>
                            <Item>
                                <RichContentFormat>
                                    <Text XSmall medium textSecondary>
                                        <String id={getString(name as keyof PactMetricsType)} />
                                    </Text>
                                </RichContentFormat>
                                <Div mt={0.5}>
                                    {isLoading ? (
                                        <GhostElement mt={0.25} pt={1} sHeight={0.75} sWidth={3} />
                                    ) : (
                                        <Text bold label2>
                                            {getValue(name as keyof PactMetricsType)}
                                        </Text>
                                    )}
                                </Div>
                                {tooltip && (
                                    <InfoTooltip ml={0.5} position="bottom center">
                                        <Text small textSecondary>
                                            <String id={tooltip} />
                                        </Text>
                                    </InfoTooltip>
                                )}
                            </Item>
                        </Col>
                    ))}
                </Row>
            </Grid>
        </Section>
    );
};
