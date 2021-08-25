import { numericalValue } from '../helpers/numericalValue';

export const pact: { [key: string]: Function } = {
    circulatingSupply: () => {
        const value = 1000000000;

        return `${numericalValue(value)} PACT`;
    },

    donatedLastMonth: () => {
        const value = 267;

        return `${numericalValue(value)} cUSD`;
    },

    pactTokenHolders: () => {
        const value = 239847;

        return numericalValue(value);
    },

    totalDonated: () => {
        const value = 2376;

        return `${numericalValue(value)} cUSD`;
    },

    totalSupply: () => {
        const value = 827364823;

        return `${numericalValue(value)} cUSD`;
    }
};
