/* eslint-disable sort-keys */
export const config = {
    cta: {
        image: '/img/app-mockup.png'
    },
    footer: {
        menu: [
            { href: 'http://docs.impactmarket.com/', labelKey: 'aboutUs' },
            { labelKey: 'communities', to: '/communities' },
            { href: 'http://docs.impactmarket.com/', labelKey: 'faq' },
            { href: 'https://requests.impactmarket.com/feature-requests', labelKey: 'featureRequests' },
            { href: 'https://impactmarket.uvdesk.com/en/customer/create-ticket/', labelKey: 'bugReport' },
            { href: 'https://careers.impactmarket.com/', labelKey: 'careers' }
        ]
    },
    governanceArticles: [
        {
            icon: 'im',
            url: 'https://app.ubeswap.org/#/swap?outputCurrency=0x46c9757c5497c5b1f2eb73ae79b6b67d119b0b58',
            urlLabelKey: 'buyPactOnUbeswap'
        },
        { image: '/img/impact-market-dao.svg' },
        { icon: 'vote' },
        { icon: 'megaphone' }
    ],
    header: {
        menu: [
            { labelKey: 'aboutUs', to: 'https://docs.impactmarket.com/' },
            { labelKey: 'communities', to: '/communities' },
            {
                labelKey: 'governance',
                to: '/governance'
                // submenu: [
                //     { labelKey: 'claimPactTokens', to: '/governance' },
                //     { labelKey: 'voteOnProposals', to: 'https://romulus-interface-jet.vercel.app/' },
                //     { labelKey: 'voteOnCommunitiesSubmissions', to: '/community-submissions' },
                //     { labelKey: 'linkToOurDiscord', to: 'https://discord.gg/V6JWbM4ZQ3' }
                // ]
            },
            { labelKey: 'dashboard', to: '/global-dashboard' }
        ],
        status: {
            cta: {
                labelKey: 'pactCta',
                to: 'https://medium.com/impactmarket/introducing-pact-governance-token-airgrab-impact-farming-4e99c899701e'
            }
        }
    },
    seo: {
        image: 'https://impactmarket.com/img/seo.jpg'
    },
    social: {
        discord: 'https://discord.gg/V6JWbM4ZQ3',
        facebook: 'https://www.facebook.com/IPCTmarket',
        github: 'https://github.com/impactMarket',
        instagram: 'https://www.instagram.com/impactmarket_/',
        linkedin: 'https://www.linkedin.com/company/impactmarket',
        medium: 'https://medium.com/impactmarket',
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
