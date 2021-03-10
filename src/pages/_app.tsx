import { AppProps } from 'next/app';
import { GlobalStyle } from '../theme/components';
import { ThemeProvider } from 'styled-components';
import Head from 'next/head';
import React from 'react';
import theme from '../theme';

export default function App({ Component, pageProps }: AppProps) {
    return (
        <>
            <Head>
                <meta content="width=device-width, initial-scale=1" name="viewport" />
                <meta content="#2362FB" name="theme-color" />
            </Head>
            <GlobalStyle />
            <ThemeProvider theme={theme}>
                <Component {...pageProps} />
            </ThemeProvider>
        </>
    );
}
