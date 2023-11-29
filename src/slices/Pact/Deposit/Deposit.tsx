/* eslint-disable no-nested-ternary */
import {
    AmountStyled,
    ButtonsStyled,
    EmailStyled,
    LabelStyled,
    PrivacyPolicyStyled
} from './Deposit.style.ts';
import { Box, Button, Icon, Input } from '@impact-market/ui';
import { TLink, Text } from '../../../theme/components';
import { colors } from '../../../theme';
import { getCookie } from 'cookies-next';
import { handleKnownErrors } from '../../../helpers/handleKnownErrors';
import { handleSignature } from '../../../helpers/handleSignature';
import { toast } from '../../../components/Toaster/Toaster';
import { useDepositRedirect } from '@impact-market/utils/useDepositRedirect';
import { useSignatures } from '@impact-market/utils';
import { useTranslation } from '../../../components/TranslationProvider/TranslationProvider';
import { validateEmail } from '../../../helpers/validateEmail';
import React, { useEffect, useState } from 'react';
import RichText from '../../../lib/Prismic/components/RichText';
import config from '../../../../config';

export const Deposit = ({
    token,
    funds,
    setFunds,
    setOpenDeposit,
    translations
}: any) => {
    const { t } = useTranslation();
    const {
        depositApproveAndCheckYourWallet,
        depositApproveTransaction,
        depositApproved,
        depositBack,
        depositDepositCusd,
        depositEnterAmountToDeposit,
        depositEnterEmail,
        depositPrivacyPolicy,
        depositThisEmailWillBeNotified,
        depositTransactionApproved,
        depositYouHaveCusdAvailableToDeposit,
        toastMessagesApproveDepositError,
        toastMessagesCheckYourWallet,
        toastMessagesDepositError,
        toastMessagesDepositSuccess
    } = translations;

    const { signMessage } = useSignatures();

    const { approve, deposit } = useDepositRedirect();
    const [depositAmount, setDepositAmount] = useState('');
    const [approveIsLoading, setApproveIsLoading] = useState(false);
    const [depositIsLoading, setDepositIsLoading] = useState(false);
    const [depositButtonDisabled, setDepositButtonDisabled] = useState(true);
    const [email, setEmail] = useState('');
    const [newEmail, setNewEmail] = useState('');
    const [privacyPolicyCheck, setPrivacyPolicyCheck] = useState(false);

    const getEmail = async () => {
        try {
            const res = await fetch(`${config.baseApiUrl}/users`, {
                headers: {
                    Accept: 'application/json',
                    Authorization: `Bearer ${getCookie('AUTH_TOKEN')}`,
                    'Content-Type': 'application/json'
                },
                method: 'GET'
            });

            const response = await res.json();

            setEmail(response?.data?.email);
        } catch (error) {
            console.log('User Data Error: ', error);

            return false;
        }
    };

    useEffect(() => {
        getEmail();
    }, []);

    const handleApprove = async () => {
        setApproveIsLoading(true);
        setDepositButtonDisabled(true);

        try {
            if (!validateEmail(newEmail || email)) {
                setApproveIsLoading(false);

                return toast.error(t('invalidEmail'));
            }

            toast.info(toastMessagesCheckYourWallet);

            const response = await approve(token, depositAmount);

            setApproveIsLoading(false);

            if (!response?.status) {
                return toast.error(toastMessagesApproveDepositError);
            }

            setDepositButtonDisabled(false);

            return toast.success(depositTransactionApproved);
        } catch (error) {
            handleKnownErrors(error, t('somethingWrong'));
            setApproveIsLoading(false);

            console.log('Approve Error: ', error);
        }
    };

    const handleDeposit = async () => {
        setDepositIsLoading(true);

        try {
            // If user changes email, add it on backend
            if (!!newEmail) {
                if (!getCookie('SIGNATURE') || !getCookie('MESSAGE')) {
                    await handleSignature(signMessage);
                }

                await fetch(`${config.baseApiUrl}/users`, {
                    body: JSON.stringify({ email: newEmail }),
                    headers: {
                        Accept: 'application/json',
                        Authorization: `Bearer ${getCookie('AUTH_TOKEN')}`,
                        'Content-Type': 'application/json',
                        Message: `${getCookie('MESSAGE')}`,
                        Signature: `${getCookie('SIGNATURE')}`
                    },
                    method: 'PUT'
                });
            }

            toast.info(toastMessagesCheckYourWallet);

            const response = await deposit(token, depositAmount);

            setDepositIsLoading(false);

            if (!response?.status) {
                return toast.error(toastMessagesDepositError);
            }

            setFunds({
                availableInterest: funds?.availableInterest,
                cUsdBalance: funds?.cUsdBalance - parseFloat(depositAmount),
                deposited: (funds?.deposited || 0) + parseFloat(depositAmount),
                totalInterest: funds?.totalInterest
            });
            setDepositAmount('');
            setDepositButtonDisabled(true);
            setOpenDeposit(false);

            return toast.success(
                t(toastMessagesDepositSuccess, { amount: depositAmount })
            );
        } catch (error) {
            handleKnownErrors(error, t('somethingWrong'));
            setDepositIsLoading(false);

            console.log('Deposit Error: ', error);
        }
    };

    return (
        <Box flex style={{ flexDirection: 'column', gap: '2rem' }}>
            <LabelStyled
                onClick={() => {
                    setDepositAmount('');
                    setOpenDeposit(false);
                    setDepositButtonDisabled(true);
                }}
            >
                <Icon icon="arrowLeft" mr={0.5} sColor={colors.p700} />
                <TLink sColor={colors.p700} sFontSize={0.875} sFontWeight={500}>
                    {depositBack}
                </TLink>
            </LabelStyled>
            <>
                <AmountStyled>
                    <Input
                        disabled={
                            Math.floor(funds?.cUsdBalance * 100) / 100 === 0
                        }
                        hint={t(depositYouHaveCusdAvailableToDeposit, {
                            cUsdBalance:
                                Math.floor(funds?.cUsdBalance * 100) / 100 ||
                                '0'
                        })}
                        name="deposit"
                        onChange={(event: any) =>
                            setDepositAmount(event.target.value)
                        }
                        placeholder={depositEnterAmountToDeposit}
                        suffix="cUSD"
                        type="number"
                        value={depositAmount || ''}
                        withError={depositAmount === '0' && true}
                    />
                </AmountStyled>
                <EmailStyled>
                    <Input
                        hint={depositThisEmailWillBeNotified}
                        icon="mail"
                        name="email"
                        onChange={(event: any) =>
                            setNewEmail(event.target.value)
                        }
                        placeholder={depositEnterEmail}
                        type="email"
                        value={newEmail || email || ''}
                    />
                </EmailStyled>
                <PrivacyPolicyStyled checked={privacyPolicyCheck}>
                    <label>
                        <input
                            checked={privacyPolicyCheck}
                            onChange={() =>
                                setPrivacyPolicyCheck(!privacyPolicyCheck)
                            }
                            type="checkbox"
                        />
                        <span />
                        <RichText
                            content={depositPrivacyPolicy}
                            ml={1.5}
                            sColor={colors.g700}
                            sFontSize={0.875}
                            sFontWeight={500}
                        />
                    </label>
                </PrivacyPolicyStyled>
            </>
            <Box>
                {(!!newEmail || !!email) &&
                    !!depositAmount &&
                    depositButtonDisabled &&
                    privacyPolicyCheck && (
                        <RichText
                            center
                            content={depositApproveAndCheckYourWallet}
                            mb={0.5}
                            sColor={colors.g500}
                            sFontSize={0.875}
                        />
                    )}
                {!depositButtonDisabled && (
                    <RichText
                        center
                        content={depositTransactionApproved}
                        mb={0.5}
                        sColor={colors.g500}
                        sFontSize={0.875}
                    />
                )}
                <ButtonsStyled
                    state={
                        (!!newEmail || !!email) &&
                        !!depositAmount &&
                        depositButtonDisabled
                            ? 'approve'
                            : !depositButtonDisabled && 'deposit'
                    }
                >
                    <Button
                        disabled={
                            !((!!newEmail || !!email) && !!depositAmount) ||
                            !depositButtonDisabled ||
                            !privacyPolicyCheck
                        }
                        icon="checkCircle"
                        isLoading={approveIsLoading}
                        onClick={handleApprove}
                    >
                        <Text sFontWeight={600}>
                            {!depositButtonDisabled
                                ? depositApproved
                                : depositApproveTransaction}
                        </Text>
                    </Button>
                    <Icon icon="chevronRight" />
                    <Button
                        disabled={depositButtonDisabled}
                        isLoading={depositIsLoading}
                        onClick={handleDeposit}
                    >
                        <Text sFontWeight={600}>{depositDepositCusd}</Text>
                    </Button>
                </ButtonsStyled>
            </Box>
        </Box>
    );
};
