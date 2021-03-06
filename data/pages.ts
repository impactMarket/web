export const pages: { [key: string]: object } = {
    /* eslint-disable sort-keys */
    homepage: {
        hero: {
            image: '/img/hero.png'
        },
        partners: [
            {
                items: [
                    { image: '/img/partners/celo.png', name: 'Celo', url: 'https://celo.org/' },
                    { image: '/img/partners/esolidar.svg', name: 'eSolidar', url: 'https://www.esolidar.com' }
                ],
                keyLabel: 'keyPartners'
            },
            {
                items: [{ image: '/img/partners/copa.png', name: 'copa', url: 'https://www.opencrypto.org/' }],
                keyLabel: 'memberOf'
            }
        ],
        numbers: {
            items: [
                { labelKey: 'claimedAsUbi', name: 'claimed' },
                { name: 'countries' },
                { name: 'beneficiaries' },
                { name: 'backers' },
                { name: 'communities' }
            ]
        }
    },
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
                initialRows: 3
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
    }
};
