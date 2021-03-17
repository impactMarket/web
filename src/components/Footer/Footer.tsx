import { Button, Col, Currency, Div, Grid, Row, Text, TextLink } from '../../theme/components';
import { FooterLogo, FooterWrapper } from './Footer.style';
import { SocialMenu } from '../SocialMenu/SocialMenu';
import { modal } from 'react-modal-handler';
import { useData } from '../DataProvider/DataProvider';
import { useRouter } from 'next/router';
import Link from 'next/link';
import React, { useCallback } from 'react';

const currencies = ['btc', 'eth', 'celo'] as const;

export const Footer = () => {
    const { config, getString } = useData();
    const { asPath } = useRouter();

    const donationFootnote = config?.footer?.footnote;
    const menu = config?.footer?.menu;

    const checkActiveRoute = (route: string | undefined) => route === asPath;

    const handleDonateClick = useCallback(() => {
        modal.open('donate', { heading: getString('donate'), withCloseButton: true });
    }, []);

    return (
        <FooterWrapper>
            <Grid>
                <Row>
                    <Col xs={12}>
                        <Link href="/">
                            <a className={checkActiveRoute('/') ? 'is-disabled' : ''}>
                                <FooterLogo />
                            </a>
                        </Link>
                    </Col>
                </Row>
                <Row mt={{ md: 1.5, xs: 2 }}>
                    <Col xs={12}>
                        <Div>
                            <Div>
                                {menu &&
                                    menu.map((item, index) => (
                                        <Link href={item?.to || ''} key={index}>
                                            <TextLink isActive={checkActiveRoute(item?.to)}>{item?.label}</TextLink>
                                        </Link>
                                    ))}
                            </Div>
                            <Div ml="auto" sDisplay={{ lg: 'flex', xs: 'none' }}>
                                <SocialMenu ml="auto" />
                            </Div>
                        </Div>
                    </Col>
                </Row>
                <Row mt={{ lg: 2, xs: 4 }}>
                    <Col xs={12}>
                        <Div sAlignItems="center" sFlexDirection={{ sm: 'row', xs: 'column' }}>
                            <Div sWidth={{ sm: 'unset', xs: '100%' }}>
                                <Button fluid large lined onClick={handleDonateClick} pl={1.375} pr={1.375}>
                                    {getString('donate')}
                                    {currencies.map((currency: typeof currencies[number], index: number) => (
                                        <Currency currency={currency} key={currency} ml={index ? 0.5 : 1} />
                                    ))}
                                </Button>
                            </Div>
                            <Text
                                ml={{ sm: 2, xs: 0 }}
                                mt={{ sm: 0, xs: 1 }}
                                sMaxWidth={{ lg: 30 }}
                                small
                                textSecondary
                            >
                                {donationFootnote}
                            </Text>
                        </Div>
                    </Col>
                </Row>
                <Row mt={4.625} sDisplay={{ lg: 'none' }}>
                    <Col center xs={12}>
                        <Div inlineBlock>
                            <SocialMenu />
                        </Div>
                    </Col>
                </Row>
            </Grid>
        </FooterWrapper>
    );
};
