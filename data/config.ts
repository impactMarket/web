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
        { name: 'totalCUSD' },
        { name: 'daoLiquidity' },
        { name: 'daoTreasury' }
    ],
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
