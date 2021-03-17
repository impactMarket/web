import { BoolProps, GeneratedPropsTypes } from '../../Types';
import { Spinner } from '../Spinner/Spinner';
import { colors } from '../../variables/colors';
import { ease, generateProps, transitions, variations } from 'styled-gen';
import React from 'react';
import styled, { css } from 'styled-components';

const colorVariations = {
    default: css`
        background-color: ${colors.primary};
        color: ${colors.white};

        &:not(:disabled) {
            &:hover {
                box-shadow: 0 0 16px rgba(0, 0, 0, 0.16);
            }
        }
    `,

    lined: css`
        background-color: transparent;
        color: ${colors.primary};
        border: 0.125rem solid ${colors.primary};

        &:not(:disabled) {
            &:hover {
                background-color: ${colors.primary};
                color: ${colors.white};
                box-shadow: 0 0 16px rgba(0, 0, 0, 0.16);
            }
        }
    `,

    white: css`
        background-color: ${colors.white};
        color: ${colors.primary};

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

    large: css`
        font-size: 18px;
        height: 62px;
        padding: 0 24px;
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
    ${transitions('all', 250, ease.outSine)};

    align-items: center;
    border-radius: 8px;
    border: 0;
    display: inline-flex;
    flex-shrink: 0;
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
                backgroundColor={!forwardProps.white ? colors.primary : colors.white}
                isLoading={isLoading}
                spinnerColor={forwardProps.white ? colors.primary : colors.white}
            />
            {children}
        </ButtonWrapper>
    );
};
