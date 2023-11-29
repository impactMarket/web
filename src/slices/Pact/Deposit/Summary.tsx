import { AlertStyled, FlexWrapperStyled } from './Deposit.style.ts';
import { Box, Button } from '@impact-market/ui';
import { Div, Img, TLink, Text } from '../../../theme/components';
import { colors } from '../../../theme';
import { handleKnownErrors } from '../../../helpers/handleKnownErrors';
import { toast } from '../../../components/Toaster/Toaster';
import { useDepositRedirect } from '@impact-market/utils/useDepositRedirect';
import { useTranslation } from '../../../components/TranslationProvider/TranslationProvider';
import { useWallet } from '../../../hooks/useWallet';
import React, { useState } from 'react';

export const Summary = ({
    funds,
    openDeposit,
    openThanksComponent,
    openWithdraw,
    setFunds,
    setOpenDeposit,
    setOpenThanksComponent,
    setOpenWithdraw,
    token,
    translations
}: any) => {
    const { t } = useTranslation();
    const {
        depositDepositCusd,
        depositDepositMore,
        depositDonateInterest,
        depositInterestEarned,
        depositTotalEarnedInterest,
        depositWithdraw,
        depositYouHaveEarnedInterest,
        depositYouHaveNotDepositedYet,
        toastMessagesCheckYourWallet,
        toastMessagesDonateError,
        toastMessagesDonateSuccess
    } = translations;

    const { address } = useWallet();
    const { donateInterest } = useDepositRedirect();
    const [donateInterestIsLoading, setDonateInterestIsLoading] =
        useState(false);

    const handleDonateInterest = async () => {
        setDonateInterestIsLoading(true);

        try {
            toast.info(toastMessagesCheckYourWallet);

            const response = await donateInterest(address!, token);

            setDonateInterestIsLoading(false);

            if (!response?.status) {
                return toast.error(toastMessagesDonateError);
            }

            setFunds({
                availableInterest: funds?.availableInterest,
                cUsdBalance: funds?.cUsdBalance,
                deposited: funds?.deposited,
                totalInterest: funds?.totalInterest + funds?.availableInterest
            });

            setOpenThanksComponent(true);

            return toast.success(
                t(toastMessagesDonateSuccess, {
                    amount: funds?.availableInterest
                })
            );
        } catch (error) {
            handleKnownErrors(error, t('somethingWrong'));
            setDonateInterestIsLoading(false);

            console.log(error);
        }
    };

    const fundsDepositedFormat = () => {
        if (parseFloat(funds?.deposited) < 0.01) {
            return funds?.deposited?.substring(0, 12);
        }
        if (parseFloat(funds?.deposited) >= 0.01) {
            return Math.floor(parseFloat(funds?.deposited) * 1000) / 1000;
        }

        return 0;
    };

    const interestEarnedFormat = () => {
        if (funds?.availableInterest === '0.00000000') {
            return 0;
        }
        if (parseFloat(funds?.availableInterest) < 0.01) {
            return funds?.availableInterest;
        }
        if (parseFloat(funds?.availableInterest) >= 0.01) {
            return (
                Math.floor(parseFloat(funds?.availableInterest) * 1000) / 1000
            );
        }

        return 0;
    };

    const interestDonatedFormat = () => {
        if (parseFloat(funds?.totalInterest) < 0.01) {
            return funds?.totalInterest.substring(0, 12);
        }
        if (parseFloat(funds?.totalInterest) >= 0.01) {
            return Math.floor(parseFloat(funds?.totalInterest) * 1000) / 1000;
        }

        return 0;
    };

    return (
        <Box flex style={{ flexDirection: 'column', gap: '2rem' }}>
            {!openDeposit && !openWithdraw && !openThanksComponent && (
                <>
                    {(funds?.deposited === 0 || !funds?.deposited) &&
                        Math.floor(funds?.cUsdBalance * 100) / 100 > 0 && (
                            <AlertStyled
                                icon="infoCircle"
                                system
                                title={depositYouHaveNotDepositedYet}
                            />
                        )}
                    {Math.floor(funds?.cUsdBalance * 100) / 100 === 0 && (
                        <AlertStyled
                            error
                            icon="alertCircle"
                            title="You don’t own any Celo Dollar (cUSD)."
                        />
                    )}
                    {funds?.deposited > 0 && (
                        <>
                            {parseFloat(funds?.availableInterest) > 0 && (
                                <AlertStyled
                                    icon="checkCircle"
                                    success
                                    title={depositYouHaveEarnedInterest}
                                />
                            )}
                            <FlexWrapperStyled>
                                <Box
                                    inlineFlex
                                    style={{ alignItems: 'center' }}
                                >
                                    <Img
                                        sHeight={2}
                                        sWidth="auto"
                                        src="/img/cusd.png"
                                    />
                                    <Div ml={0.5} sFlexDirection="column">
                                        <Text
                                            sColor={colors.g800}
                                            sFontSize={1}
                                            sFontWeight={600}
                                            sLineHeight={1.5}
                                        >
                                            {fundsDepositedFormat()} cUSD
                                        </Text>
                                        <Text
                                            sColor={colors.g500}
                                            sFontSize={0.875}
                                            sLineHeight={1.25}
                                        >
                                            {depositInterestEarned}
                                            {interestEarnedFormat()} cUSD
                                        </Text>
                                    </Div>
                                </Box>
                                <Box inlineFlex style={{ gap: '1rem' }}>
                                    <TLink
                                        onClick={() => setOpenWithdraw(true)}
                                        sColor={colors.p700}
                                        sFontSize={0.875}
                                        sFontWeight={500}
                                    >
                                        {depositWithdraw}
                                    </TLink>
                                    <Button
                                        disabled={
                                            parseFloat(
                                                funds?.availableInterest
                                            ) <= 0 || !funds?.availableInterest
                                        }
                                        isLoading={donateInterestIsLoading}
                                        onClick={handleDonateInterest}
                                        secondary
                                    >
                                        <Text sFontWeight={600}>
                                            {depositDonateInterest}
                                        </Text>
                                    </Button>
                                </Box>
                            </FlexWrapperStyled>
                        </>
                    )}
                </>
            )}

            {!openDeposit && !openWithdraw && !openThanksComponent && (
                <Button
                    disabled={Math.floor(funds?.cUsdBalance * 100) / 100 === 0}
                    icon="coins"
                    onClick={() => setOpenDeposit(true)}
                >
                    <Text sFontWeight={500}>
                        {funds?.deposited > 0
                            ? depositDepositMore
                            : depositDepositCusd}
                    </Text>
                </Button>
            )}

            {!openDeposit &&
                !openWithdraw &&
                !openThanksComponent &&
                parseFloat(funds?.totalInterest) > 0 && (
                    <FlexWrapperStyled style={{ gap: '0' }}>
                        <Text pr={1} sColor={colors.g800} sFontWeight={600}>
                            {depositTotalEarnedInterest}
                        </Text>
                        <Text sColor={colors.g800} sFontWeight={400}>
                            ~{interestDonatedFormat()} USD
                        </Text>
                    </FlexWrapperStyled>
                )}
        </Box>
    );
};
