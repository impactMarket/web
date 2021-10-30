/* eslint-disable sort-keys */
import axios, { AxiosResponse } from 'axios';
import toNumber from '../helpers/toNumber';

const instance = axios.create({
    baseURL: 'https://api.coingecko.com/api/v3/coins'
});

const ethCurrencies = ['eth', 'dai', 'usdc', 'usdt'] as const;
const ethContractAddresses: {
    name: typeof ethCurrencies[number];
    address: string;
}[] = [
    { name: 'dai', address: '0x6b175474e89094c44da98b954eedeac495271d0f' },
    { name: 'usdc', address: '0xa0b86991c6218b36c1d19d4a2e9eb0ce3606eb48' },
    { name: 'usdt', address: '0xdac17f958d2ee523a2206206994597c13d831ec7' }
];

const celoCurrencies = ['celo', 'cusd', 'ceur'] as const;
const celoContractAddresses: {
    name: typeof celoCurrencies[number];
    address: string;
}[] = [
    { name: 'celo', address: '0x471EcE3750Da237f93B8E339c536989b8978a438' },
    { name: 'cusd', address: '0x765DE816845861e75A25fCA122bb6898B8B1282a' },
    { name: 'ceur', address: '0xD8763CBa276a3738E6DE85b4b3bF5FDed6D6cA73' }
];

const getCoinPrice = async (coin: string) =>
    (
        await instance.get<
            any,
            AxiosResponse<{
                // eslint-disable-next-line camelcase
                market_data: { current_price: { [key: string]: number } };
            }>
        >(`/${coin}?tickers=false&community_data=false&developer_data=false&sparkline=false`)
    ).data.market_data.current_price.usd;

const getEtherScanBalance = async (
    wallet: string,
    etherscanApiKey: string,
    balanceOf: typeof ethCurrencies[number]
) => {
    const contractaddress = ethContractAddresses.find(({ name }) => name === balanceOf)?.address;

    const queryCoin = contractaddress ? `action=tokenbalance&contractaddress=${contractaddress}` : 'action=balance';

    const balance = await axios.get<any, AxiosResponse<{ result: string }>>(
        `https://api.etherscan.io/api?module=account&${queryCoin}&address=${wallet}&tag=latest&apikey=${etherscanApiKey}`
    );

    if (balanceOf === 'eth') {
        return toNumber(balance.data.result);
    }

    return parseInt(balance.data.result, 10) / 1000000;
};

const getCeloApiBalance = async (wallet: string, balanceOf: typeof celoCurrencies[number]) => {
    const contractaddress = celoContractAddresses.find(({ name }) => name === balanceOf)?.address;

    const balance = await axios.get<any, AxiosResponse<{ result: string }>>(
        `https://explorer.celo.org/api?module=account&action=tokenbalance&contractaddress=${contractaddress}&address=${wallet}`
    );

    return balance.data.result;
};

const getCeloWalletBalance = async (wallet: string) => {
    const [celoPrice, celoEuroPrice] = await Promise.all([getCoinPrice('celo'), getCoinPrice('celo-euro')]);

    const balance = await Promise.all(
        celoCurrencies.map(async (currency: typeof celoCurrencies[number]) => {
            const val = await getCeloApiBalance(wallet, currency);

            if (currency === 'celo') {
                return celoPrice * toNumber(val);
            }

            if (currency === 'ceur') {
                return celoEuroPrice * toNumber(val);
            }

            return toNumber(val);
        })
    );

    return balance.reduce((previous, current) => previous + current, 0);
};

const getEthereumWalletBalance = async (wallet: string, etherscanApiKey: string) => {
    const ethPrice = await getCoinPrice('ethereum');

    const balance = await Promise.all(
        ethCurrencies.map(async (currency: typeof ethCurrencies[number]) => {
            const val = await getEtherScanBalance(wallet, etherscanApiKey, currency);

            return currency === 'eth' ? ethPrice * val : val;
        })
    );

    return balance.reduce((previous, current) => previous + current, 0);
};

export async function getWalletsBalance(props: {
    wallets: { celo: string; bitcoin: string; ethereum: string };
    etherscanApiKey: string;
}) {
    const [celo, eth] = await Promise.all([
        getCeloWalletBalance(props.wallets.celo),
        getEthereumWalletBalance(props.wallets.ethereum, props.etherscanApiKey)
    ]);

    return { celo, eth };
}
