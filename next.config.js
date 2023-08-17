/* eslint-disable sort-keys */
const langConfig = require('./lang-config');
const { withSentryConfig } = require('@sentry/nextjs');

const languageRedirects = [
    { source: '/en/:path*', destination: '/:path*' },
    { source: '/fr/:path*', destination: '/fr-FR/:path*' },
    { source: '/es/:path*', destination: '/es-ES/:path*' },
    { source: '/pt-br/:path*', destination: '/pt-BR/:path*' }
].map((redirect) => ({ ...redirect, permanent: true }));

const redirects = () => languageRedirects;

const i18n = {
    defaultLocale:
        langConfig.find(({ isDefault }) => isDefault)?.code || 'en-us',
    locales: langConfig.map(({ code }) => code)
};

const images = {
    domains: [
        'impact-market.cdn.prismic.io',
        'images.prismic.io',
        'prismic-io.s3.amazonaws.com',
        'dxdwf61ltxjyn.cloudfront.net',
        'd3ma540h3o1zlk.cloudfront.net'
    ]
};

const typescript = {
    ignoreBuildErrors: false
};

const webpack = (config) => {
    config.resolve.fallback = {
        ...config.resolve.fallback,
        child_process: false,
        fs: false,
        net: false,
        readline: false
    };

    return config;
};

/** @type {import('next').NextConfig} */
const config = { i18n, images, redirects, typescript, webpack };

// Injected content via Sentry wizard below
module.exports = withSentryConfig(
    config,
    {
        // For all available options, see:
        // https://github.com/getsentry/sentry-webpack-plugin#options

        // Suppresses source map uploading logs during build
        silent: true,

        org: 'impactmarket',
        project: 'web'
    },
    {
        // For all available options, see:
        // https://docs.sentry.io/platforms/javascript/guides/nextjs/manual-setup/

        // Upload a larger set of source maps for prettier stack traces (increases build time)
        widenClientFileUpload: true,

        // Transpiles SDK to be compatible with IE11 (increases bundle size)
        transpileClientSDK: true,

        // Routes browser requests to Sentry through a Next.js rewrite to circumvent ad-blockers (increases server load)
        tunnelRoute: '/monitoring',

        // Hides source maps from generated client bundles
        hideSourceMaps: true,

        // Automatically tree-shake Sentry logger statements to reduce bundle size
        disableLogger: true
    }
);
