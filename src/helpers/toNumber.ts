import { BigNumber } from 'bignumber.js';

const toNumber = (value: any) => new BigNumber(value.toString()).dividedBy(new BigNumber(10).pow(18)).toNumber();

export default toNumber;
