import {
    Button,
    Card,
    CardContent,
    Div,
    Heading,
    Highlight,
    HighlightRow,
    Icon,
    Spinner,
    Text,
    TextLink
} from '../../theme/components';
import { Countdown, Tabs } from '..';
import { String } from '../String/String';
import { colors } from '../../theme';
import { currencyValue } from '../../helpers/currencyValue';
import { dateHelpers } from '../../helpers/dateHelpers';
import { modal } from 'react-modal-handler';
import { mq } from 'styled-gen';
import { toast } from '../Toaster/Toaster';
import { useEpoch, useMerkleDistributor, useRewards } from '@impact-market/utils';
import { useTranslation } from '../TranslationProvider/TranslationProvider';
import { useWallet } from '../../hooks/useWallet';
import React, { useCallback, useEffect, useState } from 'react';
import axios from 'axios';
import config from '../../../config';
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

const SpinnerContent = styled.div`
    border-radius: 50%;
    height: 4rem;
    overflow: hidden;
    position: relative;
    width: 4rem;
`;

const SpinnerWrapper = styled.div`
    align-items: center;
    display: flex;
    height: 100%;
    position: absolute;
    justify-content: center;
    width: 100%;
`;

const getMerkleTreeUrl = (address: string) =>
    `/api/merkletree/?address=${address}${!config.networkRpcUrl ? '&testnet=true' : ''}`;

const AirgrabContent = (props: {
    onUpdate: Function;
    treeAccount?: { index: number; amount: string; proof: string[] };
}) => {
    const { onUpdate, treeAccount } = props;
    const [airgrabClaimIsLoading, setAirgrabClaimIsLoading] = useState(false);
    const { hasClaim, amountToClaim, claim: claimAirgrab } = useMerkleDistributor(treeAccount);
    const { t } = useTranslation();

    useEffect(() => {
        onUpdate();
    }, [hasClaim]);

    const handleAirgrabRewardClaimClick = async () => {
        if (airgrabClaimIsLoading) {
            return;
        }

        try {
            const response = await claimAirgrab();

            setAirgrabClaimIsLoading(true);

            if (!response?.status) {
                return toast.error(t('toast.claimError'));
            }

            return toast.success(t('toast.claimSuccess'));
        } catch (error) {
            setAirgrabClaimIsLoading(false);
            toast.error(t('toast.claimError'));
        }
    };

    if (!hasClaim) {
        return null;
    }

    return (
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
                        {currencyValue(amountToClaim, { isToken: true })}
                        &nbsp;
                        <Text regular span="true">
                            PACT
                        </Text>
                    </Heading>
                    <Button isLoading={airgrabClaimIsLoading} onClick={handleAirgrabRewardClaimClick} smaller>
                        <Text semibold span="true">
                            <String id="claim" />
                        </Text>
                    </Button>
                </HighlightRow>
            </Highlight>
        </Div>
    );
};

const Airgrab = (props: { address?: string; onUpdate: Function }) => {
    const { address, onUpdate } = props;
    const [treeAccount, setTreeAccount] = useState();

    useEffect(() => {
        const getTreeAccount = async () => {
            if (!address) {
                return;
            }

            try {
                const response = await axios.get(getMerkleTreeUrl(address));

                const treeAccount = response?.data?.merkleTree;

                setTreeAccount(treeAccount);
            } catch (error) {
                console.log(error);
            }
        };

        getTreeAccount();
    }, [address]);

    if (!address || !treeAccount) {
        return null;
    }

    if (!treeAccount) {
        return (
            <SpinnerWrapper>
                <SpinnerContent>
                    <Spinner isLoading />
                </SpinnerContent>
            </SpinnerWrapper>
        );
    }

    return <AirgrabContent onUpdate={onUpdate} treeAccount={treeAccount} />;
};

const Rewards = (props: { onUpdate: Function }) => {
    const { onUpdate } = props;
    const { claimRewards, rewards } = useRewards();
    const { t } = useTranslation();
    const [claimIsLoading, setClaimIsLoading] = useState(false);

    const handleContributionRewardClaimClick = useCallback(async () => {
        if (claimIsLoading) {
            return;
        }

        setClaimIsLoading(true);

        try {
            const response = await claimRewards();

            setClaimIsLoading(false);

            onUpdate();

            if (!response?.status) {
                return toast.error(t('toast.claimError'));
            }

            return toast.success(t('toast.claimSuccess'));
        } catch (error) {
            setClaimIsLoading(false);
            toast.error(t('toast.claimError'));
        }
    }, [claimRewards, claimIsLoading]);

    return (
        <Div column mt={1} sWidth="100%">
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
                        <Text ml={2} mt={{ md: 'unset', xs: 0.625 }} sTextAlign={{ md: 'right', xs: 'center' }} small>
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
    );
};

const Epoch = () => {
    const { rewards } = useRewards();
    const { epoch } = useEpoch();

    return (
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
                    <Text>{currencyValue(epoch?.userContribution, { isToken: true, symbol: 'cUSD' })}</Text>
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
    );
};

export const Breakdown = () => {
    const { address, connect, wrongNetwork } = useWallet();
    const { epoch } = useEpoch();
    const { endPeriod } = epoch || {};
    const { t } = useTranslation();
    const [endedEpoch, setEndedEpoch] = useState(dateHelpers.isPast(endPeriod));
    const [, setUpdated] = useState(new Date().getMilliseconds());

    const tabs = [t('pactRewardsBreakdown'), t('currentEpochSummary')];

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
                {!address && (
                    <Text brandSecondary center small>
                        <TextLink brandPrimary onClick={connect} regular>
                            <String id="connectToYourWallet" />
                        </TextLink>
                        &nbsp;
                        <String id="breakdown.walletNotConnected.text" />
                    </Text>
                )}
                {!!address && wrongNetwork && (
                    <>
                        <Icon error icon="circleWarning" ml="auto" mr="auto" sHeight={2} sWidth={2} />
                        <Text center mt={1} small>
                            <String id="wrongNetwork" />
                        </Text>
                    </>
                )}
                {!!address && !wrongNetwork && (
                    <Tabs mb="auto" tabs={tabs}>
                        {/* Breakdown */}
                        <Div column sWidth="100%">
                            {/* Airgrab */}
                            <Airgrab address={address} onUpdate={setUpdated} />

                            {/* Contribution Reward */}
                            <Rewards onUpdate={setUpdated} />
                        </Div>

                        {/* Epoch summary */}
                        <Epoch />
                    </Tabs>
                )}
            </CardContent>
        </Card>
    );
};
