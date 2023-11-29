import React, { useLayoutEffect, useRef } from 'react';
import { Text } from '../../theme/components';
import { colors, fonts } from '../../theme';
import { mq } from 'styled-gen';
import { transitions } from 'src/theme/helpers/transitions';
import { ease } from 'src/theme/variables/ease';
import { formatAddress } from '../../helpers/formatAddress';
import { useTranslation } from '../TranslationProvider/TranslationProvider';
import { useWallet } from '../../hooks/useWallet';
import styled, { css } from 'styled-components';

const TopbarWrapper = styled.div<{ direction?: string }>`
    background-color: ${colors.g700};
    padding: 1rem 0;
    width: 100%;

    ${mq.upTo(
        'tabletLandscape',
        css`
            padding: 0.75rem 0;
            height: 56px;
        `
    )}
`;

const TopbarContent = styled.div`
    align-items: center;
    display: flex;
    gap: 2.5vw;
    justify-content: center;
    margin: auto;
    max-width: 90rem;
    padding: 0 2rem;
    height: 2rem;

    ${mq.upTo(
        'md',
        css`
            padding: 0;
        `
    )}
`;

const DisconnectButton = styled.button<any>`
    ${transitions(
        ['background-color', 'box-shadow', 'color'],
        250,
        ease.outSine
    )};

    background-color: ${colors.g25};
    border-radius: 8px;
    border: 0;
    cursor: pointer;
    font-weight: ${fonts.weights.medium};
    height: 2rem;
    outline: 0;

    &:hover {
        background-color: ${colors.brandPrimary};
        box-shadow: 0 0 16px rgba(0, 0, 0, 0.16);
        color: ${colors.white};
    }
`;

export const Topbar = ({ setTopbarHeight }: any) => {
    const { t } = useTranslation();
    const { address, disconnect } = useWallet();

    // Get topbar div height
    const topbarRef = useRef(null);

    useLayoutEffect(() => {
        setTopbarHeight(topbarRef.current.offsetHeight);
    }, []);

    return (
        <TopbarWrapper ref={topbarRef}>
            <TopbarContent>
                <Text sFontWeight={700} sColor="#fff">
                    {formatAddress(address, [6, 4])}
                </Text>
                <DisconnectButton onClick={disconnect}>
                    <Text pl={1} pr={1} small>
                        {t('disconnect-celo-wallet')}
                    </Text>
                </DisconnectButton>
            </TopbarContent>
        </TopbarWrapper>
    );
};
