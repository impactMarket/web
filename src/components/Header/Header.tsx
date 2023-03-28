/* eslint-disable sort-keys */
import { Button, Icon, Logo, Text, TextLink } from '../../theme/components';
import {
    HeaderBarContent,
    HeaderContent,
    HeaderLanguage,
    HeaderMainBar,
    HeaderMainBarLeftCol,
    HeaderMainBarMenu,
    HeaderMainBarMobileMenuButton,
    HeaderMobileContent,
    HeaderWrapper,
    MobileContent,
    MobileMenuButtons
} from './Header.style';
import { MenuItem } from './MenuItem';
import { SocialMenu } from '../SocialMenu/SocialMenu';
import { Topbar } from '../Topbar/Topbar';
import { modal } from 'react-modal-handler';
import { usePrismicData } from '../../lib/Prismic/components/PrismicDataProvider';
import { useRouter } from 'next/router';
import { useScrollDirection } from '../../helpers/useScrollDirection';
import LanguageSelect from '../LanguageSelect/LanguageSelect';
import React, { useEffect, useLayoutEffect, useRef, useState } from 'react';

type MenuItemSlice = {
    primary?: {
        label?: string;
        url?: string;
    };
    items?: {
        description?: any;
        label?: string;
        url?: string;
    }[];
    sliceType: 'item_menu' | 'item_menu_with_submenu';
};

type MobileButtons = {
    buttonColor?: string;
    buttonLabel?: string;
    buttonUrl?: string;
};

export const Header = () => {
    const { config: prismicConfig } = usePrismicData();
    const scrollDirection = useScrollDirection();

    const menu = prismicConfig?.data?.newHeader as MenuItemSlice[];
    const mobileMenuButtons = prismicConfig?.data?.mobileMenuButtons as MobileButtons[];

    const router = useRouter();
    const { asPath, push } = router;
    const [isMenuVisible, setIsMenuVisible] = useState(false);

    const checkActiveRoute = (route: string | undefined) =>
        typeof route === 'string' ? asPath.split('?')[0] === route : false;

    const handleMenuButtonClick = () => setIsMenuVisible(!isMenuVisible);

    const handleLinkClick = (to: any) => {
        const isSameRoute = checkActiveRoute(to);

        if (isSameRoute) {
            return;
        }

        push(to);

        if (isMenuVisible) {
            setIsMenuVisible(false);
        }
    };

    // Get header div height
    const headerRef = useRef(null);
    const [headerHeight, setHeaderHeight] = useState(0);
    const [topbarHeight, setTopbarHeight] = useState(0);

    useLayoutEffect(() => {
        setHeaderHeight(headerRef.current.offsetHeight);
    }, []);

    useEffect(() => {
        if (isMenuVisible) {
            document.body.style.overflowY = 'hidden';
        } else {
            document.body.style.overflowY = 'scroll';
        }
    }, [isMenuVisible]);

    const ButtonLink = ({ buttonUrl, buttonLabel, buttonColor }: any) => {
        if (buttonUrl?.includes('modal:')) {
            const modalName = buttonUrl.substring(buttonUrl.indexOf(':') + 1);

            return (
                <TextLink
                    onClick={() => {
                        return modal.open(modalName, {
                            onSuccess: () => asPath !== '/governance' && push('/governance')
                        });
                    }}
                >
                    <Button large lined={buttonColor === 'white' && true} sHeight="3rem" sWidth="100%">
                        <Text bold>{buttonLabel}</Text>
                    </Button>
                </TextLink>
            );
        }

        return (
            <TextLink href={buttonUrl} rel="noopener noreferrer" target="_blank">
                <Button large lined={buttonColor === 'white' && true} sHeight="3rem" sWidth="100%">
                    <Text bold>{buttonLabel}</Text>
                </Button>
            </TextLink>
        );
    };

    return (
        <HeaderWrapper direction={scrollDirection ? scrollDirection : 'up'} topbarHeight={topbarHeight}>
            <HeaderContent>
                <Topbar setTopbarHeight={setTopbarHeight} />
                <HeaderMainBar ref={headerRef}>
                    <HeaderBarContent>
                        <HeaderMainBarLeftCol>
                            <a
                                onClick={() => handleLinkClick('/')}
                                style={{
                                    cursor: 'pointer',
                                    fontSize: 0,
                                    zIndex: 100
                                }}
                            >
                                <Logo />
                            </a>
                        </HeaderMainBarLeftCol>
                        <>
                            <HeaderMainBarMobileMenuButton onClick={handleMenuButtonClick}>
                                <Icon icon={isMenuVisible ? 'close' : 'menu'} sHeight={1} />
                            </HeaderMainBarMobileMenuButton>
                            <HeaderMainBarMenu>
                                {!!menu?.length &&
                                    menu.map(({ items, primary: { label, url } }, index) => (
                                        <MenuItem
                                            isMenuVisible={isMenuVisible}
                                            items={items}
                                            key={index}
                                            label={label}
                                            setIsMenuVisible={setIsMenuVisible}
                                            url={url}
                                        />
                                    ))}
                            </HeaderMainBarMenu>
                        </>
                        <HeaderLanguage>
                            <LanguageSelect sDisplay={{ sm: 'flex', xs: 'none' }} />
                        </HeaderLanguage>
                    </HeaderBarContent>
                </HeaderMainBar>

                {/* Mobile Dropdown */}
                <HeaderMobileContent
                    direction={scrollDirection ? scrollDirection : 'up'}
                    headerHeight={headerHeight}
                    isActive={isMenuVisible}
                    topbarHeight={topbarHeight}
                >
                    <MobileContent>
                        {!!mobileMenuButtons.length && (
                            <MobileMenuButtons>
                                {mobileMenuButtons?.map((button, key) => (
                                    <ButtonLink
                                        buttonColor={button.buttonColor}
                                        buttonLabel={button.buttonLabel}
                                        buttonUrl={button.buttonUrl}
                                        key={key}
                                    />
                                ))}
                            </MobileMenuButtons>
                        )}

                        <>
                            {menu?.length &&
                                menu.map(({ items, primary: { label, url } }, index) => (
                                    <MenuItem
                                        isMenuVisible={isMenuVisible}
                                        items={items}
                                        key={index}
                                        label={label}
                                        setIsMenuVisible={setIsMenuVisible}
                                        url={url}
                                    />
                                ))}
                            <LanguageSelect mt={2} />
                        </>
                    </MobileContent>
                    <SocialMenu pt={1.5} />
                </HeaderMobileContent>
            </HeaderContent>
        </HeaderWrapper>
    );
};
