export const en = {
    config: {
        cta: {
            heading: 'Install our app',
            image: '/img/app-mockup',
            text:
                'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nunc odio in et, lectus sit lorem id integer.Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nunc odio in et, lectus sit lorem id integer.'
        },
        footer: {
            footnote:
                'Your donation will be used as reserve and converted to cUSD overtime to fund communities in urgent need and running out of funds.',
            menu: [{ label: 'Privacy Policy', to: '/privacy-policy' }]
        },
        header: {
            menu: [{ label: 'Global Dashboard', to: '/global-dashboard' }]
        },
        seo: {
            description: 'Lorem ipsum',
            image: '/img/seo.jpg',
            keywords: 'Lorem ipsum',
            title: 'Impact Market'
        },
        social: {
            facebook: 'https://www.facebook.com/IPCTmarket',
            github: 'https://github.com/impactMarket',
            linkedin: 'https://www.linkedin.com/company/impactmarket',
            telegram: 'https://t.me/impactMarket',
            twitter: 'https://twitter.com/IPCTmarket'
        },
        storeLinks: {
            appstore: 'https://testflight.apple.com/join/o19f5StV',
            playstore: 'https://play.google.com/store/apps/details?id=com.impactmarket.mobile'
        },
        strings: {
            copyAddress: 'Copy address',
            donate: 'Donate',
            downloadApp: 'Download App',
            enterYourEmail: 'Enter your email...',
            invalidEmail: 'The email is not valid',
            required: 'A valid email is required',
            somethingWrong: 'Something went wrong. Try again later...',
            subscribe: 'Subscribe',
            subscribeSuccess: 'Thanks for subscribing!',
            subscribingNote:
                'By subscribing you will get updates about our progress, new features and impact measurement.',
            wrongEmail: 'Wrong email'
        },
        wallets: [
            { address: 'bc1qe7ksg8va9uzfu4pl9ea8zyftad94p0tgtuavk4', code: 'btc', label: 'Bitcoin' },
            { address: '0xC483Cd9FC68e58074d1D82b7a9fFdE948Db6d119', code: 'celo', label: 'Celo' },
            { address: '0x4D93536aa77FE4fDD48DC7f2c228410eC49c233C', code: 'eth', label: 'ETH / ERC 20' }
        ]
    },
    modals: {
        donate: {
            currencies: ['btc', 'eth', 'celo'],
            scanText:
                'Scan or copy/paste the address below into your wallet. Only send {{ currency }} to this address.',
            text:
                'Your donation will be used as reserve and converted to cUSD overtime to fund communities in urgent need and running out of funds.'
        }
    },
    pages: {
        /* eslint-disable sort-keys */
        homepage: {
            hero: {
                heading: 'Open and decentralized anti&#8209;poverty system.',
                image: '/img/kids.png',
                text:
                    'impactMarket enables any community to have its own Unconditional Basic Income (UBI) for their beneficiaries. Anyone can back those communities by sending/donating $cUSD directly to their UBI contracts.'
            },
            partners: [
                {
                    heading: 'Key partners',
                    items: [
                        { image: '/img/partners/celo.png', name: 'Celo', url: 'https://celo.org/' },
                        { image: '/img/partners/esolidar.png', name: 'eSolidar', url: 'https://www.esolidar.com' }
                    ]
                },
                {
                    heading: 'Member of',
                    items: [{ image: '/img/partners/copa.png', name: 'copa', url: 'https://www.opencrypto.org/' }]
                }
            ],
            numbers: {
                buttonLabel: 'View Global Dashboard',
                heading: 'Numbers that make a difference',
                items: [
                    { heading: '+200K', name: 'totalRaised', text: 'Total Raised' },
                    { heading: '5', name: 'countries', text: 'Countries' },
                    { heading: '+10K', name: 'beneficiaries', text: 'Beneficiaries' },
                    { heading: '80', name: 'backers', text: 'Backers' },
                    { heading: '53', name: 'communities', text: 'Communities' }
                ],
                text:
                    'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nunc odio in et, lectus sit lorem id integer.'
            }
        },
        globalDashboard: {
            hero: {
                heading: 'Lorem 2'
            }
        }
        /* eslint-enable sort-keys */
    }
};
