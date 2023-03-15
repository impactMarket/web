import {
    Button,
    Card,
    CardContent,
    Div,
    GhostElement,
    Highlight,
    HighlightRow,
    Spinner,
    Text,
    TextLink
} from '../../theme/components';
import { Countdown, Tabs } from '../../components';
import { String } from '../../components/String/String';
import { WrongNetwork } from '../../components/WrongNetwork/WrongNetwork';
import { colors } from '../../theme';
import { currencyValue } from '../../helpers/currencyValue';
import { dateHelpers } from '../../helpers/dateHelpers';
import { modal } from 'react-modal-handler';
import { mq } from 'styled-gen';
import { toast } from '../../components/Toaster/Toaster';
import { useEpoch, useMerkleDistributor, useRewards } from '@impact-market/utils';
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
    `/api/merkletree/?address=${address}${!config.networkRpcUrl ? '&testnet=true' : ''}`;

const AirgrabContent = (props: {
    onUpdate: Function;
    treeAccount?: { index: number; amount: string; proof: string[] };
    translations: any;
}) => {
    const { onUpdate, treeAccount, translations } = props;
    const [airgrabClaimIsLoading, setAirgrabClaimIsLoading] = useState(false);
    const { hasClaim, amountToClaim, claim: claimAirgrab } = useMerkleDistributor(treeAccount);
    const {
        donateAirgrabReward,
        donateAirgrabrewardText,
        donateClaim,
        toastMessagesClaimError,
        toastMessagesClaimSuccess
    } = translations;

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
                return toast.error(toastMessagesClaimError);
            }

            return toast.success(toastMessagesClaimSuccess);
        } catch (error) {
            setAirgrabClaimIsLoading(false);
            toast.error(toastMessagesClaimError);
        }
    };

    if (!hasClaim) {
        return null;
    }

    return (
        <Div column sWidth="100%">
            <Text sColor={colors.g800} sFontSize={1.125} sFontWeight={600}>
                {donateAirgrabReward}
            </Text>
            <Text mt={0.5} sColor={colors.g500} small>
                {donateAirgrabrewardText[0]?.text}
            </Text>
            <Highlight mt={1}>
                <HighlightRow>
                    <Text sColor={colors.g800} sFontSize={1.5} sFontWeight={600}>
                        {currencyValue(amountToClaim, { isToken: true })}
                        &nbsp; PACT
                    </Text>
                    <Button isLoading={airgrabClaimIsLoading} onClick={handleAirgrabRewardClaimClick} smaller>
                        <Text semibold span="true">
                            {donateClaim}
                        </Text>
                    </Button>
                </HighlightRow>
            </Highlight>
        </Div>
    );
};

const Airgrab = (props: { address?: string; onUpdate: Function; translations: any }) => {
    const { address, onUpdate, translations } = props;
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

    return <AirgrabContent onUpdate={onUpdate} translations={translations} treeAccount={treeAccount} />;
};

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
            setClaimIsLoading(false);
            toast.error(toastMessagesClaimError);
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
                            {/* Airgrab */}
                            <Airgrab address={address} onUpdate={setUpdated} translations={translations} />

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
