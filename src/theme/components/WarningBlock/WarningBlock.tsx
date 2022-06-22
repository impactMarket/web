import { BoolProps, GeneratedPropsTypes } from '../../Types';
import { colors } from '../../variables/colors';
import { generateProps, variations } from 'styled-gen';
import styled, { css } from 'styled-components';

const colorVariations = {
    default: css`
        background-color: ${colors.backgroundLight};
    `,

    yellowLight: css`
        background-color: ${colors.lightYellow};
    `
};

type WarningBlockProps = GeneratedPropsTypes & BoolProps<typeof colorVariations>;

export const WarningBlock = styled.div<WarningBlockProps>`
    border-radius: 0.5rem;
    padding: 0.625rem 1rem;
    width: 100%;

    ${variations(colorVariations)};

    ${generateProps};
`;
