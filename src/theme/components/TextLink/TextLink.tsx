import { colors } from '../../variables/colors';
import { ease, transitions } from 'styled-gen';
import { fonts } from '../../variables/fonts';
import styled, { css } from 'styled-components';

type TextLinkProps = {
    isActive?: boolean;
};

export const TextLink = styled.a<TextLinkProps>`
    ${transitions(['text-shadow'], 250, ease.outSine)};

    color: ${({ isActive }) => (isActive ? colors.brandPrimary : colors.textPrimary)};
    cursor: ${({ isActive }) => (isActive ? 'default !important' : 'pointer')};
    display: block;
    font-size: 0.9375rem;
    font-weight: ${fonts.weights.medium};

    ${({ isActive }) =>
        !isActive &&
        css`
            &:hover {
                text-shadow: 0 0.5rem 1rem rgba(0, 0, 0, 0.24);
            }
        `}
`;
