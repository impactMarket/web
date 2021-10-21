import { AppProps } from 'next/app';
import { Content, GlobalStyle, Main } from '../theme/components';
import { CookieConsent, Footer, Header, Loading, SEO } from '../components';
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
import config from '../../config';
import theme from '../theme';

const { baseUrl, recaptchaKey } = config;

Router.events.on('routeChangeComplete', url => pageview(url));

export default function App(props: AppProps) {
    const { Component, pageProps, router } = props;
    const { pathname, locale } = router;
    const url = `${baseUrl}/${locale}${pathname}`;
    const { meta, page, statusCode } = pageProps;
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

    if (!page) {
        return <ErrorPage statusCode={statusCode} />;
    }

    return (
        <>
            <Head>
                <meta content="width=device-width, initial-scale=1" name="viewport" />
                <meta content="#2362FB" name="theme-color" />
            </Head>
            <GlobalStyle />
            <ThemeProvider theme={theme}>
                <TranslationProvider locale={locale}>
                    <DataProvider page={page} url={url}>
                        <GoogleReCaptchaProvider reCaptchaKey={recaptchaKey}>
                            <Loading isActive={showSpinner} />
                            <ModalManager modals={modals} />
                            <SEO meta={meta} />
                            <Main>
                                <Header />
                                <Content>
                                    <Component {...pageProps} />
                                </Content>
                                <Footer />
                            </Main>
                            <CookieConsent />
                        </GoogleReCaptchaProvider>
                    </DataProvider>
                </TranslationProvider>
            </ThemeProvider>
        </>
    );
}
