import { colors } from '../../variables/colors';
import { fonts } from '../../variables/fonts';
import { generateProps, variations } from 'styled-gen';
import { rgba } from 'polished';
import styled, { css } from 'styled-components';

const sizeVariations = {
    default: css`
        height: 42px;
        padding: 0 0.5rem;
    `,

    lg: css`
        height: 3.875rem;
        padding: 0 1rem;
    `,

    md: css`
        height: 3.25rem;
        padding: 0 1rem;
    `
};

const colorVariations = {
    default: css`
        border: 1px solid rgba(0, 0, 0, 0.1);
        background-color: ${colors.white};

        &:focus {
            border: 1px solid rgba(0, 0, 0, 0.3);
        }
    `,

    withLightBackground: css`
        border: 1px solid ${colors.backgroundLight};
        background-color: ${colors.backgroundLight};

        &:focus {
            border: 1px solid ${rgba(colors.backgroundDark, 0.05)};
        }
    `
};

export const Input = styled.input<any>`
    border-radius: 0.5rem;
    box-sizing: border-box;
    color: ${colors.textPrimary};
    font-family: ${fonts.families.inter};
    font-size: 1rem;
    outline: 0;
    width: 100%;

    ::placeholder,
    ::-webkit-input-placeholder {
        color: ${colors.textSecondary};
    }

    ${variations(sizeVariations)}
    ${variations(colorVariations)}
    ${generateProps}
`;
