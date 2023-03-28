import { Icon } from '@impact-market/ui';
import { NewChip, Text, TextLink } from '../../theme/components';
import { String } from '../../components';
import { colors } from '../../theme';
import { ease, mq, transitions } from 'styled-gen';
import { useClickOutside } from '../../hooks/useClickOutside';
import { useRouter } from 'next/router';
import Link from 'next/link';
import React, { useRef, useState } from 'react';
import styled, { css } from 'styled-components';

type MenuItemType = {
    description?: any;
    icon?: any;
    label?: string;
    new?: boolean;
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
    flex-direction: column;
    position: relative;

    & + & {
        margin-top: 1rem;
    }

    ${mq.tablet(css`
        flex-direction: row;
        justify-content: center;

        & + & {
            margin-top: 0;
        }
    `)}
`;

const SubmenuItem = styled.a<any>`
    align-items: flex-start;
    display: flex;
    gap: 1rem;
    width: 100%;

    ${mq.phone(css`
        padding: 0;

        ${({ isActive }: any) =>
            isActive &&
            css`
                color: ${colors.brandPrimary};
            `}
    `)}

    ${mq.tablet(css`
        ${transitions(['background-color'], 250, ease.outSine)};

        border-radius: 0.25rem;
        white-space: nowrap;

        & + & {
            margin-top: 0.5rem;
        }

        ${({ isActive }: any) =>
            isActive
                ? css`
                      cursor: default !important;
                  `
                : css`
                      &:hover {
                          background-color: ${colors.backgroundLight};
                      }
                  `}
    `)}
`;

const SubmenuText = styled.div`
    white-space: normal;
`;

const SubmenuTitle = styled.div`
    color: ${colors.g900};
    margin-bottom: 0.3rem;
`;

const Flex = styled.div`
    align-items: center;
    display: flex;
    flex-direction: row;
    gap: 0.5rem;
`;

const SubmenuContent = styled.div<any>`
    display: flex;
    flex-direction: column;
    gap: 1rem 1.25rem;
    padding: 1.2rem;

    a a {
        padding: 0.7rem;
    }

    ${mq.phone(css`
        margin-top: 1.3rem;
        margin-bottom: 1rem;
        gap: 0.5rem;
        padding: 0;

        a:first-child a,
        a a,
        a:last-child a {
            padding: 0;
        }
    `)}
`;

const SubmenuWrapper = styled.div<any>`
    ${transitions(['height'], 250, ease.inOutCubic)};

    height: ${({ elHeight, isVisible }) => (isVisible ? elHeight / 16 : 0)}rem;
    overflow: hidden;
    position: relative;
    width: max-content;
    max-width: 400px;

    ${mq.tablet(css`
        ${transitions(['opacity', 'transform', 'visibility'], 250, ease.inOutCubic)};

        background-color: ${colors.white};
        border-radius: 0.375rem;
        border: 1px solid ${colors.g200};
        box-shadow: 0px 12px 16px -4px rgba(16, 24, 40, 0.1), 0px 4px 6px -2px rgba(16, 24, 40, 0.05);
        height: auto;
        left: 0;
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

    ${props =>
        mq.phone(css`
            width: 100%;
            height: ${props.isVisible ? 'fit-content' : 0};
            overflow: auto;
        `)}
`;

const MobileSubmenuLinks = styled(TextLink)`
    ${mq.upTo(
        'tablet',
        css`
            background-color: ${colors.g50};
            border-radius: 1rem;
            padding: 0.75rem;
        `
    )}
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
                    href={url}
                    isActive={checkActiveRoute(url || submenu)}
                    onClick={() => handleLinkClick(url || submenu)}
                    rel={!!url && !url?.startsWith('/') && url ? 'noreferrer noopener' : undefined}
                    target={!!url && !url?.startsWith('/') && url ? '_blank' : undefined}
                >
                    {label}
                    {!!submenu?.[0]?.label && <Icon g500 icon="chevronDown" ml={0.5} size={1.3} />}
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
                                        <MobileSubmenuLinks
                                            href={item?.url}
                                            isActive={checkActiveRoute(item?.url)}
                                            onClick={() => handleLinkClick(item?.url)}
                                            rel={
                                                !!item?.url && !item?.url?.startsWith('/') && item?.url
                                                    ? 'noreferrer noopener'
                                                    : undefined
                                            }
                                            sWidth="100%"
                                            target={
                                                !!item?.url && !item?.url?.startsWith('/') && item?.url
                                                    ? '_blank'
                                                    : undefined
                                            }
                                        >
                                            <SubmenuItem>
                                                <Icon icon={item?.icon} p500 size={1.3} />
                                                <SubmenuText>
                                                    <Flex>
                                                        <SubmenuTitle>
                                                            <Text sFontWeight={500}>{item.label}</Text>
                                                        </SubmenuTitle>
                                                        {item?.new && (
                                                            <NewChip>
                                                                <String id="new" />
                                                            </NewChip>
                                                        )}
                                                    </Flex>
                                                    <Text
                                                        sColor={colors.g500}
                                                        sFontSize={0.875}
                                                        sFontWeight={400}
                                                        sLineHeight="20px"
                                                    >
                                                        {item?.description[0]?.text}
                                                    </Text>
                                                </SubmenuText>
                                            </SubmenuItem>
                                        </MobileSubmenuLinks>
                                    </LinkWrapper>
                                )
                        )}
                    </SubmenuContent>
                </SubmenuWrapper>
            )}
        </MenuItemWrapper>
    );
};
