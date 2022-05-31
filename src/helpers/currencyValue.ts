import { BigNumber } from 'bignumber.js';
import { numericalValue } from './numericalValue';

type OptionsType = {
    decimals?: boolean;
    fixed?: number;
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

        const { decimals, fixed, isToken, suffix, symbol } = options;

        const inputNumber = typeof amount === 'number' ? +amount.toFixed(fixed !== undefined ? fixed : 2) : amount;

        const value = numericalValue(inputNumber, decimals, fixed);

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
