import { GeneratedPropsTypes } from '../../Types';
import { colors } from '../../variables/colors';
import { ease, generateProps, transitions } from 'styled-gen';
import { fonts } from '../../variables/fonts';
import Link from 'next/link';
import React from 'react';
import styled, { css } from 'styled-components';

type TextLinkProps = React.AnchorHTMLAttributes<HTMLAnchorElement> &
    GeneratedPropsTypes & {
        href?: string;
        isActive?: boolean;
        onClick?: any;
    };

export const TextLink = styled.a<TextLinkProps>`
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

const TextLinkElement = styled.a<TextLinkProps>`
    ${transitions(['text-shadow'], 250, ease.outSine)};

    align-items: center;
    color: ${({ isActive }) => (isActive ? colors.brandPrimary : colors.textPrimary)};
    cursor: ${({ isActive }) => (isActive ? 'default !important' : 'pointer')};
    display: inline-flex;

    ${({ isActive }) =>
        !isActive &&
        css`
            &:hover {
                text-shadow: 0 0.5rem 1rem rgba(0, 0, 0, 0.24);
            }
        `}

    ${generateProps};
`;

export const TLink = (props: TextLinkProps) => {
    const { children, href: url, ...forwardProps } = props;

    const href = (url || '').replace('https:///', '/');

    const isInternal = href.startsWith('/');

    const Wrapper = isInternal ? Link : React.Fragment;
    const wrapperProps = (isInternal ? { href, passHref: true } : {}) as any;
    const linkProps = isInternal ? { href } : { href, rel: 'noopener noreferrer', target: '_blank' };

    return (
        <Wrapper {...wrapperProps}>
            <TextLinkElement {...linkProps} {...forwardProps}>
                {children}
            </TextLinkElement>
        </Wrapper>
    );
};
