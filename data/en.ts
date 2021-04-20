export const en = {
    config: {
        cta: {
            heading: 'Install our app',
            image: '/img/app-mockup.png',
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
            addressReachedOn: '{{ value }} addresses reached on {{ date }}',
            allCommunities: 'All Communities',
            averageSsiWas: '{{ date }} average SSI was {{ value }}',
            beneficiary: 'Beneficiary',
            claimedOn: '${{ value }} claimed on {{ date }}',
            claimsOn: '{{ value }} claims on {{ date }}',
            communities: 'Communities',
            communitiesPagination: '{{ first }}-{{ last }} of {{ total }} Communities',
            cookieConsentMessage:
                'We use our own cookies as well as third-party cookies on our website to enhance your experience, analyze our traffic, and for security and marketing. For more info, see our',
            cookiePolicy: 'Cookie Policy',
            copyAddress: 'Copy address',
            day: 'Day',
            donate: 'Donate',
            downloadApp: 'Download App',
            enterYourEmail: 'Enter your email...',
            featured: 'Featured',
            fundingRateOn: '{{ value }}% funding rate on {{ date }}',
            invalidEmail: 'The email is not valid',
            lowOnFunds: 'Low on funds',
            many: 'many',
            monthlyActiveBackers: '{{ value }} monthly active backers on {{ date }}',
            months: 'Months',
            newBeneficiariesOn: '{{ value }} new beneficiaries on {{ date }}',
            raisedOn: '${{ value }} raised on {{ date }}',
            recentlyAdded: 'Recently added',
            required: 'A valid email is required',
            rowsPerPage: 'Rows per page',
            somethingWrong: 'Something went wrong. Try again later...',
            subscribe: 'Subscribe',
            subscribeSuccess: 'Thanks for subscribing!',
            subscribingNote:
                'By subscribing you will get updates about our progress, new features and impact measurement.',
            transactedOn: '${{ value }} transacted on {{ date }}',
            transactionsOn: '{{ value }} transactions on {{ date }}',
            viewAll: 'View All',
            vsPrevious30Days: 'vs previous 30 days',
            wrongEmail: 'Wrong email',
            xOfCountries: '{{ first }} - {{ last }} of {{ total }} Countries'
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
                image: '/img/hero.png',
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
        communities: {
            heading: 'Communities',
            filters: [
                { label: 'Featured', name: 'featured' },
                { label: 'Recently added', name: 'recent' },
                { label: 'Low on funds', name: 'lowFunds' }
            ]
        },
        globalDashboard: {
            global: {
                heading: 'Global dashboard',
                text:
                    'Explore the main indicators of impactMarket system both on inflow of funds and distribution of basic income to beneficiaries through their UBI community contracts.',
                rows: [
                    {
                        heading: 'Inflow / Outflow',
                        items: [
                            { heading: 'Total Raised', helper: 'totalRaised' },
                            { heading: 'Total Distributed', helper: 'totalDistributed' },
                            { heading: '# Backers', helper: 'backers' },
                            { heading: '# Beneficiaries', helper: 'beneficiaries' }
                        ]
                    },
                    {
                        heading: 'UBI Pulse',
                        items: [
                            { heading: 'Giving Rate per Backer', helper: 'ratePerBacker' },
                            { heading: 'UBI Rate per Beneficiary', helper: 'ratePerBeneficiary' },
                            { heading: 'Avg Cumulative UBI', helper: 'avgCumulativeUbi' },
                            { heading: 'Avg UBI duration', helper: 'avgUbiDuration' }
                        ]
                    },
                    {
                        heading: "Economic beneficiaries' activity",
                        items: [
                            { heading: 'Total Volume', helper: 'totalVolume' },
                            { heading: '# Transfers', helper: 'transfers' },
                            { heading: 'Reach', helper: 'reach' },
                            { heading: 'Spending Rate', helper: 'spendingRate' }
                        ]
                    }
                ]
            },
            healingMap: {
                heading: 'Healing the world, ending poverty',
                text:
                    'Discover active communities and their beneficiaries’ activity on accessing/claiming a basic income that is empowering them out of poverty.'
            },
            communities: {
                filterOptions: [
                    { label: 'Newest first', value: 'newest' },
                    { label: 'Bigger first', value: 'bigger' },
                    { label: 'Running out of funds first', value: 'out_of_funds' }
                ],
                heading: 'Helping {{ communitiesCount }} Communities',
                ssi: {
                    heading: 'Average Self-sustainability Index (SSI)',
                    text:
                        "*SSI measures communities' collective financial self-sustainability, and average progress. It is inversely correlated with their beneficiaries UBI dependency/need and urgency."
                },
                text:
                    'UBI communities are usually managed and promoted by community leaders and social, governamental, or local organizations, who set up the initial UBI parameters, and add/remove which beneficiaries they believe would most benefit from it.',
                table: {
                    header: [
                        { label: 'Community name', name: 'communityName' },
                        { label: 'Allowance per Beneficiary', name: 'allowancePerBeneficiary' },
                        { label: 'UBI Rate per Beneficiary', name: 'ubiRatePerBeneficiary' },
                        { label: 'Estimated UBI Duration', name: 'estimatedUbiDuration' },
                        { label: 'SSI*', name: 'ssi' },
                        { label: 'Beneficiaries', name: 'beneficiaries' },
                        { label: 'Claimed', name: 'claimed' },
                        { label: 'Backers', name: 'backers' },
                        { label: 'Raised', name: 'raised' },
                        { label: 'Ubi Contract', name: 'ubiContract' }
                    ],
                    initialRows: 3
                }
            },
            demographics: {
                charts: {
                    ageRange: {
                        heading: 'Age Range'
                    },
                    countries: {
                        heading: 'Country (Number of beneficiaries)'
                    }
                },
                heading: 'Demographics',
                tooltip: 'This data is based on a self-reported sample size of {{ totalPercentage }}%'
            },
            distribution: {
                heading: 'Monthly Distribution',
                text:
                    "Beneficiaries from different communities can claim $cUSD on a regular basis from their community contracts. UBI parameters take into consideration their beneficiaries' basic needs, and assessment by local social organizations and community leaders.",
                charts: [
                    { heading: 'Claimed', helper: 'claimed' },
                    { heading: '# Claims', helper: 'claims' },
                    { heading: 'New Beneficiaries', helper: 'newBeneficiaries' }
                ]
            },
            fundraising: {
                heading: 'Monthly Fundraising',
                text:
                    'Anyone can back those communities by sending $cUSD (Celo Dollar) directly to their contracts. This measures global monthly inflow, and its rate vs distribution.',
                charts: [
                    { heading: 'Raised', helper: 'raised' },
                    { heading: '# Backers', helper: 'backers' },
                    { heading: 'Funding Rate', helper: 'fundingRate' }
                ]
            },
            economic: {
                heading: 'Monthly Economic Development',
                text:
                    "Main indicators on beneficiaries' direct financial activity including volume transacted last month, number of transactions, and how many people they have reached/transacted with.",
                charts: [
                    { heading: 'Volume', helper: 'volume' },
                    { heading: '# Transfers', helper: 'transfers' },
                    { heading: 'Reach', helper: 'reach' }
                ]
            }
        }
        /* eslint-enable sort-keys */
    }
};
