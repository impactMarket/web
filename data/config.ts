export const config = {
    cta: {
        image: '/img/app-mockup.png'
    },
    footer: {
        menu: [
            { href: 'http://docs.impactmarket.com/', labelKey: 'aboutUs' },
            { labelKey: 'communities', to: '/communities' },
            { href: 'http://docs.impactmarket.com/', labelKey: 'faqs' },
            { href: 'https://requests.impactmarket.com/feature-requests', labelKey: 'featureRequests' },
            { href: 'https://impactmarket.uvdesk.com/en/customer/create-ticket/', labelKey: 'bugReport' },
            { href: 'https://careers.impactmarket.com/', labelKey: 'weAreHiring' }
        ]
    },
    header: {
        menu: [
            { labelKey: 'communities', to: '/communities' },
            { labelKey: 'globalDashboard', to: '/global-dashboard' }
        ]
    },
    seo: {
        image: 'https://impactmarket.com/img/seo.jpg'
    },
    social: {
        facebook: 'https://www.facebook.com/IPCTmarket',
        github: 'https://github.com/impactMarket',
        linkedin: 'https://www.linkedin.com/company/impactmarket',
        telegram: 'https://t.me/impactMarket',
        twitter: 'https://twitter.com/IPCTmarket'
    },
    storeLinks: {
        appstore: 'https://apps.apple.com/app/impactmarket/id1530870911',
        playstore: 'https://play.google.com/store/apps/details?id=com.impactmarket.mobile'
    },
    wallets: [
        {
            address: 'bc1qe7ksg8va9uzfu4pl9ea8zyftad94p0tgtuavk4',
            code: 'btc',
            label: 'Bitcoin'
        },
        {
            address: '0xC483Cd9FC68e58074d1D82b7a9fFdE948Db6d119',
            code: 'celo',
            label: 'Celo'
        },
        {
            address: '0x4D93536aa77FE4fDD48DC7f2c228410eC49c233C',
            code: 'eth',
            label: 'ETH / ERC 20'
        }
    ]
};
