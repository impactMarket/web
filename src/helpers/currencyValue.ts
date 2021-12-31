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

export const currencyValue = (value: BigNumber | string | Number | number, options: OptionsType = defaultOptions) => {
    try {
        const { decimals, isToken, suffix, symbol } = options;

        const inputNumber = typeof value === 'number' ? +value.toFixed(2) : value;

        if (!isToken) {
            return `${symbol || ''}${numericalValue(inputNumber, decimals)}${!!suffix ? ` ${suffix}` : ''}`;
        }

        return `${numericalValue(inputNumber, decimals)}${!!symbol ? ` ${symbol}` : ''}${!!suffix ? ` ${suffix}` : ''}`;
    } catch (error) {
        console.log(error);

        return '';
    }
};
