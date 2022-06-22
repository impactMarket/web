import { BoolProps, GeneratedPropsTypes } from '../../Types';
import { colors } from '../../variables/colors';
import { generateProps, mq, variations } from 'styled-gen';
import { rgba } from 'polished';
import styled, { css } from 'styled-components';

const borderVariations = {
    default: css`
        border: 1px solid ${colors.backgroundSecondary};
    `,

    noBorder: css`
        border: 0;
    `
};

const radiusVariations = {
    default: css`
        border-radius: 0.5rem;
    `,

    longRadius: css`
        border-radius: 1rem;
    `
};

type CardProps = GeneratedPropsTypes & BoolProps<typeof borderVariations> & BoolProps<typeof radiusVariations>;

export const Card = styled.div<CardProps>`
    background-color: ${colors.white};
    box-shadow: 0 0.125rem 0.625rem ${rgba(colors.brandSecondaryLight, 0.29)};
    display: flex;
    flex-direction: column;
    width: 100%;

    ${variations(borderVariations)};
    ${variations(radiusVariations)};

    ${generateProps};
`;

export const CardContent = styled.div<GeneratedPropsTypes>`
    display: flex;
    flex-direction: column;
    height: 100%;
    justify-content: center;
    padding: 2.5rem 2rem 2rem;

    ${mq.tablet(css`
        padding: 2rem;
    `)}

    ${generateProps};
`;

export const ArticleCard = styled.div`
    background-color: ${colors.white};
    border-radius: 0.5rem;
    box-shadow: 0 0.25rem 1.5rem ${colors.backgroundShadow};
    display: flex;
    flex-direction: column;
    height: 100%;
    padding: 2rem;
`;
