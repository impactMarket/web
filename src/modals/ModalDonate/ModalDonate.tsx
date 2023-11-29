import { BaseModal, ModalController } from '../BaseModal/BaseModal';
import { NewChip, RichContentFormat, Text } from '../../theme/components';
import { String } from '../../components';
import { WrongNetwork } from '../../components/WrongNetwork/WrongNetwork';
import { modal } from 'react-modal-handler';
import { usePrismicData } from '../../lib/Prismic/components/PrismicDataProvider';
import { useWallet } from '../../hooks/useWallet';
import React, { useEffect, useState } from 'react';
import RichText from '../../lib/Prismic/components/RichText';
import { Box, Button } from '@impact-market/ui';
import { DonateOnce } from './DonateOnce';
import { DonateRecurrent } from './DonateRecurrent';
import config from '../../../config';
import { getCookie } from 'cookies-next';
import { Thanks } from './Thanks';
import router from 'next/router';
import { ModalWrapper, AlertStyled, ButtonsWrapper } from './ModalDonate.style';
import { useTranslation } from 'src/components/TranslationProvider/TranslationProvider';
import useFilters from 'src/hooks/useFilters';

type ModalProps = {
    controller: ModalController;
    onSuccess?: Function;
};

export const ModalDonate = (props: ModalProps) => {
    const { controller, onSuccess } = props;
    const { t } = useTranslation();
    const { address, connect, wrongNetwork } = useWallet();
    const { extractFromModals } = usePrismicData();
    const [recurrentDonation, setRecurrentDonation] = useState() as any;
    const [refresh, setRefresh] = useState(false) as any;
    const { clear } = useFilters();

    // Type -> 0: Modal default page; 1: Donate once; 2: Recurring Donation; 3: Thank you
    const [donationType, setDonationType] = useState(0);
    const [donateValue, setDonateValue] = useState({
        type: 0,
        value: 0
    });

    const translations = extractFromModals('donateModal') as any;

    const {
        heading,
        description,
        recurringDonations,
        donateOnceHeading,
        footerText,
        subscribedAlert,
        connectWallet
    } = translations;

    const handleConnect = async () => {
        modal.close();
        clear('modal');

        await connect();

        modal.open('donate', { onSuccess });
    };

    if (!address) {
        return (
            <BaseModal controller={controller} heading={heading} size={500}>
                <ModalWrapper>
                    <RichContentFormat>
                        <RichText center content={connectWallet} small />
                    </RichContentFormat>
                    <Button fluid mt={1.5} onClick={handleConnect}>
                        <Text sFontWeight={500} sub>
                            <String id="connectToWallet" />
                        </Text>
                    </Button>
                </ModalWrapper>
            </BaseModal>
        );
    }

    if (address && wrongNetwork) {
        return (
            <BaseModal controller={controller} heading={heading} size={500}>
                <ModalWrapper>
                    <WrongNetwork />
                </ModalWrapper>
            </BaseModal>
        );
    }

    const getDonation = async () => {
        try {
            const res = await fetch(`${config.baseApiUrl}/lazy-agenda`, {
                headers: {
                    Accept: 'application/json',
                    Authorization: `Bearer ${getCookie('AUTH_TOKEN')}`,
                    'Content-Type': 'application/json'
                },
                method: 'GET'
            });

            const response = await res.json();

            setRecurrentDonation(response?.data);
        } catch (error) {
            console.log('User Data Error: ', error);

            return false;
        }
    };

    useEffect(() => {
        getDonation();
    }, [refresh]);

    const handleBackButton = () => {
        setDonationType(0);
    };

    return (
        <BaseModal
            controller={controller}
            icon="heart"
            withBackButton={donationType !== 0 && donationType !== 3}
            handleBackButton={handleBackButton}
            size={500}
        >
            <ModalWrapper>
                {donationType === 0 && (
                    <>
                        {recurrentDonation?.length !== 0 &&
                            recurrentDonation && (
                                <AlertStyled
                                    icon="infoCircle"
                                    title={t(subscribedAlert[0]?.text, {
                                        value: `$${
                                            recurrentDonation[0]?.details
                                                ?.amount
                                        }${`/${t('month')}`}`
                                    })}
                                    mb={1}
                                />
                            )}
                        <RichText
                            content={heading}
                            sFontSize="1.125rem"
                            sFontWeight={500}
                        />
                        <RichText content={description} g500 mt={0.5} small />
                        <ButtonsWrapper mt={2} mb={2}>
                            <Button
                                gray
                                icon="arrowRight"
                                reverse
                                left
                                onClick={() => setDonationType(1)}
                            >
                                {donateOnceHeading}
                            </Button>
                            <Button
                                gray
                                icon="arrowRight"
                                reverse
                                left
                                onClick={() => setDonationType(2)}
                            >
                                {recurringDonations}
                            </Button>
                        </ButtonsWrapper>
                        <Box
                            flex
                            style={{
                                justifyContent: 'center',
                                alignItems: 'center',
                                gap: '0.5rem'
                            }}
                            onClick={() => {
                                router.push('/crypto-hub#deposit-donate');
                                controller?.onClose();
                            }}
                        >
                            <NewChip>
                                <String id="new" />
                            </NewChip>
                            <RichText
                                content={footerText}
                                p600
                                small
                                // @ts-ignore
                                style={{
                                    cursor: 'pointer'
                                }}
                            />
                        </Box>
                    </>
                )}
                {donationType === 1 && (
                    <DonateOnce
                        setDonationType={setDonationType}
                        setDonateValue={setDonateValue}
                    />
                )}
                {donationType === 2 && (
                    <DonateRecurrent
                        recurrentDonation={recurrentDonation}
                        setRefresh={setRefresh}
                        refresh={refresh}
                        setDonationType={setDonationType}
                        setDonateValue={setDonateValue}
                    />
                )}
                {donationType === 3 && (
                    <Thanks
                        setDonationType={setDonationType}
                        donateValue={donateValue}
                        setDonateValue={setDonateValue}
                    />
                )}
            </ModalWrapper>
        </BaseModal>
    );
};
