/* eslint-disable sort-keys */
const langConfig = require('./lang-config');

const languageRedirects = [
    { source: '/en/:path*', destination: '/:path*' },
    { source: '/fr/:path*', destination: '/fr-FR/:path*' },
    { source: '/es/:path*', destination: '/es-ES/:path*' },
    { source: '/pt-br/:path*', destination: '/pt-BR/:path*' },
].map(redirect => ({ ...redirect, permanent: true }));

const redirects = () => languageRedirects;

const i18n = {
  defaultLocale: langConfig.find(({ isDefault }) => isDefault)?.code || 'en-us',
  locales: langConfig.map(({ code }) => code)
};

const images = {
  domains: ['impact-market.cdn.prismic.io', 'images.prismic.io', 'prismic-io.s3.amazonaws.com', 'dxdwf61ltxjyn.cloudfront.net', 'd3ma540h3o1zlk.cloudfront.net']
};

const typescript = {
    ignoreBuildErrors: false
}

const webpack = config => {
    config.resolve.fallback = {
        ...config.resolve.fallback,
        child_process: false,
        fs: false,
        net: false,
        readline: false,
    };

    return config
}

/** @type {import('next').NextConfig} */
const config = { i18n, images, redirects, typescript, webpack };

module.exports = config;
