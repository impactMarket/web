import {
    HeaderBarContent,
    HeaderContent,
    HeaderMainBar,
    HeaderMainBarLeftCol,
    HeaderMainBarMenu,
    HeaderMainBarMobileMenuButton,
    HeaderMainBarRightCol,
    HeaderMobileContent,
    HeaderStatusBar,
    HeaderStatusBarLeftCol,
    HeaderStatusBarRightCol,
    HeaderWrapper
} from './Header.style';
import { Icon, Logo, TextLink } from '../../theme/components';
import { MenuItem } from './MenuItem';
import { SocialMenu } from '../SocialMenu/SocialMenu';
import { String } from '../String/String';
import { WalletConnect } from './WalletConnect';
import { usePrismicData } from '../../lib/Prismic/components/PrismicDataProvider';
import { useRouter } from 'next/router';
import LanguageSelect from '../LanguageSelect/LanguageSelect';
import React, { useState } from 'react';

type MenuItemSlice = {
    primary?: {
        label?: string;
        url?: string;
    };
    items?: {
        label?: string;
        url?: string;
    }[];
    sliceType: 'item_menu' | 'item_menu_with_submenu';
};

type TopbarCtaType = {
    text: string;
    url: string;
};

export const Header = () => {
    const { config, extractFromConfig } = usePrismicData();

    const menu = config?.data?.menuItems as MenuItemSlice[];
    const topbarCta = extractFromConfig('topbarCta') as TopbarCtaType;

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

    return (
        <>
            <HeaderWrapper>
                <HeaderContent>
                    <HeaderStatusBar>
                        <HeaderBarContent>
                            <HeaderStatusBarLeftCol>
                                <TextLink bold brandPrimary href={topbarCta?.url} inlineFlex>
                                    <String id={topbarCta?.text} />
                                    <Icon icon="arrowRight" ml={0.5} sWidth={1.125} />
                                </TextLink>
                            </HeaderStatusBarLeftCol>
                            <HeaderStatusBarRightCol>
                                <WalletConnect />
                                <LanguageSelect ml={1.5} sDisplay={{ sm: 'flex', xs: 'none' }} />
                            </HeaderStatusBarRightCol>
                        </HeaderBarContent>
                    </HeaderStatusBar>
                    <HeaderMainBar>
                        <HeaderBarContent>
                            <HeaderMainBarLeftCol>
                                <a
                                    onClick={() => handleLinkClick('/')}
                                    style={{
                                        cursor: checkActiveRoute('/') ? 'default' : 'pointer',
                                        fontSize: 0,
                                        zIndex: 100
                                    }}
                                >
                                    <Logo />
                                </a>
                            </HeaderMainBarLeftCol>
                            <HeaderMainBarRightCol>
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
                            </HeaderMainBarRightCol>
                        </HeaderBarContent>
                    </HeaderMainBar>
                </HeaderContent>
                <HeaderMobileContent isActive={isMenuVisible}>
                    {/* Menu */}
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
                    <LanguageSelect mt={3.5} />
                    <SocialMenu mt="auto" pt={1.5} />
                </HeaderMobileContent>
            </HeaderWrapper>
        </>
    );
};
