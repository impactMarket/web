import { Card, CardContent, Col, Grid, Heading, Row, Section, Text } from '../../../theme/components';
import { String } from '../../../components';
import { currencyValue } from '../../../helpers/currencyValue';
import { useTranslation } from '../../../components/TranslationProvider/TranslationProvider';
import React, { useState } from 'react';

const mockedValues: { [key: string]: any } = {
    btc: 1332,
    celo: 1234,
    esolidar: 12504,
    eth: 16654
};

const mockedTotal = 152988;

type BalanceProps = {
    items?: string[];
};

export const Balance = (props: BalanceProps) => {
    const { items } = props;
    const { t } = useTranslation();
    const [values] = useState(mockedValues);
    const [total] = useState(mockedTotal);

    if (!values) {
        return null;
    }

    return (
        <Section mt={2} pt={2} relative>
            <Grid>
                <Row center="xs">
                    <Col md={6} sm={8} xs={12}>
                        <Heading center h4>
                            <String
                                id="page.fundraise.balance.heading"
                                variables={{ amount: currencyValue(total.toString()) }}
                            />
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
                                        {currencyValue(values[currency]?.toString(), {
                                            decimals: true,
                                            suffix: 'USD',
                                            symbol: '$'
                                        })}
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
