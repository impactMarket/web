import {
    Button,
    Card,
    CardContent,
    Div,
    GhostElement,
    Highlight,
    HighlightRow,
    Text,
    TextLink
} from '../../theme/components';
import { Countdown, Tabs } from '../../components';
import { String } from '../../components/String/String';
import { WrongNetwork } from '../../components/WrongNetwork/WrongNetwork';
import { colors } from '../../theme';
import { currencyValue } from '../../helpers/currencyValue';
import { dateHelpers } from '../../helpers/dateHelpers';
import { handleKnownErrors } from '../../helpers/handleKnownErrors';
import { modal } from 'react-modal-handler';
import { mq } from 'styled-gen';
import { toast } from '../../components/Toaster/Toaster';
import { useEpoch, useRewards } from '@impact-market/utils';
import { useWallet } from '../../hooks/useWallet';
import React, { useCallback, useEffect, useState } from 'react';
import styled, { css } from 'styled-components';

const SummaryRow = styled.div`
    align-items: center;
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

const CountdownWrapper = styled.div`
    background-color: ${colors.backgroundLight};
    border-bottom: 1px solid ${colors.backgroundShadow};
    padding: 1rem;
`;

const Rewards = (props: { onUpdate: Function; translations: any }) => {
    const { onUpdate, translations } = props;
    const { claim, rewards } = useRewards();
    const {
        toastMessagesClaimError,
        toastMessagesClaimSuccess,
        donateContributionReward,
        donateContributionrewardText,
        donateClaim,
        donateRewardsestimationnote,
        donateNocontributionrewardtobeclaimed,
        donateContribute
    } = translations;
    const [claimIsLoading, setClaimIsLoading] = useState(false);

    const handleContributionRewardClaimClick = useCallback(async () => {
        if (claimIsLoading) {
            return;
        }

        setClaimIsLoading(true);

        try {
            const response = await claim();

            setClaimIsLoading(false);

            onUpdate();

            if (!response?.status) {
                return toast.error(toastMessagesClaimError);
            }

            return toast.success(toastMessagesClaimSuccess);
        } catch (error) {
            handleKnownErrors(error, toastMessagesClaimError);
            setClaimIsLoading(false);
        }
    }, [claim, claimIsLoading]);

    return (
        <Div column mt={1} sWidth="100%">
            <Text sColor={colors.g800} sFontSize={1.125} sFontWeight={600}>
                {donateContributionReward}
            </Text>
            <Text mt={0.5} sColor={colors.g500} small>
                {donateContributionrewardText[0]?.text}
            </Text>

            {/* Claimable Reward */}
            {!!rewards?.claimable && (
                <Highlight mt={1}>
                    <HighlightRow>
                        <Text sColor={colors.g800} sFontSize={1.5} sFontWeight={600}>
                            {currencyValue(rewards?.claimable, { isToken: true })}
                            &nbsp; PACT
                        </Text>
                        <Button
                            isLoading={claimIsLoading}
                            mt={{ md: 'unset', xs: 0.625 }}
                            onClick={handleContributionRewardClaimClick}
                            smaller
                        >
                            <Text semibold span="true">
                                {donateClaim}
                            </Text>
                        </Button>
                    </HighlightRow>
                </Highlight>
            )}

            {/* Next epoch reward */}
            {!!rewards?.estimated && (
                <Highlight mt={1}>
                    <HighlightRow>
                        {rewards?.initialised ? (
                            <Text sColor={colors.g800} sFontSize={1.5} sFontWeight={600}>
                                ~{currencyValue(rewards?.estimated, { isToken: true })}
                                &nbsp; PACT
                            </Text>
                        ) : (
                            <GhostElement overColored sHeight={1.25} sWidth={20} />
                        )}
                    </HighlightRow>
                    <HighlightRow>
                        <Text sColor={colors.g500} small>
                            {donateRewardsestimationnote[0]?.text}
                        </Text>
                    </HighlightRow>
                </Highlight>
            )}

            {/* No claimable or estimated Reward */}
            {!rewards?.claimable && !rewards?.estimated && (
                <Highlight mt={1}>
                    <HighlightRow>
                        <Text div sColor={colors.g500} small>
                            {donateNocontributionrewardtobeclaimed[0]?.text}
                        </Text>
                        <TextLink
                            brandPrimary
                            ml={{ md: 'unset', xs: 'auto' }}
                            mr={{ md: 'unset', xs: 'auto' }}
                            mt={{ md: 'unset', xs: 0.625 }}
                            onClick={() => modal.open('governanceContribute')}
                        >
                            {donateContribute}
                        </TextLink>
                    </HighlightRow>
                </Highlight>
            )}
        </Div>
    );
};

const Epoch = ({ translations }: any) => {
    const {
        donateAirgrabSummaryFootnote,
        donateAirgrabSummaryRow1,
        donateAirgrabSummaryRow2,
        donateAirgrabSummaryRow3,
        donateAirgrabSummaryRow4,
        donateAirgrabSummaryRow5
    } = translations;
    const airgrabSummary = [
        donateAirgrabSummaryRow1,
        donateAirgrabSummaryRow2,
        donateAirgrabSummaryRow3,
        donateAirgrabSummaryRow4,
        donateAirgrabSummaryRow5
    ];

    const { rewards } = useRewards();
    const { epoch } = useEpoch();
    const [rows, setRows] = useState(new Array(5).fill(undefined));

    useEffect(() => {
        if (rewards.initialised && epoch.initialised) {
            setRows([
                currencyValue(epoch?.rewards, { isToken: true, symbol: 'PACT' }),
                currencyValue(epoch?.donations.user, { isToken: true, symbol: 'cUSD' }),
                currencyValue(epoch?.donations.everyone, { isToken: true, symbol: 'cUSD' }),
                currencyValue(rewards?.currentEpoch, { isToken: true, symbol: 'PACT' }),
                currencyValue(rewards?.allocated, { isToken: true, symbol: 'PACT' })
            ]);
        }
    }, [epoch, rewards]);

    return (
        <Div column sWidth="100%">
            <Div column sWidth="100%">
                {rows.map((value, index) => (
                    <SummaryRow key={index}>
                        <Text sColor={colors.g800} semibold>
                            {airgrabSummary[index]}
                        </Text>
                        {!(rewards.initialised && epoch.initialised) ? (
                            <GhostElement sHeight={0.75} sWidth={6} />
                        ) : (
                            <Text sColor={colors.g800}>{value}</Text>
                        )}
                    </SummaryRow>
                ))}
            </Div>
            <Text mt={1} sColor={colors.g500} small>
                {donateAirgrabSummaryFootnote[0]?.text}
            </Text>
        </Div>
    );
};

export const Donate = ({ translations }: any) => {
    const { donatePactRewards, donateSummary, donateEpochWillEnd, donateWalletNotConnected } = translations;

    const { address, connect, wrongNetwork } = useWallet();
    const { epoch } = useEpoch();
    const { endPeriod } = epoch || {};
    const [endedEpoch, setEndedEpoch] = useState(dateHelpers.isPast(endPeriod));
    const [, setUpdated] = useState(new Date().getMilliseconds());

    const tabs = [donatePactRewards, donateSummary];

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
                <CountdownWrapper>
                    <Text center sColor={colors.g800} sFontSize={1.125} sFontWeight={600}>
                        <span>
                            {donateEpochWillEnd}
                            &nbsp;
                        </span>
                        <span style={{ color: colors.brandPrimary, whiteSpace: 'nowrap' }}>
                            <Countdown date={endPeriod} onEnd={handleEpochEnd} />
                        </span>
                    </Text>
                </CountdownWrapper>
            )}
            <CardContent>
                {!address && (
                    <Text brandSecondary center small>
                        <TextLink brandPrimary onClick={connect} regular>
                            <String id="connectToYourWallet" />
                        </TextLink>
                        &nbsp;
                        {donateWalletNotConnected}
                    </Text>
                )}
                {!!address && wrongNetwork && <WrongNetwork />}
                {!!address && !wrongNetwork && (
                    <Tabs mb="auto" tabs={tabs}>
                        {/* Breakdown */}
                        <Div column sWidth="100%">
                            {/* Contribution Reward */}
                            <Rewards onUpdate={setUpdated} translations={translations} />
                        </Div>

                        {/* Epoch summary */}
                        <Epoch translations={translations} />
                    </Tabs>
                )}
            </CardContent>
        </Card>
    );
};
