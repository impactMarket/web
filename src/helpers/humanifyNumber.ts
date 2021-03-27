import { BigNumber } from 'bignumber.js';
import config from '../../config';

export const humanifyNumber = (inputNumber: BigNumber | string): string => {
    const decimals = new BigNumber(10).pow(config.cUSDDecimals);

    return new BigNumber(inputNumber).div(decimals).decimalPlaces(2, 1).toString();
};
