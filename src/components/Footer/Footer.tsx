import { Col, Div, Grid, Row, Text, TextLink } from '../../theme/components';
import { DonateButton } from '../DonateButton/DonateButton';
import { FooterLogo, FooterWrapper } from './Footer.style';
import { SocialMenu } from '../SocialMenu/SocialMenu';
import { useData } from '../DataProvider/DataProvider';
import { useRouter } from 'next/router';
import Link from 'next/link';
import React from 'react';

export const Footer = () => {
    const { config } = useData();
    const { asPath } = useRouter();

    const donationFootnote = config?.footer?.footnote;
    const menu = config?.footer?.menu;

    const checkActiveRoute = (route: string | undefined) => route === asPath;

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
                                    menu.map((item: any, index) =>
                                        item?.to ? (
                                            <Link href={item?.to || ''} key={index}>
                                                <TextLink isActive={checkActiveRoute(item?.to)} ml={index ? 2 : 0}>
                                                    {item?.label}
                                                </TextLink>
                                            </Link>
                                        ) : (
                                            <TextLink
                                                href={item?.href}
                                                ml={index ? 2 : 0}
                                                rel="noopener noreferrer"
                                                target="_blank"
                                            >
                                                {item?.label}
                                            </TextLink>
                                        )
                                    )}
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
                                <DonateButton pl={1.375} pr={1.375} />
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
