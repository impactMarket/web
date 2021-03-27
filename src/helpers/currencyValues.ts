import { BigNumber } from 'bignumber.js';
import { numericalValue } from './numericalValue';

export const currencyValue = (inputNumber: BigNumber | string, decimals: boolean = true) =>
    `$${numericalValue(inputNumber, decimals)}`;
