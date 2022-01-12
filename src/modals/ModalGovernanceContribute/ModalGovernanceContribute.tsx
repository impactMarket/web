import { Button, Div, ItemsRow, RichContentFormat, Text } from '../../theme/components';
import { ContributeAmountInput, StepsProgress, String } from '../../components';
import { ModalWrapper } from './ModalGovernanceContribute.style';
import { WrongNetwork } from '../../components/WrongNetwork/WrongNetwork';
import { currencyValue } from '../../helpers/currencyValue';
import { modal } from 'react-modal-handler';
import { toast } from '../../components/Toaster/Toaster';
import { useDonationMiner } from '@impact-market/utils';
import { useTranslation } from '../../components/TranslationProvider/TranslationProvider';
import { useWallet } from '../../hooks/useWallet';
import { withModal } from '../../HOC';
import BigNumber from 'bignumber.js';
import React, { useCallback, useEffect, useState } from 'react';

const Modal = (props: any) => {
    const { controller, onSuccess } = props;
    const { address, connect, wrongNetwork } = useWallet();
    const [approvedAmount, setApprovedAmount] = useState(0);
    const [activeStep, setActiveStep] = useState(0);
    const [values, setValues] = useState({ amount: 0, balance: 0 });
    const [isLoading, setIsLoading] = useState(false);
    const [isLoadingBalance, setisLoadingBalance] = useState(true);
    const [contributionDone, setContributionDone] = useState(false);
    const { approve, donateToTreasury } = useDonationMiner();
    const { t } = useTranslation();

    const handleAmountChange = useCallback(
        (amount, balance) => {
            if (amount > approvedAmount && activeStep) {
                setActiveStep(0);
            }

            setValues({ amount, balance });
        },
        [approvedAmount, activeStep]
    );

    const handleApprove = useCallback(async () => {
        const { amount, balance } = values;

        if (isLoading || +amount > +balance) {
            return;
        }

        setIsLoading(true);

        try {
            BigNumber.config({ EXPONENTIAL_AT: 29 });
            const response = await approve(amount);

            setIsLoading(false);

            if (!response?.status) {
                return toast.error(t('toast.approvingError'));
            }

            setActiveStep(1);
            setApprovedAmount(amount);
        } catch (error) {
            setIsLoading(false);

            console.log(error);
            toast.error(t('toast.approvingError'));
        }
    }, [values, isLoading]);

    const handleContribute = useCallback(async () => {
        const { amount, balance } = values;

        if (isLoading || amount > balance) {
            return;
        }

        if (amount > approvedAmount) {
            setActiveStep(0);

            if (typeof onSuccess === 'function') {
                await onSuccess();
            }

            return setApprovedAmount(0);
        }

        setIsLoading(true);

        try {
            BigNumber.config({ EXPONENTIAL_AT: 29 });
            const response = await donateToTreasury(amount);

            setIsLoading(false);

            if (!response?.status) {
                return toast.error(t('toast.contributeError'));
            }

            setContributionDone(true);
            setApprovedAmount(0);
            controller?.onClose();
            toast.success(t('toast.contributeSuccess'));

            if (typeof onSuccess === 'function') {
                await onSuccess();
            }
        } catch (error) {
            setIsLoading(false);
            toast.error(t('toast.contributeError'));
        }
    }, [approvedAmount, values, isLoading]);

    const handleConnect = async () => {
        modal.close();

        const cb = () => new Promise(resolve => setTimeout(resolve, 500));

        await connect(cb);

        modal.open('governanceContribute', { onSuccess });
    };

    useEffect(() => {
        if (address || !wrongNetwork) {
            setisLoadingBalance(true);

            setTimeout(() => setisLoadingBalance(false), 500);
        }
    }, [address, wrongNetwork]);

    if (!address) {
        return (
            <ModalWrapper>
                <RichContentFormat>
                    <Text center small>
                        <String id="connectToYourWalletToContribute" />
                    </Text>
                </RichContentFormat>
                <Button fluid mt={1.5} onClick={handleConnect}>
                    <Text medium sub>
                        <String id="connectToWallet" />
                    </Text>
                </Button>
            </ModalWrapper>
        );
    }

    if (address && wrongNetwork) {
        return (
            <ModalWrapper>
                <WrongNetwork />
            </ModalWrapper>
        );
    }

    return (
        <ModalWrapper>
            <RichContentFormat>
                <Text brandSecondary sub>
                    <String id="donationMinerModalText" />
                </Text>
            </RichContentFormat>
            <Div column mt={1} sWidth="100%">
                <ContributeAmountInput isLoading={isLoadingBalance} onChange={handleAmountChange} />
                <StepsProgress activeStep={activeStep} mt={1.5} steps={['approve', 'contribute']} />
                <ItemsRow distribute="tablet" mt={1}>
                    <Button
                        disabled={
                            !(values.amount > 0) ||
                            activeStep !== 0 ||
                            values?.amount >= +currencyValue(values.balance, { isToken: true })
                        }
                        isLoading={isLoading && activeStep === 0}
                        large
                        onClick={handleApprove}
                        successBkg={activeStep !== 0}
                    >
                        <String id="approveCusd" />
                    </Button>
                    <Button
                        disabled={activeStep !== 1 && !contributionDone}
                        isLoading={isLoading && activeStep === 1}
                        large
                        mt={{ sm: 0, xs: 1 }}
                        onClick={handleContribute}
                        successBkg
                    >
                        <String id="contribute" />
                    </Button>
                </ItemsRow>
            </Div>
            <RichContentFormat brandSecondary mt={1}>
                <Text center small>
                    {(isLoading || activeStep !== 0) && (
                        <String
                            id="operationDelayNote"
                            variables={{ url: 'https://docs.impactmarket.com/general/claim-usdpact-troubleshooting' }}
                        />
                    )}
                    {!isLoading && activeStep === 0 && <String id="celoNetworkFees" />}
                </Text>
            </RichContentFormat>
        </ModalWrapper>
    );
};

export const ModalGovernanceContribute = withModal(Modal, {
    headingKey: 'contribute',
    size: 450,
    withCloseButton: true
});
