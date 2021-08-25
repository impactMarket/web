import BigNumber from 'bignumber.js';

export const tokenifyNumber = (value: BigNumber | string) => new BigNumber(value).multipliedBy(10 ** 18).toString();
