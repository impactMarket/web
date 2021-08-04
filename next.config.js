const withManifest = require('next-manifest');
const langConfig = require('./lang-config');

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

const config = withManifest({ i18n, manifest });

module.exports = config;
