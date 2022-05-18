import { BaseModal, ModalController } from '../BaseModal/BaseModal';
import { Button, Div, ItemsRow, RichContentFormat, Text } from '../../theme/components';
import { ContributeAmountInput, StepsProgress, String } from '../../components';
import { PrismicRichTextType } from '../../lib/Prismic/types';
import { WrongNetwork } from '../../components/WrongNetwork/WrongNetwork';
import { currencyValue } from '../../helpers/currencyValue';
import { modal } from 'react-modal-handler';
import { toast } from '../../components/Toaster/Toaster';
import { useDonationMiner } from '@impact-market/utils';
import { usePrismicData } from '../../lib/Prismic/components/PrismicDataProvider';
import { useWallet } from '../../hooks/useWallet';
import BigNumber from 'bignumber.js';
import React, { useCallback, useEffect, useState } from 'react';
import RichText from '../../lib/Prismic/components/RichText';
import styled from 'styled-components';

const ModalWrapper = styled.div`
    padding: 1rem 2rem 2rem;
`;

type ModalData = {
    heading?: string;
    introText?: PrismicRichTextType;
    lowFeesText?: PrismicRichTextType;
    noWalletConnectedText?: PrismicRichTextType;
    operationTroubleshootingText?: PrismicRichTextType;
    toastApprovingError?: PrismicRichTextType;
    toastContributeError?: PrismicRichTextType;
    toastContributeSuccess?: PrismicRichTextType;
    wrongNetworkText?: PrismicRichTextType;
};

type ModalProps = {
    controller: ModalController;
    communityAddress?: string;
    onSuccess?: Function;
};

const ModalGovernanceContributeContent = (props: ModalProps) => {
    const { controller, communityAddress, onSuccess } = props;
    const { address, connect, wrongNetwork } = useWallet();
    const { approve, donateToCommunity, donateToTreasury } = useDonationMiner();
    const { extractFromModals } = usePrismicData();

    const [approvedAmount, setApprovedAmount] = useState(0);
    const [activeStep, setActiveStep] = useState(0);
    const [values, setValues] = useState({ amount: 0, balance: 0 });
    const [isLoading, setIsLoading] = useState(false);
    const [isLoadingBalance, setIsLoadingBalance] = useState(true);
    const [contributionDone, setContributionDone] = useState(false);

    const modalData = extractFromModals('daoContributeModal') as ModalData;

    const {
        introText,
        lowFeesText,
        noWalletConnectedText,
        operationTroubleshootingText,
        toastApprovingError,
        toastContributeError,
        toastContributeSuccess
    } = modalData;

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
            const response = await approve(amount, communityAddress);

            setIsLoading(false);

            if (!response?.status) {
                return toast.error(<RichText content={toastApprovingError} />);
            }

            setActiveStep(1);
            setApprovedAmount(amount);
        } catch (error) {
            setIsLoading(false);

            console.log(error);
            toast.error(<RichText content={toastApprovingError} />);
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
            const response = !!communityAddress
                ? await donateToCommunity(communityAddress, amount)
                : await donateToTreasury(amount);

            setIsLoading(false);

            if (!response?.status) {
                return toast.error(<RichText content={toastContributeError} />);
            }

            setContributionDone(true);
            setApprovedAmount(0);
            controller?.onClose();
            toast.success(<RichText content={toastContributeSuccess} />);

            if (typeof onSuccess === 'function') {
                await onSuccess();
            }
        } catch (error) {
            setIsLoading(false);
            toast.error(<RichText content={toastContributeError} />);
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
            setIsLoadingBalance(true);

            setTimeout(() => setIsLoadingBalance(false), 500);
        }
    }, [address, wrongNetwork]);

    if (!address) {
        return (
            <ModalWrapper>
                <RichContentFormat>
                    <RichText center content={noWalletConnectedText} small />
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
                <RichText brandSecondary content={introText} sub />
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
                <Text center div small>
                    {(isLoading || activeStep !== 0) && <RichText content={operationTroubleshootingText} />}
                    {!isLoading && activeStep === 0 && <RichText content={lowFeesText} />}
                </Text>
            </RichContentFormat>
        </ModalWrapper>
    );
};

export const ModalGovernanceContribute = (props: ModalProps) => {
    const { controller } = props;
    const { extractFromModals } = usePrismicData();

    const { heading } = extractFromModals('daoContributeModal') as ModalData;

    return (
        <BaseModal controller={controller} heading={heading} size={450}>
            <ModalGovernanceContributeContent {...props} />
        </BaseModal>
    );
};
