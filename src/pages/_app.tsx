import { AppProps } from 'next/app';
import { DataProvider, Header, SEO } from '../components';
import { GlobalStyle } from '../theme/components';
import { ThemeProvider } from 'styled-components';
import Head from 'next/head';
import React from 'react';
import theme from '../theme';

// eslint-disable-next-line no-process-env
const baseUrl = process.env.NEXT_PUBLIC_URL;

export default function App(props: AppProps) {
    const { Component, pageProps, router } = props;
    const { pathname, locale } = router;
    const url = `${baseUrl}/${locale}${pathname}`;
    const { page } = pageProps;

    if (!page) {
        return <h1>Did you forgot to pass a page name?</h1>;
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
                    <SEO />
                    <Header />
                    <Component {...pageProps} />
                </DataProvider>
            </ThemeProvider>
        </>
    );
}
