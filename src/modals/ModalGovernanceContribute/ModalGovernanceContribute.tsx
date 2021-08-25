import { Button, Div, ItemsRow, RichContentFormat, Text } from '../../theme/components';
import { ContributeAmountInput, StepsProgress, String } from '../../components';
import { ModalWrapper } from './ModalGovernanceContribute.style';
import { toast } from '../../components/Toaster/Toaster';
import { useDonationMiner } from '@impact-market/utils';
import { useTranslation } from '../../components/TranslationProvider/TranslationProvider';
import { withModal } from '../../HOC';
import React, { useCallback, useState } from 'react';

const Modal = (props: any) => {
    const [approvedAmount, setApprovedAmount] = useState(0);
    const [activeStep, setActiveStep] = useState(0);
    const [values, setValues] = useState({ amount: 0, balance: 0 });
    const [isLoading, setIsLoading] = useState(false);
    const [contributionDone, setContributionDone] = useState(false);
    const { approve, donate } = useDonationMiner();
    const { t } = useTranslation();

    const handleAmountChange = useCallback((amount, balance) => {
        setValues({ amount, balance });
    }, []);

    const handleApprove = useCallback(async () => {
        const { amount, balance } = values;

        if (isLoading || +amount > +balance) {
            return;
        }

        setIsLoading(true);

        try {
            const response = await approve(amount);

            setIsLoading(false);

            if (!response?.status) {
                return toast.error(t('toast.defaultError'));
            }

            setActiveStep(1);
            setApprovedAmount(amount);
        } catch (error) {
            setIsLoading(false);
            toast.error(t('toast.defaultError'));
        }

        const response = await approve(amount);

        setIsLoading(false);

        if (response?.status) {
            setActiveStep(1);
            setApprovedAmount(amount);
        }
    }, [values, isLoading]);

    const handleContribute = useCallback(async () => {
        const { amount, balance } = values;

        if (isLoading || amount > balance) {
            return;
        }

        if (amount > approvedAmount) {
            setActiveStep(0);

            return setApprovedAmount(0);
        }

        setIsLoading(true);

        try {
            const response = await donate(amount);

            setIsLoading(false);

            if (!response?.status) {
                return toast.error(t('toast.defaultError'));
            }

            setContributionDone(true);
            setApprovedAmount(0);
            props?.controller?.onClose();
            toast.success(t('toast.donationSuccess'));
        } catch (error) {
            setIsLoading(false);
            toast.error(t('toast.defaultError'));
        }
    }, [approvedAmount, values, isLoading]);

    return (
        <ModalWrapper>
            <Text brandSecondary small>
                <String id="rewardsEstimationNote" />
            </Text>
            <Div column mt={1} sWidth="100%">
                <ContributeAmountInput onChange={handleAmountChange} />
                <StepsProgress activeStep={activeStep} mt={1.5} steps={['approve', 'contribute']} />
                <ItemsRow distribute="tablet" mt={1}>
                    <Button
                        disabled={activeStep !== 0}
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
                    >
                        <String id="contribute" />
                    </Button>
                </ItemsRow>
            </Div>
            {isLoading && (
                <RichContentFormat brandSecondary mt={1}>
                    <Text small>
                        <String id="operationDelayNote" variables={{ url: 'https://impactmarket.com' }} />
                    </Text>
                </RichContentFormat>
            )}
        </ModalWrapper>
    );
};

export const ModalGovernanceContribute = withModal(Modal, {
    headingKey: 'contribute',
    size: 450,
    withCloseButton: true
});
