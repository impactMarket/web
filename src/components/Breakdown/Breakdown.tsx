import {
    Button,
    Card,
    CardContent,
    Div,
    Heading,
    Highlight,
    HighlightRow,
    Text,
    TextLink
} from '../../theme/components';
import { Countdown, Tabs } from '..';
import { String } from '../String/String';
import { colors } from '../../theme';
import { currencyValue } from '../../helpers/currencyValues';
import { dateHelpers } from '../../helpers/dateHelpers';
import { modal } from 'react-modal-handler';
import { mq } from 'styled-gen';
import { toast } from '../Toaster/Toaster';
import { useEpoch, useRewards } from '@impact-market/utils';
import { useTranslation } from '../TranslationProvider/TranslationProvider';
import { useWallet } from '../../hooks/useWallet';
import React, { useCallback, useEffect, useState } from 'react';
import styled, { css } from 'styled-components';

const SummaryRow = styled.div`
    padding: 0.5rem 0;
    display: flex;
    flex-direction: column;

    &:not(:last-of-type) {
        border-bottom: 1px solid ${colors.borderLight};
    }

    & + & {
        margin-top: 1rem;
    }

    & > * + * {
        margin-top: 0.5rem;
    }

    ${mq.tablet(css`
        flex-direction: row;
        justify-content: space-between;

        & + & {
            margin-top: 0.5rem;
        }

        & > * + * {
            margin-top: unset;
        }
    `)}
`;

const CowntdownWrapper = styled.div`
    background-color: ${colors.backgroundLight};
    border-bottom: 1px solid ${colors.backgroundShadow};
    padding: 1rem;
`;

export const Breakdown = () => {
    const { address, connect } = useWallet();
    const { claimRewards, rewards } = useRewards();
    const { epoch } = useEpoch();
    const { endPeriod } = epoch || {};
    const { t } = useTranslation();
    const [claimIsLoading, setClaimIsLoading] = useState(false);
    const [endedEpoch, setEndedEpoch] = useState(dateHelpers.isPast(endPeriod));
    const [, setUpdated] = useState(new Date().getMilliseconds());

    const tabs = [t('pactRewardsBreakdown'), t('currentEpochSummary')];

    // const handleAirgrabRewardClaimClick = useCallback(() => console.log('handleAirgrabRewardClaimClick'), []);
    const hasAirgrabClaim = false;

    const handleContributionRewardClaimClick = useCallback(async () => {
        if (claimIsLoading) {
            return;
        }

        setClaimIsLoading(true);

        try {
            const response = await claimRewards();

            setClaimIsLoading(false);

            if (!response?.status) {
                return toast.error(t('toast.defaultError'));
            }

            return toast.success(t('toast.rewardClaimSuccess'));
        } catch (error) {
            setClaimIsLoading(false);
            toast.error(t('toast.defaultError'));
        }
    }, [claimRewards, claimIsLoading]);

    const handleEpochEnd = () => {
        setEndedEpoch(true);
    };

    useEffect(() => {
        if (endPeriod) {
            const epochIsOld = dateHelpers.isPast(endPeriod);

            if (epochIsOld) {
                const timerId = setInterval(() => setUpdated(new Date().getMilliseconds()), 10000);

                return clearInterval(timerId);
            }

            if (!epochIsOld && endedEpoch) {
                setEndedEpoch(false);
            }
        }
    }, [endedEpoch, endPeriod]);

    return (
        <Card sHeight="100%">
            {!!endPeriod && !endedEpoch && (
                <CowntdownWrapper>
                    <Heading center h4>
                        <span>
                            <String id="epochWillEndIn" />
                            &nbsp;
                        </span>
                        <span style={{ color: colors.brandPrimary, whiteSpace: 'nowrap' }}>
                            <Countdown date={endPeriod} onEnd={handleEpochEnd} />
                        </span>
                    </Heading>
                </CowntdownWrapper>
            )}
            <CardContent>
                {!address ? (
                    <Text brandSecondary center small>
                        <TextLink brandPrimary onClick={connect} regular>
                            <String id="connectToYourWallet" />
                        </TextLink>
                        &nbsp;
                        <String id="breakdown.walletNotConnected.text" />
                    </Text>
                ) : (
                    <Tabs mb="auto" tabs={tabs}>
                        {/* Breakdown */}
                        <Div column sWidth="100%">
                            {/* Airgrab Reward */}
                            {/* {!!rewards?.airgrab && (
                                <Div column sWidth="100%">
                                    <Text bold>
                                        <String id="airgrabReward" />
                                    </Text>
                                    <Text brandSecondary mt={0.5} small>
                                        <String id="breakdown.airgrabReward.text" />
                                    </Text>
                                    <Highlight mt={1}>
                                        <HighlightRow>
                                            <Heading h3>
                                                {0}
                                                &nbsp;
                                                <Text regular span="true">
                                                    PACT
                                                </Text>
                                            </Heading>
                                            <Button onClick={handleAirgrabRewardClaimClick} smaller>
                                                <Text semibold span="true">
                                                    <String id="claim" />
                                                </Text>
                                            </Button>
                                        </HighlightRow>
                                    </Highlight>
                                </Div>
                            )} */}

                            {/* Contribution Reward */}
                            <Div column mt={hasAirgrabClaim ? 1 : 0} sWidth="100%">
                                <Text bold>
                                    <String id="contributionReward" />
                                </Text>
                                <Text brandSecondary mt={0.5} small>
                                    <String id="breakdown.contributionReward.text" />
                                </Text>

                                {/* Claimable Reward */}
                                {!!rewards?.claimable && (
                                    <Highlight mt={1}>
                                        <HighlightRow>
                                            <Heading h3>
                                                {currencyValue(rewards?.claimable, { isToken: true })}
                                                &nbsp;
                                                <Text regular span="true">
                                                    PACT
                                                </Text>
                                            </Heading>
                                            <Button
                                                isLoading={claimIsLoading}
                                                mt={{ md: 'unset', xs: 0.625 }}
                                                onClick={handleContributionRewardClaimClick}
                                                smaller
                                            >
                                                <Text semibold span="true">
                                                    <String id="claim" />
                                                </Text>
                                            </Button>
                                        </HighlightRow>
                                    </Highlight>
                                )}

                                {/* Next epoch reward */}
                                {!!rewards?.estimated && (
                                    <Highlight mt={1}>
                                        <HighlightRow>
                                            <Heading h3>
                                                ~{currencyValue(rewards?.estimated, { isToken: true })}
                                                &nbsp;
                                                <Text regular span="true">
                                                    PACT
                                                </Text>
                                            </Heading>
                                            <Text
                                                ml={2}
                                                mt={{ md: 'unset', xs: 0.625 }}
                                                sTextAlign={{ md: 'right', xs: 'center' }}
                                                small
                                            >
                                                <String id="readyToClaimNote" />
                                            </Text>
                                        </HighlightRow>
                                        <HighlightRow>
                                            <Text brandSecondary small>
                                                <String id="rewardsEstimationNote" />
                                            </Text>
                                        </HighlightRow>
                                    </Highlight>
                                )}

                                {/* No claimable or estimated Reward */}
                                {!rewards?.claimable && !rewards?.estimated && (
                                    <Highlight mt={1}>
                                        <HighlightRow>
                                            <Text brandSecondary div small>
                                                <String id="noContributionRewardToBeClaimed" />
                                            </Text>
                                            <TextLink
                                                brandPrimary
                                                ml={{ md: 'unset', xs: 'auto' }}
                                                mr={{ md: 'unset', xs: 'auto' }}
                                                mt={{ md: 'unset', xs: 0.625 }}
                                                onClick={() => modal.open('governanceContribute')}
                                            >
                                                <String id="contribute" />
                                            </TextLink>
                                        </HighlightRow>
                                    </Highlight>
                                )}
                            </Div>
                        </Div>

                        {/* Epoch summary */}
                        <Div column sWidth="100%">
                            <Div column sWidth="100%">
                                <SummaryRow>
                                    <Text bold>
                                        <String id="availableNewPactTokens" />
                                    </Text>
                                    <Text>{currencyValue(epoch?.rewards, { isToken: true, symbol: 'PACT' })}</Text>
                                </SummaryRow>
                                <SummaryRow>
                                    <Text bold>
                                        <String id="yourContribution" />
                                    </Text>
                                    <Text>
                                        {currencyValue(epoch?.userContribution, { isToken: true, symbol: 'cUSD' })}
                                    </Text>
                                </SummaryRow>
                                <SummaryRow>
                                    <Text bold>
                                        <String id="totalRaised" />
                                    </Text>
                                    <Text>{currencyValue(epoch?.totalRaised, { isToken: true, symbol: 'cUSD' })}</Text>
                                </SummaryRow>
                                <SummaryRow>
                                    <Text bold>
                                        <String id="yourPendingRewardsEstimation" />
                                    </Text>
                                    <Text>{currencyValue(rewards?.estimated, { isToken: true, symbol: 'PACT' })}</Text>
                                </SummaryRow>
                            </Div>
                            <Text brandSecondary mt={0.5} sMaxWidth={25} small>
                                <String id="breakdown.rewardsEstimation.text" />
                            </Text>
                        </Div>
                    </Tabs>
                )}
            </CardContent>
        </Card>
    );
};
