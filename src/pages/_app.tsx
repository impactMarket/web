import { AppProps } from 'next/app';
import { Content, GlobalStyle, Main } from '../theme/components';
import { CookieConsent, Footer, Header, ImpactMarketDaoProvider, Loading, SEO } from '../components';
import { DataProvider } from '../components/DataProvider/DataProvider';
import { GoogleReCaptchaProvider } from 'react-google-recaptcha-v3';
import { ModalManager } from 'react-modal-handler';
import { ThemeProvider } from 'styled-components';
import { TranslationProvider } from '../components/TranslationProvider/TranslationProvider';
import { modals } from '../modals';
import { pageview } from '../lib/gtag';
import ErrorPage from 'next/error';
import Head from 'next/head';
import React, { useEffect, useState } from 'react';
import Router from 'next/router';
import Toaster from '../components/Toaster/Toaster';
import config from '../../config';
import theme from '../theme';

const { baseUrl, isProduction, recaptchaKey } = config;

Router.events.on('routeChangeComplete', url => pageview(url));

export default function App(props: AppProps) {
    const { Component, pageProps, router } = props;
    const { pathname, locale } = router;
    const url = `${baseUrl}/${locale}${pathname}`;
    const { footerOptions = {}, meta, page, statusCode, wip } = pageProps;
    const [showSpinner, setShowSpinner] = useState(true);

    useEffect(() => {
        // eslint-disable-next-line no-underscore-dangle
        window.__localeId__ = locale;

        const handleRouteChange = () => {
            setShowSpinner(true);
        };

        const handleRouteComplete = () => {
            setShowSpinner(false);
        };

        router.events.on('routeChangeStart', handleRouteChange);
        router.events.on('routeChangeComplete', handleRouteComplete);

        return () => {
            router.events.off('routeChangeStart', handleRouteChange);
            router.events.on('routeChangeComplete', handleRouteComplete);
        };
    }, [locale, router.events]);

    if (!page || (wip && isProduction)) {
        return <ErrorPage statusCode={wip ? 404 : statusCode} />;
    }

    return (
        <DataProvider page={page} url={url}>
            <TranslationProvider locale={locale}>
                <Head>
                    <meta content="width=device-width, initial-scale=1" name="viewport" />
                    <meta content="#2362FB" name="theme-color" />
                </Head>
                <SEO meta={meta} />
                <ThemeProvider theme={theme}>
                    <GlobalStyle />
                    <GoogleReCaptchaProvider reCaptchaKey={recaptchaKey}>
                        <Loading isActive={showSpinner} />
                        <Toaster />
                        <ModalManager modals={modals} />
                        <Main>
                            <ImpactMarketDaoProvider>
                                <Header />
                                <Content>
                                    <Component {...pageProps} />
                                </Content>
                                <Footer {...footerOptions} />
                            </ImpactMarketDaoProvider>
                        </Main>
                        <CookieConsent />
                    </GoogleReCaptchaProvider>
                </ThemeProvider>
            </TranslationProvider>
        </DataProvider>
    );
}
