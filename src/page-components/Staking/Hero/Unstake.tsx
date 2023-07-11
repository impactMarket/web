import { BoldInput, String } from '../../../components';
import { Button, Div, Text } from '../../../theme/components';
import { currencyValue } from '../../../helpers/currencyValue';
import { toast } from '../../../components/Toaster/Toaster';
import { usePrismicData } from '../../../lib/Prismic/components/PrismicDataProvider';
import { useStaking } from '@impact-market/utils';
import { useTranslation } from '../../../components/TranslationProvider/TranslationProvider';
import BigNumber from 'bignumber.js';
import React, { useState } from 'react';
import RichText from '../../../lib/Prismic/components/RichText';

export const Unstake = () => {
    const [value, setValue] = useState<number | string>('');
    const [isLoading, setIsLoading] = useState(false);
    const [claimIsLoading, setClaimIsLoading] = useState(false);

    const { t } = useTranslation();

    const { claim, staking, unstake } = useStaking();
    const { claimableUnstaked, stakedAmount, unstakeCooldown } = staking || {};

    const { extractFromPage } = usePrismicData();

    const toastMessages = extractFromPage('toastMessages') || ({} as any);
    const { unstakeTooltip } = extractFromPage('string') as any;

    const handleUnstake = async () => {
        if (Number(value) > stakedAmount || isLoading) {
            return null;
        }

        setIsLoading(true);

        try {
            BigNumber.config({ EXPONENTIAL_AT: 29 });

            const response = await unstake(value?.toString());

            setIsLoading(false);

            if (!response?.status) {
                return toast.error(
                    <RichText content={toastMessages?.unstakeError} />
                );
            }

            setValue('');

            return toast.success(
                <RichText
                    content={toastMessages?.successfulUnstaked}
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

            return toast.error(
                <RichText content={toastMessages?.unstakeError} />
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
                    <RichText content={toastMessages?.claimError} />
                );
            }

            toast.success(
                <RichText
                    content={toastMessages?.claimSuccess}
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

            return toast.error(
                <RichText content={toastMessages?.claimError} />
            );
        }
    };

    return (
        <>
            {/* Unstake */}
            <Div>
                <BoldInput
                    inputPrefix="PACT"
                    label={
                        <>
                            <Text bold span="true" uppercase>
                                <String id="staked" />
                            </Text>
                            : &nbsp;
                            <Text span="true">
                                {currencyValue(stakedAmount, {
                                    isToken: true,
                                    symbol: 'PACT'
                                })}
                            </Text>
                        </>
                    }
                    onChange={(event: any) => setValue(event?.target?.value)}
                    placeholder="0"
                    value={value}
                >
                    <Div
                        sFlexDirection={{ sm: 'row', xs: 'column' }}
                        sWidth={{ sm: 'unset', xs: '100%' }}
                    >
                        {stakedAmount > Number(value) && (
                            <Button
                                onClick={() => setValue(stakedAmount)}
                                silenced
                                smaller
                            >
                                Max.
                            </Button>
                        )}
                        <Button
                            disabled={!value}
                            errorBkg
                            isLoading={isLoading}
                            ml={{ sm: stakedAmount > Number(value) ? 1 : 0 }}
                            mt={{
                                sm: 0,
                                xs: stakedAmount > Number(value) ? 1 : 0
                            }}
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
                    inputPrefix="PACT"
                    label={
                        <>
                            <Text bold span="true" uppercase>
                                <String id="claimableUnstaked" />
                            </Text>
                            : &nbsp;
                            <Text span="true">
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
                            successBkg
                        >
                            <String id="claim" />
                        </Button>
                    </Div>
                </BoldInput>
            </Div>

            {/* Info footnote */}
            {!!unstakeCooldown && (
                <Div mt={1}>
                    <Text center div>
                        <RichText
                            content={unstakeTooltip}
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
