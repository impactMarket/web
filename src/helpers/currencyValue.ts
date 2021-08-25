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

export const currencyValue = (inputNumber: BigNumber | string | number, options: OptionsType = defaultOptions) => {
    const { decimals, isToken, suffix, symbol } = options;

    if (!isToken) {
        return `${symbol || ''}${numericalValue(inputNumber, decimals)}${!!suffix ? ` ${suffix}` : ''}`;
    }

    return `${numericalValue(inputNumber, decimals)}${!!symbol ? ` ${symbol}` : ''}${!!suffix ? ` ${suffix}` : ''}`;
};
