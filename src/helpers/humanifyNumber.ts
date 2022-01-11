import { BigNumber } from 'bignumber.js';
import config from '../../config';

export const humanifyNumber = (inputNumber: BigNumber | string): string => {
    try {
        const decimals = new BigNumber(10).pow(config.cUSDDecimals);

        const value = new BigNumber(inputNumber).div(decimals).decimalPlaces(2, 1).toString();

        if (typeof value !== 'string' && isNaN(+value)) {
            return;
        }

        return value;
    } catch (error) {
        console.log(error);

        return;
    }
};
