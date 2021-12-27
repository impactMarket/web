import { GeneratedPropsTypes } from '../../Types';
import { colors } from '../../variables/colors';
import { ease, generateProps, transitions } from 'styled-gen';
import { fonts } from '../../variables/fonts';
import styled, { css } from 'styled-components';

type TextLinkProps = {
    isActive?: boolean;
    onClick?: any;
};

export const TextLink = styled.a<TextLinkProps & GeneratedPropsTypes>`
    ${transitions(['text-shadow'], 250, ease.outSine)};

    align-items: center;
    color: ${({ isActive }) => (isActive ? colors.brandPrimary : colors.textPrimary)};
    cursor: ${({ isActive }) => (isActive ? 'default !important' : 'pointer')};
    display: inline-flex;
    font-size: 0.9375rem;
    font-weight: ${fonts.weights.medium};

    ${({ isActive }) =>
        !isActive &&
        css`
            &:hover {
                text-shadow: 0 0.5rem 1rem rgba(0, 0, 0, 0.24);
            }
        `}

    ${generateProps};
`;
