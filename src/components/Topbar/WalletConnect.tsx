import { Icon, Select, Text } from '../../theme/components';
import { String } from '..';
import { colors, fonts } from '../../theme';
import { currencyValue } from '../../helpers/currencyValue';
import { ease, mq, transitions } from 'styled-gen';
import { formatAddress } from '../../helpers/formatAddress';
import { usePACTBalance } from '@impact-market/utils';
import { useTranslation } from '../TranslationProvider/TranslationProvider';
import { useWallet } from '../../hooks/useWallet';
import React, { useCallback } from 'react';
import styled, { css } from 'styled-components';

const ConnectButton = styled.button<any>`
    ${transitions(['background-color', 'box-shadow', 'color'], 250, ease.outSine)};

    background-color: ${colors.g25};
    border-radius: 8px;
    border: 0;
    cursor: pointer;
    font-weight: ${fonts.weights.medium};
    height: 2rem;
    outline: 0;

    ${mq.upTo(
        'tablet',
        css`
            height: 1.75rem;
            width: 100%;
        `
    )}

    &:hover {
        background-color: ${colors.brandPrimary};
        box-shadow: 0 0 16px rgba(0, 0, 0, 0.16);
        color: ${colors.white};
    }
`;

const WalletAddress = styled.div`
    align-items: center;
    background-color: ${colors.g500};
    border-radius: 0 8px 8px 0;
    display: flex;
    height: 100%;
    padding: 0 0 0 1rem;
`;

const WalletWrapper = styled.div<any>`
    align-items: center;
    background-color: ${colors.g25};
    border-radius: 8px;
    display: flex;
    margin: auto;
    height: 100%;

    ${mq.tablet(css`
        margin-left: 0;
    `)}
`;

const Pact = styled.div<any>`
    font-weight: 500;
    color: ${colors.g700};
`;

const PactBalance = () => {
    const pact = usePACTBalance();

    return (
        <Pact>
            <Text
                ellipsis
                fontSize={{ md: '0.875rem', xs: '0.75rem' }}
                medium
                sMaxWidth={{ sm: 12, xs: 7.5 }}
                sPadding="0 0 0 1rem"
            >
                {currencyValue(pact, { isToken: true, symbol: 'PACT' })}
            </Text>
        </Pact>
    );
};

export const WalletConnect = () => {
    const { t } = useTranslation();
    const { address, connect, disconnect, wrongNetwork } = useWallet();

    const handleOptionSelect = useCallback(async option => {
        if (option === 'disconnect') {
            await disconnect();
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
            <WalletWrapper noBalance={wrongNetwork}>
                {!wrongNetwork && <PactBalance />}
                <Select
                    anchor="right"
                    asActionList
                    ml={!wrongNetwork && 0.625}
                    noCaret
                    onChange={handleOptionSelect}
                    options={[{ label: t('disconnect'), value: 'disconnect' }]}
                    renderSelected={() => (
                        <WalletAddress>
                            <Text fontSize={{ md: '0.875rem', xs: '0.75rem' }} medium sColor="#fff">
                                {formatAddress(address, [6, 4])}
                            </Text>
                            <Icon icon="caret" ml={0.1} mr={0.1} sHeight={0.3125} sWidth={1.1875} white />
                        </WalletAddress>
                    )}
                    sHeight="100%"
                />
            </WalletWrapper>
        </>
    );
};
