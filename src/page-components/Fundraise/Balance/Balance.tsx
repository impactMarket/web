import { Card, CardContent, Col, Div, Grid, Heading, Row, Section, Spinner, Text } from '../../../theme/components';
import { String } from '../../../components';
import { currencyValue } from '../../../helpers/currencyValue';
import { useTranslation } from '../../../components/TranslationProvider/TranslationProvider';
import React, { useEffect, useState } from 'react';
import axios from 'axios';

const initialValues: { [key: string]: any } = {
    btc: 0,
    celo: 0,
    esolidar: 0,
    eth: 0
};

type BalanceProps = {
    items?: string[];
};

export const Balance = (props: BalanceProps) => {
    const { items } = props;
    const { t } = useTranslation();
    const [isLoading, setIsLoading] = useState(false);
    const [values, setValues] = useState(initialValues);
    const [total, setTotal] = useState(0);
    const [withError, setWithError] = useState(false);

    useEffect(() => {
        const getValues = async () => {
            try {
                setIsLoading(true);
                const response = await axios.get('api/balance');

                const { celo, ethereum: eth } = response?.data;

                setTotal(celo + eth);
                setValues({ celo, eth });
                setIsLoading(false);
            } catch (error) {
                setWithError(true);
                setIsLoading(false);
            }
        };

        getValues();
    }, []);

    if (!!withError) {
        return null;
    }

    return (
        <Section mt={2} pt={2} relative>
            <Grid>
                <Row center="xs">
                    <Col md={6} sm={8} xs={12}>
                        <Heading center h4>
                            {isLoading ? (
                                <Div relative sHeight={2.25}>
                                    <Spinner isLoading={isLoading} />
                                </Div>
                            ) : (
                                <String
                                    id="page.fundraise.balance.heading"
                                    variables={{ amount: currencyValue(total.toString()) }}
                                />
                            )}
                        </Heading>
                        <Text center mt={1} small>
                            <String id="page.fundraise.balance.text" />
                        </Text>
                    </Col>
                </Row>
                <Row center="xs" mt={2}>
                    {items.map((currency, index) => (
                        <Col key={index} md={3} mt={{ md: 0, sm: index > 1 ? 2 : 0, xs: index && 2 }} sm={5} xs={12}>
                            <Card>
                                <CardContent pb={1} pt={1}>
                                    <Text textSecondary>
                                        {currency === 'esolidar' ? (
                                            <String id={currency} />
                                        ) : (
                                            <String id="currencyWallet" variables={{ currency: t(currency) }} />
                                        )}
                                    </Text>
                                    <Heading h4 mt={0.5}>
                                        {isLoading ? (
                                            <Div relative sHeight={2.25} sWidth={2.25}>
                                                <Spinner isLoading={isLoading} />
                                            </Div>
                                        ) : (
                                            currencyValue(values[currency]?.toString(), {
                                                decimals: true,
                                                suffix: 'USD',
                                                symbol: '$'
                                            })
                                        )}
                                    </Heading>
                                </CardContent>
                            </Card>
                        </Col>
                    ))}
                </Row>
            </Grid>
        </Section>
    );
};
