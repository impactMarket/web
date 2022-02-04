import { Address, QrCode } from '../../components';
import { BaseModal, ModalController } from '../BaseModal/BaseModal';
import { Chip, Currency, ItemsRow, Text, TextLink } from '../../theme/components';
import { ModalChipsWrapper, ModalCol, ModalFooter, ModalRow, ModalWrapper } from './ModalDonate.style';
import { PrismicRichTextType } from '../../lib/Prismic/types';
import { Subscribe } from './Subscribe';
import { modal } from 'react-modal-handler';
import { usePrismicData } from '../../lib/Prismic/components/PrismicDataProvider';
import { useRouter } from 'next/router';
import React, { useState } from 'react';
import RichText from '../../lib/Prismic/components/RichText';
import config from '../../../config';

type ModalContentProps = {
    copyNote: PrismicRichTextType;
    currencies: {
        code?: string;
        label?: string;
        extendedLabel?: string;
    }[];
    heading: string;
    subscribeHeading: string;
    text: PrismicRichTextType;
};

type ModalProps = {
    controller: ModalController;
};

type WalletProps = {
    address?: string;
    code?: string;
    extendedLabel?: string;
    label?: string;
};

const { wallets } = config as any;

export const ModalDonate = (props: ModalProps) => {
    const { controller } = props;
    const { extractFromModals } = usePrismicData();
    const { asPath, push } = useRouter();

    const modalContent = extractFromModals('contributeModal') as ModalContentProps;
    const { currencies, copyNote, heading, subscribeHeading, text } = modalContent;

    const [wallet, setWallet] = useState<WalletProps>({
        address: wallets.btc,
        ...currencies.find(({ code }) => code === 'btc')
    });

    const handleChipClick = (code: string) => {
        if (code === wallet?.code) {
            return;
        }

        const selectedWallet = {
            address: wallets?.[code],
            ...currencies.find(({ code: currencyCode }) => code === currencyCode)
        };

        if (!selectedWallet?.address) {
            return;
        }

        setWallet(selectedWallet);
    };

    const handleDonationMinerClick = () =>
        controller.onClose(() =>
            modal.open('governanceContribute', { onSuccess: () => asPath !== '/governance' && push('/governance') })
        );

    return (
        <BaseModal controller={controller} heading={heading}>
            <ModalWrapper>
                <RichText
                    components={{
                        OpenContributeModal: (props: any) => (
                            <TextLink brandPrimary onClick={handleDonationMinerClick}>
                                {props?.children}
                            </TextLink>
                        )
                    }}
                    content={text}
                    small
                />
                <ModalChipsWrapper>
                    <ItemsRow>
                        {currencies.map(({ code, label }: WalletProps) => (
                            <Chip
                                as="a"
                                isActive={wallet?.code === code}
                                key={code}
                                onClick={() => handleChipClick(code)}
                            >
                                {label}
                                <Currency currency={code} ml={0.5} />
                            </Chip>
                        ))}
                    </ItemsRow>
                </ModalChipsWrapper>
                <ModalRow style={{ marginTop: 16 }}>
                    <ModalCol>
                        <RichText content={copyNote} small variables={{ currency: wallet?.extendedLabel }} />
                        <Address address={wallet?.address} mt={1} />
                    </ModalCol>
                    <ModalCol>
                        <QrCode address={wallet?.address} />
                    </ModalCol>
                </ModalRow>
            </ModalWrapper>
            <ModalFooter>
                <Text extrabold manrope small>
                    {subscribeHeading}
                </Text>
                <Subscribe mt={0.5} />
            </ModalFooter>
        </BaseModal>
    );
};
