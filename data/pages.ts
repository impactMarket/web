export const pages: { [key: string]: object } = {
    /* eslint-disable sort-keys */
    communities: {
        filters: [{ name: 'allCommunities' }, { name: 'featured' }]
    },
    community: {
        dashboard: {
            distribution: {
                charts: [
                    { name: 'claimed' },
                    { labelKey: 'numberClaims', name: 'claims' },
                    { name: 'newBeneficiaries' }
                ]
            },
            fundraising: {
                charts: [{ name: 'raised' }, { labelKey: 'numberBackers', name: 'backers' }, { name: 'fundingRate' }]
            },
            economic: {
                charts: [{ name: 'volume' }, { labelKey: '# Transfers', name: 'transfers' }, { name: 'reach' }]
            }
        }
    },
    communitySubmissions: {},
    fundraise: {
        hero: {
            addresses: [
                { address: '0xC483Cd9FC68e58074d1D82b7a9fFdE948Db6d119', name: 'celo' },
                { address: 'bc1qe7ksg8va9uzfu4pl9ea8zyftad94p0tgtuavk4', name: 'btc' },
                { address: '0x4D93536aa77FE4fDD48DC7f2c228410eC49c233C', name: 'eth' }
            ],
            cover: '/img/Fundraise-cover.png',
            esolidarCampaignUrl: 'https://community.esolidar.com/npo/detail/1757-impactmarket',
            endDate: '2021-11-30',
            learnMoreUrl: ''
        },
        balance: {
            // items: ['btc', 'celo', 'eth', 'esolidar']
            items: ['celo', 'eth']
        }
    },
    globalDashboard: {
        global: {
            rows: [
                {
                    items: [
                        { name: 'totalRaised' },
                        { name: 'totalDistributed' },
                        { labelKey: 'numberBackers', name: 'backers' },
                        { labelKey: 'numberBeneficiaries', name: 'beneficiaries' }
                    ],
                    labelKey: 'inflowOutflow'
                },
                {
                    items: [
                        { labelKey: 'givingRatePerBacker', name: 'ratePerBacker' },
                        { labelKey: 'ubiRatePerBeneficiary', name: 'ratePerBeneficiary' },
                        { name: 'avgCumulativeUbi' },
                        { name: 'avgUbiDuration' }
                    ],
                    labelKey: 'ubiPulse'
                },
                {
                    items: [
                        { name: 'totalVolume' },
                        { labelKey: 'numberTransfers', name: 'transfers' },
                        { name: 'reach' },
                        { name: 'spendingRate' }
                    ],
                    labelKey: 'economicBeneficiariesActivity'
                }
            ]
        },
        communities: {
            filterOptions: [
                { labelKey: 'newestFirst', value: 'newest' },
                { labelKey: 'biggerFirst', value: 'bigger' },
                { labelKey: 'runningOutOfFundsFirst', value: 'out_of_funds' }
            ],
            table: {
                header: [
                    { name: 'communityName' },
                    { name: 'allowancePerBeneficiary' },
                    { name: 'ubiRatePerBeneficiary' },
                    { name: 'estimatedUbiDuration' },
                    { labelAppend: '*', name: 'ssi' },
                    { name: 'beneficiaries' },
                    { name: 'claimed' },
                    { name: 'backers' },
                    { name: 'raised' },
                    { name: 'ubiContract' }
                ],
                initialRows: 5
            }
        },
        distribution: {
            charts: [{ name: 'claimed' }, { labelKey: 'numberClaims', name: 'claims' }, { name: 'newBeneficiaries' }]
        },
        fundraising: {
            charts: [{ name: 'raised' }, { labelKey: 'numberBackers', name: 'backers' }, { name: 'fundingRate' }]
        },
        economic: {
            charts: [{ name: 'volume' }, { labelKey: 'numberTransfers', name: 'transfers' }, { name: 'reach' }]
        }
    },
    governanceToken: {
        meta: {
            description: 'page.governanceToken.seo.description',
            image: 'https://impactmarket.com/img/share-governance.jpg',
            title: 'page.governanceToken.seo.title'
        }
    }
};
