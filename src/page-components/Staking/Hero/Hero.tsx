import {
    Card,
    CardContent,
    Col,
    DotBackground,
    Grid,
    Heading,
    Row,
    Section,
    Text,
    TextLink
} from '../../../theme/components';
import { Stake } from './Stake';
import { String, Tabs } from '../../../components';
import { Summary } from './Summary';
import { Unstake } from './Unstake';
import { WrongNetwork } from '../../../components/WrongNetwork/WrongNetwork';
import { currencyValue } from '../../../helpers/currencyValue';
import { numericalValue } from '../../../helpers/numericalValue';
import { usePrismicData } from '../../../lib/Prismic/components/PrismicDataProvider';
import { useStaking } from '@impact-market/utils';
import { useTranslation } from '../../../components/TranslationProvider/TranslationProvider';
import { useWallet } from '../../../hooks/useWallet';
import React from 'react';

export const Hero = () => {
    const { address, connect, wrongNetwork } = useWallet();
    const { extractFromPage } = usePrismicData();
    const { staking } = useStaking();
    const { t } = useTranslation();

    const tabs = [t('stake'), t('unstake'), t('summary')];

    const { apr, stakedAmount } = staking || {};

    const { connectYourWallet, noStakingYet, stakingApr, youHaveStaked } = extractFromPage('string') as any;

    return (
        <Section pb={{ md: 4 }} pt={{ md: 4 }} relative>
            <DotBackground />
            <Grid pb={2} pt={2} relative>
                <Row center="xs">
                    <Col md={6} xs={12}>
                        <Card sHeight="100%">
                            <CardContent>
                                {!address && (
                                    <Text brandSecondary center small>
                                        <TextLink brandPrimary onClick={connect} regular>
                                            <String id="connectToYourWallet" />
                                        </TextLink>
                                        &nbsp;
                                        {connectYourWallet}
                                    </Text>
                                )}
                                {!!address && wrongNetwork && <WrongNetwork />}
                                {!!address && !wrongNetwork && (
                                    <>
                                        <Heading center>
                                            {stakingApr}: {numericalValue(apr)}%
                                        </Heading>
                                        <Text brandBlack center mt={0.75} sAlpha={0.6}>
                                            {stakedAmount
                                                ? `${youHaveStaked} ${currencyValue(stakedAmount, {
                                                      isToken: true,
                                                      symbol: 'PACT'
                                                  })}`
                                                : noStakingYet}
                                        </Text>
                                        <Tabs mt={2} tabs={tabs}>
                                            <Stake />
                                            <Unstake />
                                            <Summary />
                                        </Tabs>
                                    </>
                                )}
                            </CardContent>
                        </Card>
                    </Col>
                </Row>
            </Grid>
        </Section>
    );
};

export default Hero;
