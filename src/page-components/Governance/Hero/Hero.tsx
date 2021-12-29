import { Breakdown, ShareThis, String } from '../../../components';
import {
    Button,
    Col,
    Div,
    DotBackground,
    Grid,
    Heading,
    RichContentFormat,
    Row,
    Section,
    Text,
    TextLink
} from '../../../theme/components';
import { currencyValue } from '../../../helpers/currencyValue';
import { modal } from 'react-modal-handler';
import { useEpoch } from '@impact-market/utils';
import { useTranslation } from '../../../components/TranslationProvider/TranslationProvider';
import { useWallet } from '../../../hooks/useWallet';
import React, { useEffect, useState } from 'react';

const exampleUsdValue = 100;

const getExampleClaimValue = (epoch: { rewards?: number; totalRaised?: number } | undefined) =>
    epoch ? (exampleUsdValue * epoch?.rewards) / (exampleUsdValue + epoch?.totalRaised) : 0;

export const Hero = () => {
    const { address, wrongNetwork } = useWallet();
    const { epoch } = useEpoch();
    const [exampleClaimValue, setExampleClaimValue] = useState(getExampleClaimValue(epoch));
    const { t } = useTranslation();

    const handleContributeClick = () => {
        if (!address || wrongNetwork) {
            return;
        }

        return modal.open('governanceContribute');
    };

    useEffect(() => {
        const exampleClaimValue = (exampleUsdValue * epoch?.rewards) / (exampleUsdValue + epoch?.totalRaised);

        setExampleClaimValue(exampleClaimValue);
    }, [epoch]);

    return (
        <Section relative>
            <DotBackground />
            <Grid pb={2} pt={2} relative>
                <Row>
                    <Col md={6} xs={12}>
                        <Heading fontSize={{ md: '41 54', sm: '32 42', xs: '24 36' }} h1>
                            <String id="page.governanceToken.hero.heading" />
                        </Heading>
                        <RichContentFormat fontSize={{ md: '16 28', xs: '14 24' }} mt={1}>
                            <String
                                id="page.governanceToken.hero.text"
                                variables={{
                                    // eslint-disable-next-line no-nested-ternary
                                    convertedValue: exampleClaimValue
                                        ? `~${currencyValue(exampleClaimValue, { isToken: true, symbol: 'PACT' })}`
                                        : address
                                        ? '*'
                                        : `(${t('connectToWallet')})`,
                                    value: currencyValue(exampleUsdValue, { isToken: true, symbol: 'cUSD' })
                                }}
                            />
                            <Div mt={1}>
                                <TextLink
                                    brandPrimary
                                    href="http://docs.impactmarket.com/"
                                    rel="noreferrer noopener"
                                    target="_blank"
                                >
                                    <String id="page.governanceToken.hero.learnMoreLabel" />
                                </TextLink>
                            </Div>
                        </RichContentFormat>
                        <Div mt={2} sAlignItems="center" sFlexDirection={{ sm: 'row', xs: 'column' }}>
                            <Button
                                disabled={wrongNetwork || !address}
                                large
                                mr={{ sm: 2, xs: 0 }}
                                onClick={handleContributeClick}
                                sWidth={{ sm: 'unset', xs: '100%' }}
                            >
                                <Text bold>
                                    <String id="contributeAndEarnRewards" />
                                </Text>
                            </Button>
                        </Div>
                        <ShareThis mt={2} sJustifyContent={{ sm: 'left', xs: 'center' }} />
                    </Col>
                    <Col md={6} mt={{ md: 0, xs: 2.5 }} relative xs={12}>
                        <Breakdown />
                    </Col>
                </Row>
            </Grid>
        </Section>
    );
};
