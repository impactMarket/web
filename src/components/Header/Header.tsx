import { Col, Div, Grid, Icon, Logo, Row, Text, TextLink } from '../../theme/components';
import { DonateButton } from '../DonateButton/DonateButton';
import {
    HeaderContent,
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

export const Header = () => {
    const { config } = useData();
    const { asPath, push } = useRouter();
    const [isMenuVisible, setIsMenuVisible] = useState(false);
    const menu = config?.header?.menu;

    const checkActiveRoute = (route: string | undefined) => (typeof route === 'string' ? asPath === route : false);

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
