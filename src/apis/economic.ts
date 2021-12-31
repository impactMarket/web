import { IGlobalDashboard } from './types';
import { currencyValue } from '../helpers/currencyValue';
import { getChartDateValueTooltip } from '../helpers/getChartDateValueTooltip';
import { humanifyNumber } from '../helpers/humanifyNumber';
import { numericalValue } from '../helpers/numericalValue';
import BigNumber from 'bignumber.js';

export const economic: { [key: string]: Function } = {
    reach: (data: IGlobalDashboard, t: Function) => ({
        chart: {
            data: data.monthly.map(({ date, reach }) => ({ name: new Date(date).getTime(), uv: reach })).reverse(),
            tooltip: (payload: any, label: any): string =>
                getChartDateValueTooltip(t('addressReachedOn'), payload, label)
        },
        growth: data.growth.reach,
        numeric: {
            value: numericalValue(data.reachedLastMonth.reach.toString())
        }
    }),

    transfers: (data: IGlobalDashboard, t: Function) => ({
        chart: {
            data: data.monthly
                .map(({ date, transactions }) => ({ name: new Date(date).getTime(), uv: transactions }))
                .reverse(),
            tooltip: (payload: any, label: any): string => getChartDateValueTooltip(t('transactionsOn'), payload, label)
        },
        growth: data.growth.transactions,
        numeric: {
            value: numericalValue(
                data.monthly.reduce((result, { transactions }) => result + transactions, 0).toString()
            )
        }
    }),

    volume: (data: IGlobalDashboard, t: Function) => ({
        chart: {
            data: data.monthly
                .map(({ date, volume }) => ({
                    name: new Date(date).getTime(),
                    uv: parseFloat(humanifyNumber(volume))
                }))
                .reverse(),
            tooltip: (payload: any, label: any): string => getChartDateValueTooltip(t('transactedOn'), payload, label),
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
    })
};
