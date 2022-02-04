/* eslint-disable sort-keys */
export const config = {
    cta: {
        image: '/img/app-mockup.png'
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
    tokenMetrics: [
        { name: 'priceCUSD' },
        { name: 'circulatingSupply' },
        { name: 'tokenHolders' },
        { name: 'marketCap' },
        { name: 'transfers' },
        { name: 'totalCUSD' }
    ]
};
