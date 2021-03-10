import { BoolProps, GeneratedPropsTypes } from '../../Types';
import { Spinner } from '../Spinner/Spinner';
import { colors } from '../../variables/colors';
import { generateProps, variations } from 'styled-gen';
import React from 'react';
import styled, { css } from 'styled-components';

const colorVariations = {
    default: css`
        background-color: ${colors.p06};
        color: ${colors.n01};

        &:not(:disabled) {
            &:hover {
                box-shadow: 0 0 16px rgba(0, 0, 0, 0.16);
            }
        }
    `,

    white: css`
        background-color: ${colors.n01};
        color: ${colors.p06};

        &:not(:disabled) {
            &:hover {
                box-shadow: 0 0 24px rgba(0, 0, 0, 0.24);
            }
        }
    `
};

const miscVariations = {
    fluid: css`
        width: 100%;
    `
};

const sizeVariations = {
    default: css`
        font-size: 18px;
        height: 44px;
        padding: 0 26px;
    `,

    small: css`
        font-size: 14px;
        height: 44px;
        padding: 0 16px;
    `,

    tight: css`
        font-size: 18px;
        height: 44px;
        padding: 0 8px;
    `
};

type ButtonBaseProps = {
    as?: any;
    children?: any | any[];
    href?: string;
    isLoading?: boolean;
};

type ButtonProps = GeneratedPropsTypes &
    ButtonBaseProps &
    ButtonColorVariations &
    ButtonMiscVariations &
    ButtonSizeVariations;

type ButtonColorVariations = BoolProps<typeof colorVariations>;
type ButtonMiscVariations = BoolProps<typeof miscVariations>;
type ButtonSizeVariations = BoolProps<typeof sizeVariations>;

const ButtonWrapper = styled.button<ButtonProps>`
    align-items: center;
    border-radius: 8px;
    border: 0;
    display: inline-flex;
    font-family: 'Inter';
    font-weight: 700;
    justify-content: center;
    outline: 0;
    overflow: hidden;
    position: relative;
    white-space: nowrap;

    &:not(:disabled) {
        &:hover {
            cursor: pointer;
        }
    }

    ${variations(colorVariations)};
    ${variations(sizeVariations)};
    ${variations(miscVariations)};

    ${generateProps}
`;

export const Button = (props: ButtonProps) => {
    const { children, href, isLoading, ...forwardProps } = props;

    return (
        <ButtonWrapper as={href ? 'a' : 'button'} disabled={isLoading} href={href} {...forwardProps}>
            <Spinner
                backgroundColor={!forwardProps.white ? colors.p06 : colors.n01}
                isLoading={isLoading}
                spinnerColor={forwardProps.white ? colors.p06 : colors.n01}
            />
            {children}
        </ButtonWrapper>
    );
};
