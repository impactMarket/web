import { AppProps } from 'next/app';
import { Content, GlobalStyle, Main } from '../theme/components';
import { CookieConsent, Footer, Header, Loading, SEO } from '../components';
import { DataProvider } from '../components/DataProvider/DataProvider';
import { ModalManager } from 'react-modal-handler';
import { ThemeProvider } from 'styled-components';
import { modals } from '../modals';
import { pageview } from '../lib/gtag';
import ErrorPage from 'next/error';
import Head from 'next/head';
import React, { useEffect, useState } from 'react';
import Router from 'next/router';
import config from '../../config';
import theme from '../theme';

const { baseUrl } = config;

Router.events.on('routeChangeComplete', url => pageview(url));

export default function App(props: AppProps) {
    const { Component, pageProps, router } = props;
    const { pathname, locale } = router;
    const url = `${baseUrl}/${locale}${pathname}`;
    const { page, statusCode } = pageProps;
    const [showSpinner, setShowSpinner] = useState(false);

    useEffect(() => {
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
    }, []);

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
                <DataProvider locale={locale} page={page} url={url}>
                    <Loading isActive={showSpinner} />
                    <ModalManager modals={modals} />
                    <SEO />
                    <Main>
                        <Header />
                        <Content>
                            <Component {...pageProps} />
                        </Content>
                        <Footer />
                    </Main>
                    <CookieConsent />
                </DataProvider>
            </ThemeProvider>
        </>
    );
}
