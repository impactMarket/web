import { BigNumber } from 'bignumber.js';

export const numericalValue = (inputNumber: BigNumber | number | string, decimals: boolean = true) =>
    Number(inputNumber).toLocaleString('en', { maximumFractionDigits: decimals ? 2 : 0 });
