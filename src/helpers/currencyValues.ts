import { BigNumber } from 'bignumber.js';
import { numericalValue } from './numericalValue';

type OptionsType = {
    decimals?: boolean;
    isToken?: boolean;
    symbol?: string;
};

const defaultOptions = {
    decimals: true,
    symbol: '$'
};

export const currencyValue = (inputNumber: BigNumber | string | number, options: OptionsType = defaultOptions) => {
    const { decimals, isToken, symbol } = options;

    if (!isToken) {
        return `${symbol || ''}${numericalValue(inputNumber, decimals)}`;
    }

    return `${numericalValue(inputNumber, decimals)}${symbol ? ` ${symbol}` : ''}`;
};
