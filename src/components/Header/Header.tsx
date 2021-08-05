import { Col, Div, Grid, Icon, Logo, Row, Select, Text, TextLink } from '../../theme/components';
import { DonateButton } from '../DonateButton/DonateButton';
import {
    HeaderContent,
    HeaderLanguageWrapper,
    HeaderMenuItem,
    HeaderMenuWrapper,
    HeaderMobileMenuButton,
    HeaderMobileMenuFooter,
    HeaderWrapper
} from './Header.style';
import { SocialMenu } from '../SocialMenu/SocialMenu';
import { String } from '../String/String';
import { useData } from '../DataProvider/DataProvider';
import { useRouter } from 'next/router';
import React, { useState } from 'react';
import langConfig from '../../../lang-config';

export const Header = () => {
    const { config } = useData();
    const router = useRouter();
    const { asPath, locale, push, replace } = router;
    const [isMenuVisible, setIsMenuVisible] = useState(false);
    const menu = config?.header?.menu;

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

    const handleLanguageChange = (locale: string) => replace(asPath, undefined, { locale });

    const languageOptions = langConfig.map(({ code: value, label }) => ({ label, value }));

    return (
        <HeaderWrapper>
            <Grid>
                <Row>
                    <Col xs={12}>
                        <HeaderContent>
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
                            <HeaderMobileMenuButton onClick={handleMenuButtonClick}>
                                <Icon icon={isMenuVisible ? 'close' : 'menu'} sHeight={1} />
                            </HeaderMobileMenuButton>
                            <HeaderMenuWrapper isActive={isMenuVisible}>
                                <Div>
                                    {menu &&
                                        menu.map((item, index) => (
                                            <HeaderMenuItem key={index}>
                                                <TextLink
                                                    isActive={checkActiveRoute(item?.to)}
                                                    onClick={() => handleLinkClick(item?.to)}
                                                >
                                                    <String id={item.labelKey} />
                                                </TextLink>
                                            </HeaderMenuItem>
                                        ))}
                                </Div>
                                <HeaderLanguageWrapper>
                                    {languageOptions && (
                                        <Select
                                            anchor="right"
                                            initialSelected={locale}
                                            onChange={handleLanguageChange}
                                            options={languageOptions}
                                            renderSelected={(label: string) => (
                                                <>
                                                    <Icon icon="world" sHeight={1} sWidth={1} textSecondary />
                                                    <Text medium ml={0.5} small>
                                                        {label}
                                                    </Text>
                                                </>
                                            )}
                                        />
                                    )}
                                </HeaderLanguageWrapper>
                                <HeaderMobileMenuFooter>
                                    <Div sAlignItems="center" sFlexDirection={{ sm: 'row', xs: 'column' }}>
                                        <Div sWidth={{ sm: 'unset', xs: '100%' }}>
                                            <DonateButton pl={1.375} pr={1.375} />
                                        </Div>
                                        <Text
                                            ml={{ sm: 2, xs: 0 }}
                                            mt={{ sm: 0, xs: 1 }}
                                            sMaxWidth={{ lg: 30 }}
                                            small
                                            textSecondary
                                        >
                                            <String id="footer.note" />
                                        </Text>
                                        <Div inlineBlock>
                                            <SocialMenu mt={4} />
                                        </Div>
                                    </Div>
                                </HeaderMobileMenuFooter>
                            </HeaderMenuWrapper>
                        </HeaderContent>
                    </Col>
                </Row>
            </Grid>
        </HeaderWrapper>
    );
};
