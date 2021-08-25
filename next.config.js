const withManifest = require('next-manifest');
const langConfig = require('./lang-config');

const languageRedirects = [
    { source: '/en/:path*', destination: '/:path*' },
    { source: '/fr/:path*', destination: '/fr-FR/:path*' },
    { source: '/es/:path*', destination: '/es-ES/:path*' },
    { source: '/pt-br/:path*', destination: '/pt-BR/:path*' },
].map(redirect => ({ ...redirect, permanent: true }));

const redirects = async () => languageRedirects;

const i18n = {
  defaultLocale: langConfig.find(({ isDefault }) => isDefault)?.code || 'en-us',
  locales: langConfig.map(({ code }) => code)
};

const manifest = {
  background_color: '#ffffff',
  display: 'standalone',
  icons: [
    {
      sizes: '192x192',
      src: '/img/android-chrome-192x192.png',
      type: 'img/png'
    },
    {
      sizes: '512x512',
      src: '/img/android-chrome-512x512.png',
      type: 'img/png'
    }
  ],
  name: 'impact-market',
  output: './public/manifest/',
  short_name: 'impact-market',
  start_url: '/',
  theme_color: '#2362FB'
};

const typescript = {
    ignoreBuildErrors: false
}

const webpack = (config, { webpack }) => {
    config.resolve.fallback = {
        ...config.resolve.fallback,
        fs: false,
        net: false,
        child_process: false,
        readline: false,
    };

    config.plugins.push(new webpack.IgnorePlugin(/^electron$/));

    return config
}

const config = withManifest({ i18n, typescript, manifest, redirects, webpack });

module.exports = config;
