import { BigNumber } from 'bignumber.js';

export const numericalValue = (
    inputNumber: BigNumber | number | string | Number,
    decimals: boolean = true,
    fixed: number = 2
) => {
    try {
        const value = Number(inputNumber).toLocaleString('en', { maximumFractionDigits: decimals ? fixed : 0 });

        if (typeof value !== 'string' && isNaN(+value)) {
            return;
        }

        return value;
    } catch (error) {
        console.log(error);

        return;
    }
};
