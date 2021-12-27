import { DonateButton } from '../DonateButton/DonateButton';
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
import { Icon, Logo, Text, TextLink } from '../../theme/components';
import { MenuItem } from './MenuItem';
import { SocialMenu } from '../SocialMenu/SocialMenu';
import { String } from '../String/String';
import { WalletConnect } from './WalletConnect';
import { useData } from '../DataProvider/DataProvider';
import { useRouter } from 'next/router';
import LanguageSelect from '../LanguageSelect/LanguageSelect';
import React, { useState } from 'react';

export const Header = () => {
    const { config } = useData();
    const router = useRouter();
    const { asPath, push } = router;
    const [isMenuVisible, setIsMenuVisible] = useState(false);
    const menu = config?.header?.menu;
    const cta = config?.header?.status?.cta;

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
                                <TextLink bold brandPrimary href={cta?.to} inlineFlex>
                                    <String id={cta?.labelKey} />
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
                                    {menu?.length &&
                                        menu.map((item, index) => (
                                            <MenuItem
                                                isMenuVisible={isMenuVisible}
                                                key={index}
                                                setIsMenuVisible={setIsMenuVisible}
                                                {...item}
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
                        menu.map((item, index) => (
                            <MenuItem
                                isMenuVisible={isMenuVisible}
                                key={index}
                                setIsMenuVisible={setIsMenuVisible}
                                {...item}
                            />
                        ))}
                    <LanguageSelect mt={1.5} />
                    <DonateButton mt={2} pl={1.375} pr={1.375} />
                    <Text mt={1} small textSecondary>
                        <String id="footer.note" />
                    </Text>
                    <SocialMenu mt={1.5} />
                </HeaderMobileContent>
            </HeaderWrapper>
        </>
    );
};
