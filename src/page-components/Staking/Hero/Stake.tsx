import { BoldInput } from '../../../components/BoldInput/BoldInput';
import { Button, Div, Hr, InfoTooltip, Text, WarningBlock } from '../../../theme/components';
import { String } from '../../../components';
import { currencyValue } from '../../../helpers/currencyValue';
import { toast } from '../../../components/Toaster/Toaster';
import { usePACTBalance, useStaking } from '@impact-market/utils';
import { usePrismicData } from '../../../lib/Prismic/components/PrismicDataProvider';
import { useTranslation } from '../../../components/TranslationProvider/TranslationProvider';
import BigNumber from 'bignumber.js';
import React, { useEffect, useState } from 'react';
import RichText from '../../../lib/Prismic/components/RichText';

export const Stake = () => {
    const { approve, stake, stakeRewards, staking, unstakingUserInfo } = useStaking();
    const { allocated, unstakeCooldown } = staking;

    const [unstakingInfo, setUnstakingInfo] = useState<{ amount: number; cooldown: number }[]>([]);

    const pact = usePACTBalance();
    const { extractFromPage } = usePrismicData();
    const { t } = useTranslation();

    const { allocatedNotes, amountToBeReleased, stakingWarning } = extractFromPage('string') as any;

    const toastMessages = extractFromPage('toastMessages') || ({} as any);

    const [value, setValue] = useState<number | string>('');
    const [withApprovedAmount, setWithApprovedAmount] = useState(false);
    const [approvedAmount, setApprovedAmount] = useState(0);
    const [isLoading, setIsLoading] = useState(false);
    const [rewardIsLoading, setRewardIsLoading] = useState(false);

    const balance = currencyValue(pact, { isToken: true, symbol: 'PACT' });

    useEffect(() => {
        const getUnstakingInfo = async () => {
            try {
                const unstakingInfo = await unstakingUserInfo();

                return setUnstakingInfo(unstakingInfo);
            } catch (error) {
                console.log(error);
            }
        };

        getUnstakingInfo();
    }, [staking]);

    useEffect(() => {
        if (!!value && +approvedAmount >= +value) {
            setWithApprovedAmount(true);
        }

        if (+approvedAmount < +value || !+approvedAmount || !+value) {
            setWithApprovedAmount(false);
        }
    }, [value, approvedAmount]);

    const handleApprove = async () => {
        if (isLoading || !+value) {
            return;
        }

        setIsLoading(true);

        try {
            BigNumber.config({ EXPONENTIAL_AT: 29 });

            const response = await approve(value);

            setIsLoading(false);

            if (!response?.status) {
                return toast.error(<RichText content={toastMessages?.stakeApproveError} />);
            }

            toast.success(
                <RichText
                    content={toastMessages?.successfulStakeApprove}
                    variables={{ amount: currencyValue(value, { isToken: true, symbol: 'PACT' }) }}
                />
            );

            return setApprovedAmount(+value);
        } catch (error) {
            setIsLoading(false);
            console.log(error);

            return toast.error(<RichText content={toastMessages?.stakeApproveError} />);
        }
    };

    const handleStake = async () => {
        if (isLoading || !+value) {
            return;
        }

        setIsLoading(true);

        try {
            BigNumber.config({ EXPONENTIAL_AT: 29 });

            const response = await stake(value);

            setIsLoading(false);

            if (!response?.status) {
                return toast.error(<RichText content={toastMessages?.stakeError} />);
            }

            setValue('');
            setApprovedAmount(0);
            setWithApprovedAmount(false);

            return toast.success(
                <RichText
                    content={toastMessages?.successfulStaked}
                    variables={{ amount: currencyValue(value, { isToken: true, symbol: 'PACT' }) }}
                />
            );
        } catch (error) {
            setIsLoading(false);
            console.log(error);

            return toast.error(<RichText content={toastMessages?.stakeError} />);
        }
    };

    const handleButtonClick = () => {
        if (withApprovedAmount) {
            return handleStake();
        }

        return handleApprove();
    };

    const handleRewardStake = async () => {
        if (rewardIsLoading || !allocated) {
            return;
        }

        setRewardIsLoading(true);

        try {
            BigNumber.config({ EXPONENTIAL_AT: 29 });

            const response = await stakeRewards();

            setRewardIsLoading(false);

            if (!response?.status) {
                return toast.error(<RichText content={toastMessages?.stakeAllocatedError} />);
            }

            return toast.success(
                <RichText
                    content={toastMessages?.successfulAllocatedStaked}
                    variables={{ amount: currencyValue(allocated, { isToken: true, symbol: 'PACT' }) }}
                />
            );
        } catch (error) {
            setRewardIsLoading(false);
            console.log(error);

            return toast.error(<RichText content={toastMessages?.stakeAllocatedError} />);
        }
    };

    return (
        <>
            <WarningBlock yellowLight>
                <RichText
                    center
                    content={stakingWarning}
                    sub
                    variables={{ period: `${unstakeCooldown} ${t('days')}` }}
                />
            </WarningBlock>
            <Div mt={2}>
                <BoldInput
                    inputPrefix="PACT"
                    label={
                        <>
                            <Text bold span="true" uppercase>
                                <String id="walletBalance" />
                            </Text>
                            : &nbsp;
                            <Text span="true">{balance}</Text>
                        </>
                    }
                    onChange={(event: any) => setValue(event?.target?.value)}
                    placeholder="0"
                    value={value}
                >
                    <Div sFlexDirection={{ sm: 'row', xs: 'column' }} sWidth={{ md: 'unset', xs: '100%' }}>
                        {!withApprovedAmount && (
                            <Button onClick={() => setValue(pact)} silenced smaller>
                                Max.
                            </Button>
                        )}
                        <Button
                            disabled={!value}
                            isLoading={isLoading}
                            ml={{ sm: !withApprovedAmount ? 1 : 0 }}
                            mt={{ sm: 0, xs: !withApprovedAmount ? 1 : 0 }}
                            onClick={handleButtonClick}
                            smaller
                            successBkg
                        >
                            <String id={withApprovedAmount ? 'stake' : 'approve'} />
                        </Button>
                    </Div>
                </BoldInput>
            </Div>
            <Div mt={1}>
                <BoldInput
                    asStaticValue
                    inputPrefix="PACT"
                    label={
                        <Div>
                            <Text bold span="true" uppercase>
                                <String id="rewardsAllocated" />
                            </Text>
                            <InfoTooltip>
                                <Text small>{allocatedNotes}</Text>
                                {!!unstakingInfo?.length && (
                                    <>
                                        <Hr />
                                        {unstakingInfo.map(({ amount, cooldown }, index) => (
                                            <RichText
                                                content={amountToBeReleased}
                                                key={index}
                                                mt={index ? 0.5 : 0}
                                                small
                                                variables={{
                                                    amount: currencyValue(amount, {
                                                        isToken: true,
                                                        symbol: 'PACT'
                                                    }),
                                                    period: `${cooldown} ${t('days')}`
                                                }}
                                            />
                                        ))}
                                    </>
                                )}
                            </InfoTooltip>
                        </Div>
                    }
                    value={currencyValue(allocated, { fixed: 5, isToken: true })}
                >
                    <Div sFlexDirection={{ sm: 'row', xs: 'column' }} sWidth={{ sm: 'unset', xs: '100%' }}>
                        <Button
                            disabled={!allocated}
                            isLoading={rewardIsLoading}
                            onClick={handleRewardStake}
                            smaller
                            successBkg
                        >
                            <String id="stake" />
                        </Button>
                    </Div>
                </BoldInput>
            </Div>
        </>
    );
};
