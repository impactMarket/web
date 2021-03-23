import { AppProps } from 'next/app';
import { Content, GlobalStyle, Main } from '../theme/components';
import { DataProvider } from '../components/DataProvider/DataProvider';
import { Footer, Header, SEO } from '../components';
import { ModalManager } from 'react-modal-handler';
import { ThemeProvider } from 'styled-components';
import { modals } from '../modals';
import Head from 'next/head';
import React from 'react';
import config from '../../config';
import theme from '../theme';

const { baseUrl } = config;

export default function App(props: AppProps) {
    const { Component, pageProps, router } = props;
    const { pathname, locale } = router;
    const url = `${baseUrl}/${locale}${pathname}`;
    const { page, statusCode } = pageProps;

    if (!page && statusCode !== 404) {
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
                    <ModalManager modals={modals} />
                    <SEO />
                    <Main>
                        <Header />
                        <Content>
                            <Component {...pageProps} />
                        </Content>
                        <Footer />
                    </Main>
                </DataProvider>
            </ThemeProvider>
        </>
    );
}
