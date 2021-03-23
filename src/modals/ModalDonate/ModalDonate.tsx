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
    const [isSelected, setIsSelected] = useState(currencies[0]);

    const getSelectedCurrencyAddress = () =>
        config?.wallets?.find(wallet => isSelected === wallet?.code)?.address || '';

    const getCurrencyData = (code: any, key: 'address' | 'code' | 'label') => {
        const walletObject = config?.wallets?.find(wallet => code === wallet?.code) || {};

        return walletObject[key] || '';
    };

    const handleChipClick = (code: any) => {
        if (code === isSelected) {
            return;
        }

        setIsSelected(code);
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
                                isActive={isSelected === code}
                                key={code}
                                onClick={() => handleChipClick(code)}
                            >
                                {getCurrencyData(code, 'label')}
                                <Currency currency={code} ml={0.5} />
                            </Chip>
                        ))}
                    </ItemsRow>
                </ModalChipsWrapper>
                <ModalRow style={{ marginTop: 16 }}>
                    <ModalCol>
                        <Text small>
                            {scanText.replace('{{ currency }}', isSelected ? isSelected.toUpperCase() : '')}
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
                            {getSelectedCurrencyAddress()}
                        </Text>
                        <ModalCopyLink style={{ marginTop: 16 }}>
                            <CopyToClipboard text={getSelectedCurrencyAddress()}>
                                <Text bold primary>
                                    {getString('copyAddress')}
                                </Text>
                            </CopyToClipboard>
                        </ModalCopyLink>
                    </ModalCol>
                    <ModalCol>
                        <QrCode address={getSelectedCurrencyAddress()} />
                    </ModalCol>
                </ModalRow>
            </ModalWrapper>
            <ModalFooter>
                <Text extrabold manrope small>
                    {getString('subscribingNote')}
                </Text>
                <Subscribe mt={0.5} />
            </ModalFooter>
        </>
    );
};

export const ModalDonate = withModal(Modal);
