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
import RichText from '../../../lib/Prismic/components/RichText';

export const Hero = () => {
    const { address, connect, wrongNetwork } = useWallet();
    const { extractFromPage } = usePrismicData();
    const { staking } = useStaking();
    const { t } = useTranslation();

    const tabs = [t('stake'), t('unstake'), t('summary')];

    const { generalAPR, stakedAmount, totalStaked } = staking || {};

    const { heading, text } = extractFromPage('hero') as any;
    const {
        connectYourWallet,
        noStakingYet,
        stakingApr,
        totalStaked: totalStakedString,
        youHaveStaked
    } = extractFromPage('string') as any;

    return (
        <Section pb={{ md: 4, xs: 2 }} pt={{ md: 4, xs: 2 }} relative>
            <DotBackground blueGradient />
            <Grid relative>
                <Row center="xs">
                    <Col md={5.5} xs={12}>
                        <Heading h1Alt>{heading}</Heading>
                        <RichText content={text} mt={1} />
                    </Col>
                    <Col md={6} mdOffset={0.5} mt={{ md: 0, xs: 2 }} xs={12}>
                        <Card longRadius noBorder sHeight="100%">
                            <CardContent>
                                <Heading center h4>
                                    {stakingApr}: {numericalValue(generalAPR)}%
                                </Heading>
                                {(!address || !!wrongNetwork) && (
                                    <Text brandBlack center mb={2} mt={0.75} sAlpha={0.6}>
                                        {totalStakedString}:{' '}
                                        {currencyValue(totalStaked, { isToken: true, symbol: 'PACT' })}
                                    </Text>
                                )}
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
