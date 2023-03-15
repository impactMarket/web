import { Card, CardContent, Hr, Text, TextLink } from '../../../theme/components';
import { String, Tabs } from '../../../components';
import { WrongNetwork } from '../../../components/WrongNetwork/WrongNetwork';
import { colors } from '../../../theme';
import { currencyValue } from '../../../helpers/currencyValue';
import { numericalValue } from '../../../helpers/numericalValue';
import { useStaking } from '@impact-market/utils';
import { useTranslation } from '../../../components/TranslationProvider/TranslationProvider';
import { useWallet } from '../../../hooks/useWallet';
import React from 'react';
import StakeTab from './StakeTab';
import SummaryTab from './SummaryTab';
import UnstakeTab from './UnstakeTab';

export const Stake = ({ translations }: any) => {
    const { address, connect, wrongNetwork } = useWallet();
    const { stakingStakingApr, stakingTotalStaked, stakingToStartStaking, stakingYouHaveStaked, stakingNoStakingYet } =
        translations;
    const { staking } = useStaking();
    const { t } = useTranslation();

    const tabs = [t('stake'), t('unstake'), t('summary')];

    const { generalAPR, stakedAmount, totalStaked } = staking || {};

    return (
        <Card longRadius noBorder sHeight="100%">
            <CardContent>
                <Text center sColor={colors.g800} sFontSize={1.25} sFontWeight={600}>
                    {stakingStakingApr}: {numericalValue(generalAPR)}%
                </Text>
                {(!address || !!wrongNetwork) && (
                    <Text brandBlack center mt={0.75} sAlpha={0.6}>
                        {stakingTotalStaked}: {currencyValue(totalStaked, { isToken: true, symbol: 'PACT' })}
                    </Text>
                )}
                {(!address || wrongNetwork) && <Hr mb={3} mt={3} />}
                {!address && (
                    <Text brandSecondary center small>
                        <TextLink brandPrimary onClick={connect} regular>
                            <String id="connectToYourWallet" />
                        </TextLink>
                        &nbsp;
                        {stakingToStartStaking}
                    </Text>
                )}
                {!!address && wrongNetwork && <WrongNetwork />}
                {!!address && !wrongNetwork && (
                    <>
                        <Text center mt={0.75} sColor={colors.g500} small>
                            {stakedAmount
                                ? `${stakingYouHaveStaked} ${currencyValue(stakedAmount, {
                                      isToken: true,
                                      symbol: 'PACT'
                                  })}`
                                : stakingNoStakingYet}
                        </Text>
                        <Tabs mt={2} tabs={tabs}>
                            <StakeTab translations={translations} />
                            <UnstakeTab translations={translations} />
                            <SummaryTab translations={translations} />
                        </Tabs>
                    </>
                )}
            </CardContent>
        </Card>
    );
};

export default Stake;
