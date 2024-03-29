import {
    Button,
    Card,
    CardContent,
    Div,
    GhostElement,
    Heading,
    Highlight,
    HighlightRow,
    Spinner,
    Text,
    TextLink
} from '../../theme/components';
import { Countdown, Tabs } from '..';
import { String } from '../String/String';
import { WrongNetwork } from '../WrongNetwork/WrongNetwork';
import { colors } from '../../theme';
import { currencyValue } from '../../helpers/currencyValue';
import { dateHelpers } from '../../helpers/dateHelpers';
import { modal } from 'react-modal-handler';
import { mq } from 'styled-gen';
import { toast } from '../Toaster/Toaster';
import {
    useEpoch,
    useMerkleDistributor,
    useRewards
} from '@impact-market/utils';
import { useTranslation } from '../TranslationProvider/TranslationProvider';
import { useWallet } from '../../hooks/useWallet';
import React, { useCallback, useEffect, useState } from 'react';
import axios from 'axios';
import config from '../../../config';
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
    `/api/merkletree/?address=${address}${
        !config.networkRpcUrl ? '&testnet=true' : ''
    }`;

const AirgrabContent = (props: {
    onUpdate: Function;
    treeAccount?: { index: number; amount: string; proof: string[] };
}) => {
    const { onUpdate, treeAccount } = props;
    const [airgrabClaimIsLoading, setAirgrabClaimIsLoading] = useState(false);
    const {
        hasClaim,
        amountToClaim,
        claim: claimAirgrab
    } = useMerkleDistributor(treeAccount);
    const { t } = useTranslation();

    useEffect(() => {
        onUpdate();
    }, [hasClaim]);

    const handleAirgrabRewardClaimClick = async () => {
        if (airgrabClaimIsLoading) {
            return;
        }

        setAirgrabClaimIsLoading(true);

        try {
            const response = await claimAirgrab();

            setAirgrabClaimIsLoading(false);

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
                    <Button
                        isLoading={airgrabClaimIsLoading}
                        onClick={handleAirgrabRewardClaimClick}
                        smaller
                    >
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
    const { claim, rewards } = useRewards();
    const { t } = useTranslation();
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
                return toast.error(t('toast.claimError'));
            }

            return toast.success(t('toast.claimSuccess'));
        } catch (error) {
            setClaimIsLoading(false);
            toast.error(t('toast.claimError'));
        }
    }, [claim, claimIsLoading]);

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
                            {currencyValue(rewards?.claimable, {
                                isToken: true
                            })}
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
                        {rewards?.initialised ? (
                            <Heading h3>
                                ~
                                {currencyValue(rewards?.estimated, {
                                    isToken: true
                                })}
                                &nbsp;
                                <Text regular span="true">
                                    PACT
                                </Text>
                            </Heading>
                        ) : (
                            <GhostElement
                                overColored
                                sHeight={1.25}
                                sWidth={20}
                            />
                        )}
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
                            onClick={() => modal.open('donate')}
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
    const [rows, setRows] = useState(new Array(5).fill(undefined));

    useEffect(() => {
        if (rewards.initialised && epoch.initialised) {
            setRows([
                currencyValue(epoch?.rewards, {
                    isToken: true,
                    symbol: 'PACT'
                }),
                currencyValue(epoch?.donations.user, {
                    isToken: true,
                    symbol: 'cUSD'
                }),
                currencyValue(epoch?.donations.everyone, {
                    isToken: true,
                    symbol: 'cUSD'
                }),
                currencyValue(rewards?.currentEpoch, {
                    isToken: true,
                    symbol: 'PACT'
                }),
                currencyValue(rewards?.allocated, {
                    isToken: true,
                    symbol: 'PACT'
                })
            ]);
        }
    }, [epoch, rewards]);

    return (
        <Div column sWidth="100%">
            <Div column sWidth="100%">
                {rows.map((value, index) => (
                    <SummaryRow key={index}>
                        <Text bold>
                            <String
                                id={`breakdown.airgrab.summary.row${index + 1}`}
                            />
                        </Text>
                        {!(rewards.initialised && epoch.initialised) ? (
                            <GhostElement sHeight={0.75} sWidth={6} />
                        ) : (
                            <Text>{value}</Text>
                        )}
                    </SummaryRow>
                ))}
            </Div>
            <Text brandSecondary mt={1} small>
                <String id="breakdown.airgrab.summary.footnote" />
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

    const tabs = [t('pactRewards'), t('summary')];

    const handleEpochEnd = () => {
        setEndedEpoch(true);
    };

    useEffect(() => {
        if (endPeriod) {
            const epochIsOld = dateHelpers.isPast(endPeriod);

            if (epochIsOld) {
                const timerId = setInterval(
                    () => setUpdated(new Date().getMilliseconds()),
                    10000
                );

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
                    <Heading center h4>
                        <span>
                            <String id="epochWillEndIn" />
                            &nbsp;
                        </span>
                        <span
                            style={{
                                color: colors.brandPrimary,
                                whiteSpace: 'nowrap'
                            }}
                        >
                            <Countdown
                                date={endPeriod}
                                onEnd={handleEpochEnd}
                            />
                        </span>
                    </Heading>
                </CountdownWrapper>
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
                {!!address && wrongNetwork && <WrongNetwork />}
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
