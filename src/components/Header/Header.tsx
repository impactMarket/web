import {
    HeaderBarContent,
    HeaderContent,
    HeaderLanguage,
    HeaderMainBar,
    HeaderMainBarLeftCol,
    HeaderMainBarMenu,
    HeaderMainBarMobileMenuButton,
    HeaderMainBarRightCol,
    HeaderMobileContent,
    HeaderWrapper
} from './Header.style';
import { Icon, Logo } from '../../theme/components';
import { MenuItem } from './MenuItem';
import { SocialMenu } from '../SocialMenu/SocialMenu';
import { Topbar } from './Topbar';
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
        description?: any;
        label?: string;
        url?: string;
    }[];
    sliceType: 'item_menu' | 'item_menu_with_submenu';
};

export const Header = () => {
    const { config: prismicConfig } = usePrismicData();

    const menu = prismicConfig?.data?.newHeader as MenuItemSlice[];

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
                    <Topbar />
                    <HeaderMainBar>
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

                            <HeaderLanguage>
                                <LanguageSelect ml={1.5} sDisplay={{ sm: 'flex', xs: 'none' }} />
                            </HeaderLanguage>
                        </HeaderBarContent>
                    </HeaderMainBar>
                </HeaderContent>

                {/* Mobile */}
                <HeaderMobileContent isActive={isMenuVisible}>
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
