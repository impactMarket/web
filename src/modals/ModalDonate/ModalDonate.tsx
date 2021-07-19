import { Chip, Currency, ItemsRow, Text } from '../../theme/components';
import { CopyToClipboard } from 'react-copy-to-clipboard';
import { ModalChipsWrapper, ModalCol, ModalCopyLink, ModalFooter, ModalRow, ModalWrapper } from './ModalDonate.style';
import { QrCode } from './QrCode';
import { String } from '../../components';
import { Subscribe } from './Subscribe';
import { useData } from '../../components/DataProvider/DataProvider';
import { useTranslation } from '../../components/TranslationProvider/TranslationProvider';
import { withModal } from '../../HOC';
import React, { useState } from 'react';

export const Modal = () => {
    const { config, modals } = useData();
    const { currencies } = modals?.donate;
    const [wallet, setWallet] = useState<any>(config?.wallets?.[0]);
    const { t } = useTranslation();

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

    return (
        <>
            <ModalWrapper>
                <Text small>
                    <String id="modal.donate.text" />
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
                        <Text
                            extrabold
                            manrope
                            small
                            style={{
                                marginTop: 10,
                                whiteSpace: 'pre-wrap',
                                wordBreak: 'break-word'
                            }}
                        >
                            {wallet?.address}
                        </Text>
                        <ModalCopyLink style={{ marginTop: 16 }}>
                            <CopyToClipboard text={wallet?.address}>
                                <Text bold brandPrimary>
                                    <String id="copyAddress" />
                                </Text>
                            </CopyToClipboard>
                        </ModalCopyLink>
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
