import { BoolProps, GeneratedPropsTypes } from '../../Types';
import { Spinner } from '../Spinner/Spinner';
import { colors } from '../../variables/colors';
import { darken, rgba } from 'polished';
import { ease, generateProps, transitions, variations } from 'styled-gen';
import { fonts } from '../../variables/fonts';
import Link from 'next/link';
import React from 'react';
import styled, { css } from 'styled-components';

const colorVariations = {
    default: css`
        background-color: ${colors.brandPrimary};
        color: ${colors.white};

        &:not(:disabled) {
            &:hover {
                box-shadow: 0 0 16px rgba(0, 0, 0, 0.16);
            }
        }

        &:disabled {
            background-color: ${colors.brandPrimaryDisabled};
        }
    `,

    errorBkg: css`
        background-color: ${colors.error};
        color: ${colors.white};

        &:not(:disabled) {
            &:hover {
                box-shadow: 0 0 24px rgba(0, 0, 0, 0.08);
            }
        }

        &:disabled {
            background-color: ${rgba(colors.error, 0.5)};
        }
    `,

    lined: css`
        background-color: transparent;
        color: ${colors.brandPrimary};
        border: 0.125rem solid ${colors.brandPrimary};

        &:not(:disabled) {
            &:hover {
                background-color: ${colors.brandPrimary};
                border-color: transparent;
                box-shadow: 0 0 16px rgba(0, 0, 0, 0.16);
                color: ${colors.white};
            }
        }
    `,

    linedSecondary: css`
        background-color: transparent;
        border-radius: 0.5rem;
        border: 0.0625rem solid ${colors.backgroundSecondary};
        color: ${colors.brandSecondaryLight};

        &:not(:disabled) {
            &:hover {
                background-color: ${colors.brandPrimary};
                border-color: transparent;
                box-shadow: 0 0 16px rgba(0, 0, 0, 0.16);
                color: ${colors.white};
            }
        }
    `,

    linedSecondaryDark: css`
        background-color: transparent;
        border-radius: 0.5rem;
        border: 0.0625rem solid ${colors.g300};
        color: ${colors.g700};

        > p {
            font-weight: 500;
        }

        &:not(:disabled) {
            &:hover {
                background-color: ${colors.brandPrimary};
                border-color: transparent;
                box-shadow: 0 0 16px rgba(0, 0, 0, 0.16);
                color: ${colors.white};
            }
        }
    `,

    linedSecondaryWhiteText: css`
        background-color: transparent;
        border-radius: 0.5rem;
        border: 0.0625rem solid ${colors.backgroundSecondary};
        color: ${colors.white};

        &:not(:disabled) {
            &:hover {
                background-color: ${colors.brandPrimary};
                border-color: transparent;
                box-shadow: 0 0 16px rgba(0, 0, 0, 0.16);
                color: ${colors.white};
            }
        }
    `,

    pagination: css`
        background-color: ${colors.backgroundSecondary};
        color: ${colors.textPrimary};

        &:not(:disabled) {
            &:hover {
                background-color: ${colors.brandPrimary};
                box-shadow: 0 0 16px rgba(0, 0, 0, 0.16);
                color: ${colors.white};
            }
        }
    `,

    secondaryBlue: css`
        background-color: ${colors.white};
        color: ${colors.brandPrimary};

        &:not(:disabled) {
            &:hover {
                background-color: ${darken(0.1, colors.white)};
            }
        }
    `,

    secondaryLight: css`
        background-color: ${colors.brandSecondaryLight};
        color: ${colors.white};

        &:not(:disabled) {
            &:hover {
                background-color: ${darken(0.1, colors.brandSecondaryLight)};
            }
        }
    `,

    secondaryWhite: css`
        background-color: ${colors.white};
        color: ${colors.g700};

        &:not(:disabled) {
            &:hover {
                background-color: ${darken(0.1, colors.white)};
            }
        }
    `,

    silenced: css`
        background-color: ${colors.backgroundSecondary};
        color: ${colors.brandBlack};

        &:not(:disabled) {
            &:hover {
                background-color: ${darken(0.1, colors.backgroundSecondary)};
                color: ${darken(0.5, colors.brandBlack)};
            }
        }
    `,

    successBkg: css`
        background-color: ${colors.success};
        color: ${colors.white};

        &:not(:disabled) {
            &:hover {
                box-shadow: 0 0 24px rgba(0, 0, 0, 0.08);
            }
        }

        &:disabled {
            background-color: ${rgba(colors.success, 0.5)};
        }
    `,

    whitePrimary: css`
        background-color: ${colors.white};
        color: ${colors.brandPrimary};

        &:not(:disabled) {
            &:hover {
                background-color: ${darken(0.1, colors.white)};
                box-shadow: 0 0 16px rgba(0, 0, 0, 0.16);
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
        min-height: 44px;
        padding: 8px 26px;
    `,

    large: css`
        font-size: 18px;
        line-height: 30px;
        min-height: 62px;
        padding: 16px 24px;
    `,

    pagination: css`
        font-size: 14px;
        min-height: 44px;
        padding: 4px 16px;
        min-width: 44px;
    `,

    rebranded: css`
        font-size: 16px;
        min-height: 48px;
        padding: 12px 20px;
    `,

    small: css`
        font-size: 14px;
        min-height: 44px;
        padding: 4px 16px;
    `,

    smaller: css`
        font-size: 14px;
        min-height: 36px;
        padding: 4px 24px;
    `,

    smallest: css`
        font-size: 14px;
        min-height: 24px;
        padding: 2px 10px;
    `,

    thin: css`
        border-width: 1px;
        font-size: 16;
        min-height: 44px;
        padding: 8px 26px;
    `,

    tight: css`
        font-size: 18px;
        min-height: 40px;
        padding: 2px 8px;
    `
};

type ButtonBaseProps = {
    as?: any;
    className?: string;
    children?: any | any[];
    disabled?: boolean;
    href?: string;
    onClick?: (e: Event) => void;
    isLoading?: boolean;
    title?: string;
};

export type ButtonProps = GeneratedPropsTypes &
    ButtonBaseProps &
    ButtonColorVariations &
    ButtonMiscVariations &
    ButtonSizeVariations;

type ButtonColorVariations = BoolProps<typeof colorVariations>;
type ButtonMiscVariations = BoolProps<typeof miscVariations>;
type ButtonSizeVariations = BoolProps<typeof sizeVariations>;

const ButtonWrapper = styled.button<ButtonProps>`
    ${transitions(['background-color', 'box-shadow', 'color'], 250, ease.outSine)};

    align-items: center;
    border-radius: 8px;
    border: 0;
    display: inline-flex;
    flex-shrink: 0;
    font-family: ${fonts.families.inter};
    font-weight: 700;
    justify-content: center;
    outline: 0;
    overflow: hidden;
    position: relative;

    &:not(:disabled) {
        &:hover {
            cursor: pointer;
        }
    }

    &:disabled {
        cursor: not-allowed !important;
    }

    ${variations(colorVariations)};
    ${variations(sizeVariations)};
    ${variations(miscVariations)};

    ${generateProps}
`;

export const Button = (props: ButtonProps) => {
    const { children, href: url, isLoading, ...forwardProps } = props;

    const href = url?.replace('https:///', '/');

    const isInternalLink = !!href && href.startsWith('/');

    const Wrapper = isInternalLink ? Link : React.Fragment;

    const wrapperProps = (isInternalLink ? { href, passHref: true } : {}) as any;

    return (
        <Wrapper {...wrapperProps}>
            <ButtonWrapper as={href ? 'a' : 'button'} disabled={isLoading} href={href} {...forwardProps}>
                <Spinner
                    backgroundColor={!forwardProps.white ? colors.brandPrimary : colors.white}
                    isLoading={isLoading}
                    spinnerColor={forwardProps.white ? colors.brandPrimary : colors.white}
                />
                {children}
            </ButtonWrapper>
        </Wrapper>
    );
};
