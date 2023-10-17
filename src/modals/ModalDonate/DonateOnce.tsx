import { AmountStyled, ButtonsStyled } from './ModalDonate.style';
import { Box, Button, Icon, Input, colors } from '@impact-market/ui';
import { Text } from '../../theme/components';
import { handleKnownErrors } from '../../helpers/handleKnownErrors';
import { toast } from '../../components/Toaster/Toaster';
import { useCUSDBalance, useDonationMiner } from '@impact-market/utils';
import { useTranslation } from '../../components/TranslationProvider/TranslationProvider';
import React, { useState } from 'react';
import RichText from '../../lib/Prismic/components/RichText';
import { usePrismicData } from 'src/lib/Prismic/components/PrismicDataProvider';

export const DonateOnce = ({ setDonationType, setDonateValue }: any) => {
    const { t } = useTranslation();
    const { extractFromModals } = usePrismicData();

    const translations = extractFromModals('donateModal') as any;

    const {
        donateOnceHeading,
        donateOnceDescription,
        availableToDonate,
        approve: approveText,
        donate
    } = translations;

    const cUsdBalance = useCUSDBalance();

    const [depositAmount, setDepositAmount] = useState('');
    const [approveIsLoading, setApproveIsLoading] = useState(false);
    const [depositIsLoading, setDepositIsLoading] = useState(false);
    const [depositButtonDisabled, setDepositButtonDisabled] = useState(true);
    const { approve, donateToTreasury } = useDonationMiner();

    const handleApprove = async () => {
        setApproveIsLoading(true);
        setDepositButtonDisabled(true);

        try {
            const response = await approve(depositAmount);

            setApproveIsLoading(false);

            if (!response?.status) {
                return toast.error(t('somethingWrong'));
            }

            setDepositButtonDisabled(false);

            return toast.success(donate[0]?.text);
        } catch (error) {
            console.log(error);
            handleKnownErrors(error, t('somethingWrong'));
            setApproveIsLoading(false);
        }
    };

    const handleDeposit = async () => {
        setDepositIsLoading(true);

        try {
            const response = await donateToTreasury(depositAmount);

            setDepositIsLoading(false);

            if (!response?.status) {
                return toast.error(t('somethingWrong'));
            }

            setDonateValue({
                type: 1,
                value: depositAmount
            });
            setDepositAmount('');
            setDepositButtonDisabled(true);
            setDonationType(3);
        } catch (error) {
            console.log(error);
            handleKnownErrors(error, t('somethingWrong'));
            setDepositIsLoading(false);
        }
    };

    return (
        <Box flex style={{ flexDirection: 'column', gap: '2rem' }}>
            <Box>
                <RichText
                    content={donateOnceHeading}
                    sFontSize="1.125rem"
                    medium
                />
                <RichText content={donateOnceDescription} g500 mt={0.5} small />
            </Box>
            <AmountStyled>
                <Input
                    disabled={Math.floor(cUsdBalance * 100) / 100 === 0}
                    hint={t(availableToDonate[0].text, {
                        value: Math.floor(cUsdBalance * 100) / 100 || '0'
                    })}
                    name="deposit"
                    onChange={(event: any) =>
                        setDepositAmount(event.target.value)
                    }
                    placeholder={t('enterAmount')}
                    suffix="cUSD"
                    type="number"
                    value={depositAmount || ''}
                    withError={
                        parseFloat(depositAmount) > cUsdBalance ||
                        parseFloat(depositAmount) < 0
                    }
                />
            </AmountStyled>

            <Box>
                {!!depositAmount && depositButtonDisabled && (
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
                        content={donate}
                        mb={0.5}
                        sColor={colors.g500}
                        sFontSize={0.875}
                    />
                )}
                <ButtonsStyled
                    state={
                        !!depositAmount && depositButtonDisabled
                            ? 'approve'
                            : !depositButtonDisabled && 'deposit'
                    }
                >
                    <Button
                        disabled={
                            !depositButtonDisabled ||
                            !parseFloat(depositAmount) ||
                            parseFloat(depositAmount) > cUsdBalance ||
                            parseFloat(depositAmount) < 0
                        }
                        icon="checkCircle"
                        isLoading={approveIsLoading}
                        onClick={handleApprove}
                    >
                        {depositButtonDisabled ? (
                            <Text semibold>{t('approve-transaction')}</Text>
                        ) : (
                            <Text semibold>{t('approved')}</Text>
                        )}
                    </Button>
                    <Icon icon="chevronRight" />
                    <Button
                        disabled={
                            depositButtonDisabled ||
                            !parseFloat(depositAmount) ||
                            parseFloat(depositAmount) > cUsdBalance ||
                            parseFloat(depositAmount) < 0
                        }
                        isLoading={depositIsLoading}
                        onClick={handleDeposit}
                    >
                        <Text semibold>{t('donate')}</Text>
                    </Button>
                </ButtonsStyled>
            </Box>
        </Box>
    );
};
