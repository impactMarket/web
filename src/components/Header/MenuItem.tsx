import { Icon, Text, TextLink } from '../../theme/components';
import { String } from '../String/String';
import { colors } from '../../theme';
import { ease, mq, transitions } from 'styled-gen';
import { useClickOutside } from '../../hooks/useClickOutside';
import { useRouter } from 'next/router';
import React, { useRef, useState } from 'react';
import styled, { css } from 'styled-components';

type MenuItemType = {
    labelKey: string;
    to?: string;
};

type MenuItemProps = MenuItemType & {
    isMenuVisible: boolean;
    setIsMenuVisible: Function;
    submenu?: MenuItemType[];
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

    ${mq.tablet(css`
        ${transitions(['background-color'], 250, ease.outSine)};

        padding: 0.5rem;
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

export const MenuItem = (props: MenuItemProps) => {
    const { isMenuVisible, labelKey, setIsMenuVisible, submenu, to } = props;
    const [submenuActive, setSubmenuActive] = useState(false);
    const { asPath, push } = useRouter();
    const submenuRef = useRef<HTMLDivElement>();

    const checkRoute = (route: string | undefined) =>
        typeof route === 'string' ? asPath.split('?')[0] === route : false;

    const checkActiveRoute = (to: any | any[]) => {
        if (Array.isArray(to)) {
            return to.reduce((result, item) => result || checkRoute(item), false);
        }

        return checkRoute(to);
    };

    const handleLinkClick = (to: any | any[]) => {
        if (Array.isArray(to)) {
            return handleSubmenuToggle();
        }

        if (to.startsWith('http') || to.startsWith('mailto:') || to.startsWith('tel:')) {
            setSubmenuActive(false);

            if (isMenuVisible) {
                setIsMenuVisible(false);
            }

            return window.open(to, '_blank');
        }

        const isSameRoute = checkActiveRoute(to);

        if (isSameRoute) {
            return;
        }

        push(to);

        if (isMenuVisible) {
            setIsMenuVisible(false);
        }

        setSubmenuActive(false);
    };

    const handleSubmenuToggle = () => {
        return setSubmenuActive(!submenuActive);
    };

    const handleClickOutside = () => {
        if (!submenuActive) {
            return;
        }

        setSubmenuActive(false);
    };

    useClickOutside(submenuRef?.current, handleClickOutside);

    return (
        <MenuItemWrapper>
            <TextLink
                bold
                isActive={checkActiveRoute(submenu || to)}
                manrope
                onClick={() => handleLinkClick(submenu || to)}
            >
                <String id={labelKey} />
                {submenu?.length && <Icon brandSecondary icon="caret" ml={0.5} sHeight={0.75} sWidth={0.75} />}
            </TextLink>
            {submenu?.length && (
                <SubmenuWrapper elHeight={submenuRef?.current?.clientHeight || 0} isVisible={submenuActive}>
                    <SubmenuContent ref={submenuRef}>
                        {submenu.map((item: MenuItemType, index) => (
                            <SubmenuItem
                                isActive={checkActiveRoute(item?.to)}
                                key={index}
                                onClick={() => handleLinkClick(item?.to)}
                            >
                                <Text sub>
                                    <String id={item.labelKey} />
                                </Text>
                            </SubmenuItem>
                        ))}
                    </SubmenuContent>
                </SubmenuWrapper>
            )}
        </MenuItemWrapper>
    );
};
