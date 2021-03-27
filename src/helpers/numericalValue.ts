import { BigNumber } from 'bignumber.js';

export const numericalValue = (inputNumber: BigNumber | string, decimals: boolean = true) =>
    Number(inputNumber).toLocaleString('en', { maximumFractionDigits: decimals ? 2 : 0 });
