import { BigNumber } from 'bignumber.js';
import { numericalValue } from './numericalValue';

type OptionsType = {
    decimals?: boolean;
    suffix?: string;
    isToken?: boolean;
    symbol?: string;
};

const defaultOptions = {
    decimals: true,
    symbol: '$'
};

export const currencyValue = (amount: BigNumber | string | Number | number, options: OptionsType = defaultOptions) => {
    try {
        if (amount === '-' || amount === '--') {
            return amount;
        }

        const { decimals, isToken, suffix, symbol } = options;

        const inputNumber = typeof amount === 'number' ? +amount.toFixed(2) : amount;

        const value = numericalValue(inputNumber, decimals);

        if (typeof value !== 'string' && isNaN(+value)) {
            return;
        }

        if (!isToken) {
            return `${symbol || ''}${value}${!!suffix ? ` ${suffix}` : ''}`;
        }

        return `${value}${!!symbol ? ` ${symbol}` : ''}${!!suffix ? ` ${suffix}` : ''}`;
    } catch (error) {
        console.log(error);

        return;
    }
};
