import { ButtonsStyled } from './ModalDonate.style';
import {
    Box,
    Button,
    Icon,
    Input,
    OptionItem,
    colors
} from '@impact-market/ui';
import { Text } from '../../theme/components';
import { getCookie } from 'cookies-next';
import { handleKnownErrors } from '../../helpers/handleKnownErrors';
import { handleSignature } from '../../helpers/handleSignature';
import { toast } from '../../components/Toaster/Toaster';
import {
    useCUSDBalance,
    useDonationMiner,
    useSignatures
} from '@impact-market/utils';
import { useTranslation } from '../../components/TranslationProvider/TranslationProvider';
import React, { useEffect, useState } from 'react';
import RichText from '../../lib/Prismic/components/RichText';
import config from '../../../config';
import { dateHelpers } from 'src/helpers/dateHelpers';
import { usePrismicData } from 'src/lib/Prismic/components/PrismicDataProvider';
import {
    OptionsStyled,
    EmailStyled,
    CancelButtonStyled
} from './ModalDonate.style';

type SelectedOption = {
    value: number;
};

export const DonateRecurrent = ({
    recurrentDonation,
    refresh,
    setRefresh,
    setDonationType,
    setDonateValue
}: any) => {
    const { t } = useTranslation();
    const { extractFromModals } = usePrismicData();
    const translations = extractFromModals('donateModal') as any;

    const {
        availableToDonate,
        recurrentDonationHeading,
        recurrentDonationDescription,
        cancel,
        renewSubscription,
        approve: approveText,
        subscribe,
        updateSubscription,
        subscriptionCanceled
    } = translations;

    const cUsdBalance = useCUSDBalance();
    const { signMessage } = useSignatures();

    const { approve } = useDonationMiner();
    const [approveIsLoading, setApproveIsLoading] = useState(false);
    const [depositIsLoading, setDepositIsLoading] = useState(false);
    const [depositButtonDisabled, setDepositButtonDisabled] = useState(true);
    const [email, setEmail] = useState('');
    const [newEmail, setNewEmail] = useState('');

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
            const response = await approve(selected?.value * 10);

            setApproveIsLoading(false);

            if (!response?.status) {
                return toast.error(t('somethingWrong'));
            }

            setDepositButtonDisabled(false);

            return toast.success(subscribe[0]?.text);
        } catch (error) {
            console.log(error);
            handleKnownErrors(error, t('somethingWrong'));
            setApproveIsLoading(false);
        }
    };

    const handleDeposit = async () => {
        setDepositIsLoading(true);

        try {
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

            const res = await fetch(`${config.baseApiUrl}/lazy-agenda`, {
                body: JSON.stringify({
                    type: 0,
                    details: {
                        amount: selected?.value
                    },
                    frequency: dateHelpers.monthsToSeconds(1)
                }),
                headers: {
                    Accept: 'application/json',
                    Authorization: `Bearer ${getCookie('AUTH_TOKEN')}`,
                    'Content-Type': 'application/json',
                    Message: `${getCookie('MESSAGE')}`,
                    Signature: `${getCookie('SIGNATURE')}`
                },
                method: 'POST'
            });

            const response = await res.json();

            if (response?.success) {
                setDonateValue({
                    type: 2,
                    value: selected?.value
                });
                setDonationType(3);
            }

            setDepositIsLoading(false);
        } catch (error) {
            console.log(error);
            handleKnownErrors(error, t('somethingWrong'));
            setDepositIsLoading(false);
        }

        setRefresh(!refresh);
    };

    const handleCancel = async () => {
        try {
            const res = await fetch(
                `${config.baseApiUrl}/lazy-agenda/${recurrentDonation[0]?.id}`,
                {
                    body: JSON.stringify({
                        id: recurrentDonation[0]?.id
                    }),
                    headers: {
                        Accept: 'application/json',
                        Authorization: `Bearer ${getCookie('AUTH_TOKEN')}`,
                        'Content-Type': 'application/json',
                        Message: `${getCookie('MESSAGE')}`,
                        Signature: `${getCookie('SIGNATURE')}`
                    },
                    method: 'DELETE'
                }
            );

            const response = await res.json();

            if (response?.success) {
                toast.success(subscriptionCanceled);
            }
        } catch (error) {
            handleKnownErrors(error, t('somethingWrong'));
            console.log(error);
        }

        setRefresh(!refresh);
    };

    const [selected, setSelected] = useState<SelectedOption | undefined>({
        value: recurrentDonation[0]?.details?.amount
    });

    const handleOptionClick = (selecting: any) => {
        if (selecting?.value !== selected?.value) {
            return setSelected(selecting);
        }
    };

    const options = [
        {
            value: 5
        },
        {
            value: 10
        },
        {
            value: 25
        },
        {
            value: 50
        }
    ];

    const checkSelected = (value: number) => {
        if (selected) {
            if (selected?.value === value) {
                return true;
            }
        } else {
            if (recurrentDonation[0]?.details?.amount === value) {
                return true;
            }
        }

        return false;
    };

    return (
        <Box flex style={{ flexDirection: 'column', gap: '2rem' }}>
            <Box>
                <RichText
                    content={recurrentDonationHeading}
                    sFontSize="1.125rem"
                    sFontWeight={500}
                />
                <RichText
                    content={recurrentDonationDescription}
                    g500
                    mt={0.5}
                    small
                />
            </Box>
            <OptionsStyled>
                {options.map(({ value }) => (
                    <OptionItem
                        isActive={checkSelected(value)}
                        key={value}
                        // @ts-ignore
                        onClick={() => handleOptionClick({ value })}
                        content={`$${value}/${t('month')}`}
                    />
                ))}
            </OptionsStyled>

            <Text center small g500 mt="-1rem">
                {t(availableToDonate[0].text, {
                    value: Math.floor(cUsdBalance * 100) / 100 || '0'
                })}
            </Text>

            {recurrentDonation?.length !== 0 &&
                recurrentDonation &&
                recurrentDonation[0]?.details?.amount === selected?.value && (
                    <CancelButtonStyled icon="close" onClick={handleCancel}>
                        <RichText
                            content={cancel}
                            variables={{
                                value: `${
                                    recurrentDonation[0]?.details?.amount
                                } ${`${t('monthly')}`}`
                            }}
                            sFontWeight={600}
                        />
                    </CancelButtonStyled>
                )}

            {selected?.value &&
                recurrentDonation[0]?.details?.amount !== selected?.value && (
                    <EmailStyled>
                        <Input
                            hint={renewSubscription[0]?.text}
                            icon="mail"
                            name="email"
                            onChange={(event: any) =>
                                setNewEmail(event.target.value)
                            }
                            placeholder={t('enterYourEmail')}
                            type="email"
                            value={newEmail || email || ''}
                        />
                    </EmailStyled>
                )}

            {recurrentDonation?.length !== 0 &&
                recurrentDonation[0]?.details?.amount !== selected?.value && (
                    <Button
                        isLoading={approveIsLoading || depositIsLoading}
                        onClick={() => {
                            handleCancel();
                            handleApprove();
                            handleDeposit();
                        }}
                    >
                        <Text sFontWeight={600}>{updateSubscription}</Text>
                    </Button>
                )}

            {recurrentDonation?.length === 0 && (
                <Box>
                    {(!!newEmail || !!email) &&
                        !!selected?.value &&
                        depositButtonDisabled && (
                            <RichText
                                center
                                content={approveText}
                                mb={0.5}
                                sColor={colors.g500}
                                sFontSize={0.875}
                            />
                        )}
                    {!depositButtonDisabled && (
                        <RichText
                            center
                            content={subscribe}
                            mb={0.5}
                            sColor={colors.g500}
                            sFontSize={0.875}
                        />
                    )}
                    <ButtonsStyled
                        state={
                            (!!newEmail || !!email) &&
                            !!selected?.value &&
                            depositButtonDisabled
                                ? 'approve'
                                : !depositButtonDisabled && 'deposit'
                        }
                    >
                        <Button
                            disabled={
                                !depositButtonDisabled ||
                                !selected?.value ||
                                (!email && !newEmail)
                            }
                            icon="checkCircle"
                            isLoading={approveIsLoading}
                            onClick={handleApprove}
                        >
                            {depositButtonDisabled ? (
                                <Text sFontWeight={600}>
                                    {t('approve-transaction')}
                                </Text>
                            ) : (
                                <Text sFontWeight={600}>{t('approved')}</Text>
                            )}
                        </Button>
                        <Icon icon="chevronRight" />
                        <Button
                            disabled={
                                depositButtonDisabled ||
                                !selected?.value ||
                                (!email && !newEmail)
                            }
                            isLoading={depositIsLoading}
                            onClick={handleDeposit}
                        >
                            <Text sFontWeight={600}>{t('subscribe')}</Text>
                        </Button>
                    </ButtonsStyled>
                </Box>
            )}
        </Box>
    );
};
