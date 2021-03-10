import { BoolProps, GeneratedPropsTypes } from '../../Types';
import { colors } from '../..';
import { ease, generateProps, mq, transitions, variations } from 'styled-gen';
import styled, { css } from 'styled-components';

const colorVariations = {
    default: css`
        background-color: ${colors.p06};
        color: ${colors.n01};

        &:hover {
            background-color: ${colors.n06};
        }
    `,

    white: css`
        background-color: ${colors.n01};
        color: ${colors.p06};

        &:hover {
            background-color: ${colors.p06};
            color: ${colors.n01};
        }
    `
};

type ButtonProps = BoolProps<typeof colorVariations>;

export const Button = styled.button<ButtonProps & GeneratedPropsTypes>`
    ${transitions('all', 250, ease.inOutQuart)};

    font-family: sans-serif;
    font-size: 16px;

    ${mq.tablet(css`
        font-size: 18px;

        &:hover {
            cursor: pointer;
        }
    `)}

    ${variations(colorVariations)};
    ${generateProps};
`;
