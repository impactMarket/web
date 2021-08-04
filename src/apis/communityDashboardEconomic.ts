import { ICommunity } from './types';
import { currencyValue } from '../helpers/currencyValues';
import { getChartDateValueTooltip } from '../helpers/getChartDateValueTooltip';
import { humanifyNumber } from '../helpers/humanifyNumber';
import { numericalValue } from '../helpers/numericalValue';
import BigNumber from 'bignumber.js';

export const communityDashboardEconomic: { [key: string]: Function } = {
    reach: (community: ICommunity, t: Function) => ({
        chart: {
            data: community?.dashboard?.dailyState
                .map(({ date, reach }) => ({ name: new Date(date).getTime(), uv: reach }))
                .reverse(),
            tooltip: (payload: any, label: any): string =>
                getChartDateValueTooltip(t('addressReachedOn'), payload, label)
        },
        numeric: {
            value: numericalValue((community?.dashboard?.reachedLastMonth?.reach || 0).toString())
        }
    }),

    transfers: (community: ICommunity, t: Function) => ({
        chart: {
            data: community?.dashboard?.dailyState
                .map(({ date, transactions }) => ({ name: new Date(date).getTime(), uv: transactions }))
                .reverse(),
            tooltip: (payload: any, label: any): string => getChartDateValueTooltip(t('transactionsOn'), payload, label)
        },
        numeric: {
            value: numericalValue(
                community?.dashboard?.dailyState
                    .reduce((result, { transactions }) => result + transactions, 0)
                    .toString()
            )
        }
    }),

    volume: (community: ICommunity, t: Function) => ({
        chart: {
            data: community?.dashboard?.dailyState
                .map(({ date, volume }) => ({
                    name: new Date(date).getTime(),
                    uv: parseFloat(humanifyNumber(volume))
                }))
                .reverse(),
            tooltip: (payload: any, label: any): string => getChartDateValueTooltip(t('transactedOn'), payload, label),
            type: 'bar'
        },
        numeric: {
            suffix: 'cUsd',
            value: currencyValue(
                humanifyNumber(
                    community?.dashboard?.dailyState
                        .reduce((result, { volume }) => result.plus(volume), new BigNumber('0'))
                        .toString()
                )
            )
        }
    })
};
