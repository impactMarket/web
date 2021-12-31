import { Address, QrCode, String } from '../../components';
import { Chip, Currency, ItemsRow, Text, TextLink } from '../../theme/components';
import { ModalChipsWrapper, ModalCol, ModalFooter, ModalRow, ModalWrapper } from './ModalDonate.style';
import { Subscribe } from './Subscribe';
import { modal } from 'react-modal-handler';
import { useData } from '../../components/DataProvider/DataProvider';
import { useRouter } from 'next/router';
import { useTranslation } from '../../components/TranslationProvider/TranslationProvider';
import { withModal } from '../../HOC';
import React, { useState } from 'react';

export const Modal = (props: any) => {
    const { config, modals } = useData();
    const { currencies } = modals?.donate;
    const [wallet, setWallet] = useState<any>(config?.wallets?.[0]);
    const { t } = useTranslation();
    const { asPath, push } = useRouter();

    const getWallet = (code: any) => {
        const wallet = config?.wallets?.find(wallet => code === wallet?.code);

        return wallet;
    };

    const handleChipClick = (code: any) => {
        if (code === wallet?.code) {
            return;
        }

        setWallet(getWallet(code));
    };

    const handleDonationMinerClick = () =>
        props.controller.onClose(() =>
            modal.open('governanceContribute', { onSuccess: () => asPath !== '/governance' && push('/governance') })
        );

    return (
        <>
            <ModalWrapper>
                <Text small>
                    <String
                        components={{
                            OpenContributeModal: props => (
                                <TextLink brandPrimary onClick={handleDonationMinerClick}>
                                    {props?.children}
                                </TextLink>
                            )
                        }}
                        id="modal.donate.text"
                    />
                </Text>
                <ModalChipsWrapper>
                    <ItemsRow>
                        {currencies.map((code: any) => (
                            <Chip
                                as="a"
                                isActive={wallet?.code === code}
                                key={code}
                                onClick={() => handleChipClick(code)}
                            >
                                {getWallet(code)?.label}
                                <Currency currency={code} ml={0.5} />
                            </Chip>
                        ))}
                    </ItemsRow>
                </ModalChipsWrapper>
                <ModalRow style={{ marginTop: 16 }}>
                    <ModalCol>
                        <Text small>
                            <String
                                id="modal.donate.scanText"
                                variables={{ currency: t(`wallet.extendedLabel.${wallet?.code}`) }}
                            />
                        </Text>
                        <Address address={wallet?.address} mt={1} />
                    </ModalCol>
                    <ModalCol>
                        <QrCode address={wallet?.address} />
                    </ModalCol>
                </ModalRow>
            </ModalWrapper>
            <ModalFooter>
                <Text extrabold manrope small>
                    <String id="emailSubscribe.heading" />
                </Text>
                <Subscribe mt={0.5} />
            </ModalFooter>
        </>
    );
};

export const ModalDonate = withModal(Modal);
