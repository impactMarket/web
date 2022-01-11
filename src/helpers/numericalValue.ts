import { BigNumber } from 'bignumber.js';

export const numericalValue = (inputNumber: BigNumber | number | string | Number, decimals: boolean = true) => {
    try {
        const value = Number(inputNumber).toLocaleString('en', { maximumFractionDigits: decimals ? 2 : 0 });

        if (typeof value !== 'string' && isNaN(+value)) {
            return;
        }

        return value;
    } catch (error) {
        console.log(error);

        return;
    }
};
