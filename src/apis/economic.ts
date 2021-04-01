import { IGlobalDashboard } from './types';
import { bracked } from '../helpers/bracked';
import { currencyValue } from '../helpers/currencyValues';
import { humanifyNumber } from '../helpers/humanifyNumber';
import { numericalValue } from '../helpers/numericalValue';
import BigNumber from 'bignumber.js';
import moment from 'moment';

const getTooltip = (tooltip: string, payload: any, label: any) => {
    // eslint-disable-next-line radix
    const date = moment(parseInt(label!)).format('MMMM Do');
    const value = payload[0]?.value || '--';

    return bracked(tooltip, { date, value });
};

export const economic: { [key: string]: Function } = {
    reach: (data: IGlobalDashboard, getString: Function) => {
        return {
            chart: {
                data: data.monthly.map(({ date, reach }) => ({ name: new Date(date).getTime(), uv: reach })).reverse(),
                tooltip: (payload: any, label: any): string => getTooltip(getString('addressReachedOn'), payload, label)
            },
            growth: data.growth.reach,
            numeric: {
                value: numericalValue(data.reachedLastMonth.reach.toString())
            }
        };
    },
    transfers: (data: IGlobalDashboard, getString: Function) => {
        return {
            chart: {
                data: data.monthly
                    .map(({ date, transactions }) => ({ name: new Date(date).getTime(), uv: transactions }))
                    .reverse(),
                tooltip: (payload: any, label: any): string => getTooltip(getString('transactionsOn'), payload, label)
            },
            growth: data.growth.transactions,
            numeric: {
                value: numericalValue(
                    data.monthly.reduce((result, { transactions }) => result + transactions, 0).toString()
                )
            }
        };
    },
    volume: (data: IGlobalDashboard, getString: Function) => {
        return {
            chart: {
                data: data.monthly
                    .map(({ date, volume }) => ({
                        name: new Date(date).getTime(),
                        uv: parseFloat(humanifyNumber(volume))
                    }))
                    .reverse(),
                tooltip: (payload: any, label: any): string => getTooltip(getString('transactedOn'), payload, label),
                type: 'bar'
            },
            growth: data.growth.volume,
            numeric: {
                suffix: 'cUsd',
                value: currencyValue(
                    humanifyNumber(
                        data.monthly.reduce((result, { volume }) => result.plus(volume), new BigNumber('0')).toString()
                    )
                )
            }
        };
    }
};
