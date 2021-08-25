import { Icon, Select, Text } from '../../theme/components';
import { String } from '..';
import { colors, fonts } from '../../theme';
import { currencyValue } from '../../helpers/currencyValues';
import { ease, mq, transitions } from 'styled-gen';
import { formatAddress } from '../../helpers/formatAddress';
import { useBalance } from '@impact-market/utils';
import { useTranslation } from '../TranslationProvider/TranslationProvider';
import { useWallet } from '../../hooks/useWallet';
import React, { useCallback } from 'react';
import styled, { css } from 'styled-components';

const ConnectButton = styled.button<any>`
    ${transitions(['background-color', 'box-shadow', 'color'], 250, ease.outSine)};

    background-color: ${colors.backgroundSecondary};
    border-radius: 12px;
    border: 0;
    cursor: pointer;
    font-weight: ${fonts.weights.medium};
    height: 2.375rem;
    outline: 0;

    &:hover {
        background-color: ${colors.brandPrimary};
        box-shadow: 0 0 16px rgba(0, 0, 0, 0.16);
        color: ${colors.white};
    }
`;

const WalletAddress = styled.div`
    align-items: center;
    background-color: ${colors.white};
    border-radius: 11px;
    display: flex;
    height: 100%;
    padding: 0 0 0 1rem;
`;

const WalletWrapper = styled.div`
    align-items: center;
    background-color: ${colors.backgroundSecondary};
    border-radius: 12px;
    display: flex;
    height: 2.375rem;
    margin: auto;
    padding: 1px 1px 1px 1rem;

    ${mq.tablet(css`
        margin-left: 0;
    `)}
`;

export const WalletConnect = () => {
    const { t } = useTranslation();
    const { address, connect, disconnect } = useWallet();
    const { balance } = useBalance();

    const { pact } = balance || {};

    const handleOptionSelect = useCallback(option => {
        if (option === 'disconnect') {
            disconnect();
        }
    }, []);

    if (!address) {
        return (
            <ConnectButton onClick={connect}>
                <Text pl={1} pr={1} small>
                    <String id="connectToWallet" />
                </Text>
            </ConnectButton>
        );
    }

    return (
        <>
            <WalletWrapper>
                <Text bold ellipsis manrope sMaxWidth={{ sm: 12, xs: 7.5 }} small>
                    {currencyValue(pact, { isToken: true, symbol: 'PACT' })}
                </Text>
                <Select
                    anchor="right"
                    asActionList
                    ml={0.625}
                    noCaret
                    onChange={handleOptionSelect}
                    options={[{ label: t('disconnect'), value: 'disconnect' }]}
                    renderSelected={() => (
                        <WalletAddress>
                            <Text medium small sourceCodePro>
                                {formatAddress(address, [6, 4])}
                            </Text>
                            <Icon brandSecondaryLight icon="dots" ml={1} mr={1} sHeight={0.3125} sWidth={1.1875} />
                        </WalletAddress>
                    )}
                    sHeight="100%"
                />
            </WalletWrapper>
        </>
    );
};
