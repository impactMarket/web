import { Box, Icon, Input } from '@impact-market/ui';
import {
    ButtonStyled,
    WithdrawAmountStyled,
    WithdrawLabelStyled
} from './Deposit.style.ts';
import { TLink, Text } from '../../../theme/components';
import { colors } from '../../../theme';
import { handleKnownErrors } from '../../../helpers/handleKnownErrors';
import { toast } from '../../../components/Toaster/Toaster';
import { useDepositRedirect } from '@impact-market/utils/useDepositRedirect';
import { useTranslation } from '../../../components/TranslationProvider/TranslationProvider';
import React, { useState } from 'react';

export const Withdraw = ({
    funds,
    setFunds,
    setOpenWithdraw,
    token,
    translations
}: any) => {
    const { t } = useTranslation();
    const {
        depositBack,
        depositEnterAmountToWithdraw,
        depositWithdraw,
        depositYouHaveCusdAvailableToWithdraw,
        toastMessagesCheckYourWallet,
        toastMessagesWithdrawError,
        toastMessagesWithdrawSuccess
    } = translations;

    const { withdraw } = useDepositRedirect();
    const [withdrawAmount, setWithdrawAmount] = useState('');
    const [withdrawIsLoading, setWithdrawIsLoading] = useState(false);

    const handleWithdraw = async () => {
        setWithdrawIsLoading(true);

        try {
            toast.info(toastMessagesCheckYourWallet);

            const response = await withdraw(token, withdrawAmount);

            setWithdrawIsLoading(false);

            if (!response?.status) {
                return toast.error(toastMessagesWithdrawError);
            }

            setFunds({
                availableInterest: funds?.availableInterest,
                cUsdBalance: funds?.cUsdBalance + parseFloat(withdrawAmount),
                deposited: funds?.deposited - parseFloat(withdrawAmount),
                totalInterest: funds?.totalInterest
            });
            setWithdrawAmount('');
            setOpenWithdraw(false);

            return toast.success(
                t(toastMessagesWithdrawSuccess, { amount: withdrawAmount })
            );
        } catch (error) {
            handleKnownErrors(error, t('somethingWrong'));
            setWithdrawIsLoading(false);

            console.log(error);
        }
    };

    return (
        <Box flex style={{ flexDirection: 'column', gap: '1rem' }}>
            <WithdrawLabelStyled
                onClick={() => {
                    setWithdrawAmount('');
                    setOpenWithdraw(false);
                }}
            >
                <Icon icon="arrowLeft" mr={0.5} sColor={colors.p700} />
                <TLink sColor={colors.p700} sFontSize={0.875} sFontWeight={500}>
                    {depositBack}
                </TLink>
            </WithdrawLabelStyled>
            <WithdrawAmountStyled>
                <Input
                    hint={t(depositYouHaveCusdAvailableToWithdraw, {
                        funds: funds?.deposited || 0
                    })}
                    name="withdraw"
                    onChange={(event: any) =>
                        setWithdrawAmount(event.target.value)
                    }
                    placeholder={depositEnterAmountToWithdraw}
                    suffix="cUSD"
                    type="number"
                    value={withdrawAmount || ''}
                    withError={
                        withdrawAmount <= '0' && !!withdrawAmount && true
                    }
                />
            </WithdrawAmountStyled>
            <ButtonStyled
                disabled={withdrawAmount <= '0' && !withdrawAmount}
                isLoading={withdrawIsLoading}
                onClick={handleWithdraw}
            >
                <Text sFontWeight={600}>{depositWithdraw}</Text>
            </ButtonStyled>
        </Box>
    );
};
