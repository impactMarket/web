export const en = {
    config: {
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
        strings: {
            copyAddress: 'Copy address',
            donate: 'Donate',
            downloadApp: 'Download App',
            enterYourEmail: 'Enter your email...',
            subscribe: 'Subscribe',
            subscribingNote:
                'By subscribing you will get updates about our progress, new features and impact measurement.',
            testVar: 'Hello {{ name }}. Today - {{date}} - is an awesome day!',
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
            scanText: 'Scan or copy/paste the address below into your wallet. Only send BTC to this address.',
            text:
                'Your donation will be used as reserve and converted to cUSD overtime to fund communities in urgent need and running out of funds.'
        }
    },
    pages: {
        /* eslint-disable sort-keys */
        homepage: {
            hero: {
                heading: 'Open and decentralized anti-poverty system.',
                text:
                    'impactMarket enables any community to have its own Unconditional Basic Income (UBI) for their beneficiaries. Anyone can back those communities by sending/donating $cUSD directly to their UBI contracts.'
            },
            keyPartners: {
                heading: 'Key partners',
                partners: [
                    { image: '/img/partners/celo.svg', name: 'celo', url: 'https://celo.org/' },
                    { image: '/img/partners/esolidar.svg.svg', name: 'eSolidar', url: 'https://www.esolidar.com' },
                    { image: '/img/partners/alight.svg', name: 'alight', url: 'https://alight.com/' }
                ]
            },
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
            },
            cta: {
                heading: 'Install our app',
                text:
                    'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nunc odio in et, lectus sit lorem id integer.Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nunc odio in et, lectus sit lorem id integer.'
            }
        },
        globalDashboard: {
            Hero: {
                heading: 'Lorem 2'
            }
        }
        /* eslint-enable sort-keys */
    }
};
