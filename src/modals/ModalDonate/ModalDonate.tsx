import { Chip, Currency, ItemsRow, Text } from '../../theme/components';
import { CopyToClipboard } from 'react-copy-to-clipboard';
import { ModalChipsWrapper, ModalCol, ModalCopyLink, ModalFooter, ModalRow, ModalWrapper } from './ModalDonate.style';
import { QrCode } from './QrCode';
import { Subscribe } from './Subscribe';
import { useData } from '../../components/DataProvider/DataProvider';
import { withModal } from '../../HOC';
import React, { useState } from 'react';

export const Modal = () => {
    const { config, getModal, getString } = useData();
    const { currencies, scanText, text } = getModal('donate');
    const [wallet, setWallet] = useState<any>(config?.wallets?.[0]);
    const subscribeText = config?.emailSubscribe?.heading;

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
                <Text small>{text}</Text>
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
                            {scanText.replace('{{ currency }}', wallet?.extendedLabel || wallet?.code?.toUpperCase())}
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
                                    {getString('copyAddress')}
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
                    {subscribeText}
                </Text>
                <Subscribe mt={0.5} />
            </ModalFooter>
        </>
    );
};

export const ModalDonate = withModal(Modal);
