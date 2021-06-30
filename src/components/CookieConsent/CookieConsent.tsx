/* eslint-disable react/no-danger */
import { Col, Div, Grid, IconButton, Row, Text } from '../../theme/components';
import { colors } from '../../theme';
import { ease, transitions } from 'styled-gen';
import { hasCookieConsentDismissed, setCookieConsentDismissed } from '../../lib/localStorage';
import { useData } from '../DataProvider/DataProvider';
import Head from 'next/head';
import React, { useEffect, useState } from 'react';
import config from '../../../config';
import styled, { css } from 'styled-components';

const { gaId, hubspotId } = config;

type CookiesConsentWrapperProps = {
    isActive: boolean;
};

const CookiesConsentWrapper = styled.div<CookiesConsentWrapperProps>`
    ${transitions('transform', 500, ease.outCubic)};

    background-color: ${colors.backgroundDark};
    bottom: 0;
    color: ${colors.white};
    padding: 1rem 0;
    position: fixed;
    transform: translateY(100%);
    z-index: 9999;
    width: 100%;

    ${({ isActive }) =>
        isActive &&
        css`
            transform: translateY(0);
        `}
`;

const TextLink = styled.a`
    color: ${colors.brandPrimary};
`;

export const CookieConsent = () => {
    const [isCookiesConsentVisible, setIsCookiesConsentVisible] = useState(false);
    const [shouldCookiesConsentAppend, setShouldCookiesConsentAppend] = useState(true);
    const { getString } = useData();

    useEffect(() => {
        const cookieConsentDismissed = hasCookieConsentDismissed();

        if (cookieConsentDismissed) {
            setShouldCookiesConsentAppend(false);
        } else {
            setIsCookiesConsentVisible(true);
        }
    }, []);

    const handleConsentDismiss = () => {
        setCookieConsentDismissed();
        setIsCookiesConsentVisible(false);

        setTimeout(() => {
            setShouldCookiesConsentAppend(false);
        }, 500);
    };

    return (
        <>
            <Head>
                <script async src={`https://www.googletagmanager.com/gtag/js?id=${gaId}`} />
                <script
                    dangerouslySetInnerHTML={{
                        __html: `
              window.dataLayer = window.dataLayer || [];
              function gtag(){dataLayer.push(arguments);}
              gtag('js', new Date());

              gtag('config', '${gaId}', {
                page_path: window.location.pathname,
              });
            `
                    }}
                />
                <script
                    async
                    defer
                    id="hs-script-loader"
                    src={`//js.hs-scripts.com/${hubspotId}.js`}
                    type="text/javascript"
                />
            </Head>
            {shouldCookiesConsentAppend && (
                <CookiesConsentWrapper isActive={isCookiesConsentVisible}>
                    <Grid>
                        <Row>
                            <Col xs={12}>
                                <Div
                                    flex
                                    sAlignItems={{ md: 'center', xs: 'flex-start' }}
                                    sJustifyContent="space-between"
                                >
                                    <Text XSmall medium>
                                        {getString('cookieConsentMessage')}&nbsp;
                                        <TextLink href="/cookies" rel="noreferrer noopener" target="_blank">
                                            {getString('cookiePolicy')}
                                        </TextLink>
                                    </Text>
                                    <Div pl={1}>
                                        <IconButton icon="close" onClick={handleConsentDismiss} round />
                                    </Div>
                                </Div>
                            </Col>
                        </Row>
                    </Grid>
                </CookiesConsentWrapper>
            )}
        </>
    );
};
