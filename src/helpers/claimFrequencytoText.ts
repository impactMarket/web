import { BigNumber } from 'bignumber.js';

export const claimFrequencyToText = (frequency: BigNumber | string): string => {
    const f = new BigNumber(frequency);

    if (f.eq(86400)) {
        return 'day';
    }

    if (f.eq(604800)) {
        return 'week';
    }

    return 'unknown';
};
