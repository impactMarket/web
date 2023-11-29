import { BoldInput, String } from '../../../components';
import { Button, Div, Text } from '../../../theme/components';
import { colors } from '../../../theme';
import { currencyValue } from '../../../helpers/currencyValue';
import { handleKnownErrors } from '../../../helpers/handleKnownErrors';
import { toast } from '../../../components/Toaster/Toaster';
import { useStaking } from '@impact-market/utils';
import { useTranslation } from '../../../components/TranslationProvider/TranslationProvider';
import BigNumber from 'bignumber.js';
import React, { useState } from 'react';
import RichText from '../../../lib/Prismic/components/RichText';

const Unstake = ({ translations }: any) => {
    const [value, setValue] = useState<any>('');
    const [isLoading, setIsLoading] = useState(false);
    const [claimIsLoading, setClaimIsLoading] = useState(false);

    const { t } = useTranslation();
    const {
        toastMessagesUnstakeError,
        toastMessagesSuccessfulUnstaked,
        toastMessagesClaimError,
        toastMessagesClaimSuccess,
        stakingUnstakeTooltip
    } = translations;

    const { claim, staking, unstake } = useStaking();
    const { claimableUnstaked, stakedAmount, unstakeCooldown } = staking || {};

    const handleUnstake = async () => {
        if (value > stakedAmount || isLoading) {
            return null;
        }

        setIsLoading(true);

        try {
            BigNumber.config({ EXPONENTIAL_AT: 29 });

            const response = await unstake(value?.toString());

            setIsLoading(false);

            if (!response?.status) {
                return toast.error(
                    <RichText content={toastMessagesUnstakeError} />
                );
            }

            setValue('');

            return toast.success(
                <RichText
                    content={toastMessagesSuccessfulUnstaked}
                    variables={{
                        amount: currencyValue(value, {
                            isToken: true,
                            symbol: 'PACT'
                        })
                    }}
                />
            );
        } catch (error) {
            setIsLoading(false);
            console.log(error);

            return handleKnownErrors(
                error,
                <RichText content={toastMessagesUnstakeError} />
            );
        }
    };

    const handleClaim = async () => {
        if (claimIsLoading || !claimableUnstaked) {
            return;
        }

        const claiming = claimableUnstaked;

        setClaimIsLoading(true);

        try {
            const response = await claim();

            if (!response?.status) {
                setClaimIsLoading(false);

                return toast.error(
                    <RichText content={toastMessagesClaimError} />
                );
            }

            toast.success(
                <RichText
                    content={toastMessagesClaimSuccess}
                    variables={{
                        amount: currencyValue(claiming, {
                            isToken: true,
                            symbol: 'PACT'
                        })
                    }}
                />
            );

            return setClaimIsLoading(false);
        } catch (error) {
            setClaimIsLoading(false);
            console.log(error);

            return handleKnownErrors(
                error,
                <RichText content={toastMessagesClaimError} />
            );
        }
    };

    return (
        <>
            {/* Unstake */}
            <Div>
                <BoldInput
                    inputPrefix=""
                    label={
                        <>
                            <Text
                                sColor={colors.g800}
                                sFontWeight={600}
                                span="true"
                                style={{ textTransform: 'capitalize' }}
                            >
                                <String id="staked" />
                            </Text>
                            : &nbsp;
                            <Text
                                sColor={colors.g800}
                                sFontSize={1.125}
                                span="true"
                            >
                                {currencyValue(stakedAmount, {
                                    isToken: true,
                                    symbol: 'PACT'
                                })}
                            </Text>
                        </>
                    }
                    onChange={(event: any) => setValue(event?.target?.value)}
                    placeholder="0 PACT"
                    value={value}
                >
                    <Div
                        sFlexDirection={{ sm: 'row', xs: 'column' }}
                        sWidth={{ sm: 'unset', xs: '100%' }}
                    >
                        {stakedAmount > value && (
                            <Button
                                onClick={() => setValue(stakedAmount)}
                                secondaryDefault
                                smaller
                            >
                                Max.
                            </Button>
                        )}
                        <Button
                            disabled={!value}
                            errorBkg
                            isLoading={isLoading}
                            ml={{ sm: stakedAmount > value ? 1 : 0 }}
                            mt={{ sm: 0, xs: stakedAmount > value ? 1 : 0 }}
                            onClick={handleUnstake}
                            smaller
                        >
                            <String id="unstake" />
                        </Button>
                    </Div>
                </BoldInput>
            </Div>
            {/* Claim */}
            <Div mt={1}>
                <BoldInput
                    asStaticValue
                    inputPrefix=" PACT"
                    label={
                        <>
                            <Text
                                sColor={colors.g800}
                                sFontWeight={600}
                                span="true"
                                style={{ textTransform: 'capitalize' }}
                            >
                                <String id="claimableUnstaked" />
                            </Text>
                            : &nbsp;
                            <Text
                                sColor={colors.g800}
                                sFontSize={1.125}
                                span="true"
                            >
                                {currencyValue(claimableUnstaked, {
                                    isToken: true,
                                    symbol: 'PACT'
                                })}
                            </Text>
                        </>
                    }
                    value={claimableUnstaked}
                >
                    <Div
                        sFlexDirection={{ sm: 'row', xs: 'column' }}
                        sWidth={{ sm: 'unset', xs: '100%' }}
                    >
                        <Button
                            disabled={!claimableUnstaked}
                            isLoading={claimIsLoading}
                            onClick={handleClaim}
                            smaller
                        >
                            <String id="claim" />
                        </Button>
                    </Div>
                </BoldInput>
            </Div>

            {/* Info footnote */}
            {!!unstakeCooldown && (
                <Div mt={1}>
                    <Text center div sColor={colors.g500} sFontSize={0.875}>
                        <RichText
                            content={stakingUnstakeTooltip}
                            variables={{
                                period: `${unstakeCooldown} ${t('days')}`
                            }}
                        />
                    </Text>
                </Div>
            )}
        </>
    );
};

export default Unstake;
