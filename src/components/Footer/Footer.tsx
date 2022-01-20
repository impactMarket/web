import { Col, Div, Grid, Row, Text, TextLink } from '../../theme/components';
import { DonateButton } from '../DonateButton/DonateButton';
import { FooterLogo, FooterWrapper } from './Footer.style';
import { SocialMenu } from '../SocialMenu/SocialMenu';
import { String } from '../String/String';
import { usePrismicData } from '../../lib/Prismic/components/PrismicDataProvider';
import { useRouter } from 'next/router';
import Link from 'next/link';
import React from 'react';

type FooterProps = {
    showDonateButton?: boolean;
    whiteBackground?: boolean;
};

type FooterMenuItemType = {
    label?: string;
    url?: string;
};

type FooterFromPrismicType = {
    menu: FooterMenuItemType[];
};

export const Footer = (props: FooterProps) => {
    const { extractFromConfig } = usePrismicData();
    const { asPath } = useRouter();
    const { showDonateButton = false, whiteBackground = false } = props;

    const footer = extractFromConfig('footer') as FooterFromPrismicType;

    const checkActiveRoute = (route: string | undefined) => route === asPath;

    return (
        <FooterWrapper whiteBackground={whiteBackground} withDonateButton={showDonateButton}>
            <Grid>
                <Row>
                    <Col xs={12}>
                        <Link href="/">
                            <a
                                className={checkActiveRoute('/') ? 'is-disabled' : ''}
                                style={{
                                    cursor: checkActiveRoute('/') ? 'default' : 'pointer',
                                    fontSize: 0
                                }}
                            >
                                <FooterLogo />
                            </a>
                        </Link>
                    </Col>
                </Row>
                <Row mt={{ md: 1.5, xs: 2 }}>
                    <Col lg={12} xs={false}>
                        <Div>
                            <Div>
                                {footer?.menu?.length &&
                                    footer.menu.map((item: FooterMenuItemType, index) =>
                                        item?.url ? (
                                            <Link href={item?.url || ''} key={index} passHref>
                                                <TextLink isActive={checkActiveRoute(item?.url)} ml={index ? 2 : 0}>
                                                    {item?.label}
                                                </TextLink>
                                            </Link>
                                        ) : (
                                            <TextLink
                                                href={item?.url}
                                                key={index}
                                                ml={index ? 2 : 0}
                                                rel="noopener noreferrer"
                                                target="_blank"
                                            >
                                                {item?.label}
                                            </TextLink>
                                        )
                                    )}
                            </Div>
                            <Div ml="auto">
                                <SocialMenu ml="auto" />
                            </Div>
                        </Div>
                    </Col>
                    {footer?.menu?.length &&
                        footer.menu.map((item: FooterMenuItemType, index) => (
                            <Col
                                key={index}
                                lg={false}
                                mt={{ sm: index > 3 ? 1 : 0, xs: index > 1 ? 1 : 0 }}
                                sm={3}
                                xs={6}
                            >
                                {item?.url ? (
                                    <Link href={item?.url || ''} key={index} passHref>
                                        <TextLink isActive={checkActiveRoute(item?.url)}>{item?.label}</TextLink>
                                    </Link>
                                ) : (
                                    <TextLink href={item?.url} key={index} rel="noopener noreferrer" target="_blank">
                                        {item?.label}
                                    </TextLink>
                                )}
                            </Col>
                        ))}
                </Row>
                {showDonateButton && (
                    <Row mt={{ lg: 2, xs: 4 }}>
                        <Col xs={12}>
                            <Div sAlignItems="center" sFlexDirection={{ sm: 'row', xs: 'column' }}>
                                <Div sWidth={{ lg: 'unset', xs: '100%' }}>
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
                            </Div>
                        </Col>
                    </Row>
                )}
                <Row>
                    <Col center lg={false} mt={4.625} xs={12}>
                        <Div inlineBlock>
                            <SocialMenu />
                        </Div>
                    </Col>
                </Row>
            </Grid>
        </FooterWrapper>
    );
};
