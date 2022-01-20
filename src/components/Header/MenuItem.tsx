import { Icon, Text, TextLink } from '../../theme/components';
import { colors } from '../../theme';
import { ease, mq, transitions } from 'styled-gen';
import { useClickOutside } from '../../hooks/useClickOutside';
import { useRouter } from 'next/router';
import Link from 'next/link';
import React, { useRef, useState } from 'react';
import styled, { css } from 'styled-components';

type MenuItemType = {
    label?: string;
    url?: string;
};

type MenuItemProps = MenuItemType & {
    isMenuVisible: boolean;
    items?: MenuItemType[];
    label?: string;
    setIsMenuVisible: Function;
    url?: string;
};

const MenuItemWrapper = styled.div`
    display: flex;
    position: relative;
    flex-direction: column;

    & + & {
        margin-top: 1rem;
    }

    ${mq.tablet(css`
        flex-direction: row;
        justify-content: center;

        & + & {
            margin-left: 2rem;
            margin-top: 0;
        }
    `)}
`;

const SubmenuItem = styled.a<any>`
    display: block;

    & + & {
        margin-top: 1rem;
    }

    ${mq.phone(css`
        ${({ isActive }: any) =>
            isActive &&
            css`
                color: ${colors.brandPrimary};
            `}
    `)}

    ${mq.tablet(css`
        ${transitions(['background-color'], 250, ease.outSine)};

        border-radius: 0.25rem;
        padding: 0.5rem 0.75rem;
        white-space: nowrap;

        & + & {
            margin-top: 0.5rem;
        }

        ${({ isActive }: any) =>
            isActive
                ? css`
                      background-color: ${colors.backgroundSecondary};
                      cursor: default !important;
                  `
                : css`
                      &:hover {
                          background-color: ${colors.backgroundLight};
                      }
                  `}
    `)}
`;

const SubmenuContent = styled.div<any>`
    padding: 0.5rem 0.5rem 0.5rem 1rem;

    ${mq.tablet(css`
        padding: 0.5rem;
    `)}
`;

const SubmenuWrapper = styled.div<any>`
    ${transitions(['height'], 250, ease.inOutCubic)};

    overflow: hidden;
    position: relative;
    height: ${({ elHeight, isVisible }) => (isVisible ? elHeight / 16 : 0)}rem;

    ${mq.tablet(css`
        ${transitions(['opacity', 'transform', 'visibility'], 250, ease.inOutCubic)};

        background-color: ${colors.white};
        border-radius: 0.375rem;
        border: 1px solid ${colors.borderLight};
        height: auto;
        margin-top: 0.75rem;
        opacity: 0;
        position: absolute;
        top: calc(100% + 0.5rem);
        transform: translateY(1rem);
        visibility: hidden;

        ${({ isVisible }: any) =>
            isVisible &&
            css`
                opacity: 1;
                transform: translateY(0);
                visibility: visible;
            `}
    `)}
`;

const LinkWrapper = (props: { children: any; url?: string }) => {
    const { children, url } = props;

    if (!(!!url && url.startsWith('/'))) {
        return <>{children}</>;
    }

    return (
        <Link href={url} passHref>
            {children}
        </Link>
    );
};

export const MenuItem = (props: MenuItemProps) => {
    const { isMenuVisible, label, setIsMenuVisible, items: submenu, url } = props;
    const [submenuActive, setSubmenuActive] = useState(false);
    const { asPath } = useRouter();
    const submenuRef = useRef<HTMLDivElement>();

    if (!label) {
        return null;
    }

    const checkRoute = (route: string | undefined) =>
        typeof route === 'string' ? asPath.split('?')[0] === route : false;

    const checkActiveRoute = (url: any | any[]) => {
        if (Array.isArray(url)) {
            return url.reduce((result, item) => result || checkRoute(item), false);
        }

        return checkRoute(url);
    };

    const handleLinkClick = (url: any | any[]) => {
        if (url?.[0]?.label) {
            return setSubmenuActive(!submenuActive);
        }

        if (isMenuVisible) {
            setIsMenuVisible(false);
        }

        return setSubmenuActive(false);
    };

    const handleClickOutside = () => {
        if (!submenuActive) {
            return;
        }

        setSubmenuActive(false);
    };

    // eslint-disable-next-line react-hooks/rules-of-hooks
    useClickOutside(submenuRef?.current, handleClickOutside);

    return (
        <MenuItemWrapper>
            <LinkWrapper url={url}>
                <TextLink
                    bold
                    href={url}
                    isActive={checkActiveRoute(url || submenu)}
                    manrope
                    onClick={() => handleLinkClick(url || submenu)}
                    rel={!!url && !url?.startsWith('/') && url ? 'noreferrer noopener' : undefined}
                    target={!!url && !url?.startsWith('/') && url ? '_blank' : undefined}
                >
                    {label}
                    {!!submenu?.[0]?.label && (
                        <Icon brandSecondary icon="caret" ml={0.5} sHeight={0.75} sWidth={0.75} />
                    )}
                </TextLink>
            </LinkWrapper>
            {!!submenu?.[0]?.label && (
                <SubmenuWrapper elHeight={submenuRef?.current?.clientHeight || 0} isVisible={submenuActive}>
                    <SubmenuContent ref={submenuRef}>
                        {submenu.map(
                            (item: MenuItemType, index) =>
                                !!item?.label &&
                                !!item?.url && (
                                    <LinkWrapper key={index} url={item?.url}>
                                        <SubmenuItem
                                            isActive={checkActiveRoute(item?.url)}
                                            key={index}
                                            onClick={() => handleLinkClick(item?.url)}
                                            rel={
                                                !!item?.url && !item?.url?.startsWith('/') && item?.url
                                                    ? 'noreferrer noopener'
                                                    : undefined
                                            }
                                            target={
                                                !!item?.url && !item?.url?.startsWith('/') && item?.url
                                                    ? '_blank'
                                                    : undefined
                                            }
                                        >
                                            <Text sub>{item.label}</Text>
                                        </SubmenuItem>
                                    </LinkWrapper>
                                )
                        )}
                    </SubmenuContent>
                </SubmenuWrapper>
            )}
        </MenuItemWrapper>
    );
};
