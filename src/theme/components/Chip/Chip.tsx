import { colors } from '../../variables/colors';
import { fonts } from '../../variables/fonts';
import styled, { css } from 'styled-components';

type ChipProps = {
    isActive: boolean;
    as: string;
};

export const Chip = styled.div<ChipProps>`
    font-size: 12px;
    line-height: 1;
    align-items: center;
    background-color: ${colors.backgroundSecondary};
    border-radius: 22px;
    color: ${colors.textPrimary};
    display: inline-flex;
    font-family: ${fonts.families.inter};
    font-weight: ${fonts.weights.medium};
    height: 44px;
    justify-content: center;
    letter-spacing: 0.3px;
    padding: 0 16px;
    text-transform: uppercase;
    user-select: none;
    white-space: nowrap;

    ${({ isActive }) =>
        isActive &&
        css`
            background-color: ${colors.backgroundBlack};
            color: ${colors.white};
        `}

    ${({ as, isActive }) =>
        as === 'a' &&
        !isActive &&
        css`
            &:hover {
                box-shadow: 0 0 16px rgba(0, 0, 0, 0.08);
                cursor: pointer;
            }
        `}
`;
