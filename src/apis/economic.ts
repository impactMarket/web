import { IGlobalDashboard } from './types';
import { currencyValue } from '../helpers/currencyValue';
import { getChartDateValueTooltip } from '../helpers/getChartDateValueTooltip';
import { numericalValue } from '../helpers/numericalValue';

export const economic: { [key: string]: Function } = {
    reach: (data: IGlobalDashboard, t: Function) => ({
        chart: {
            data: data.daily
                .map(({ id, reach }) => ({ name: new Date(parseInt(id, 10) * 86400000).getTime(), uv: reach }))
                .reverse(),
            tooltip: (payload: any, label: any): string =>
                getChartDateValueTooltip(t('addressReachedOn'), payload, label)
        },
        growth: data.growth.reach,
        numeric: {
            value: numericalValue(Math.ceil(data.daily.reduce((result, { reach }) => result + reach, 0) / 30))
        }
    }),

    transfers: (data: IGlobalDashboard, t: Function) => ({
        chart: {
            data: data.daily
                .map(({ id, transactions }) => ({
                    name: new Date(parseInt(id, 10) * 86400000).getTime(),
                    uv: transactions
                }))
                .reverse(),
            tooltip: (payload: any, label: any): string => getChartDateValueTooltip(t('transactionsOn'), payload, label)
        },
        growth: data.growth.transactions,
        numeric: {
            value: numericalValue(data.daily.reduce((result, { transactions }) => result + transactions, 0))
        }
    }),

    volume: (data: IGlobalDashboard, t: Function) => ({
        chart: {
            data: data.daily
                .map(({ id, volume }) => ({
                    name: new Date(parseInt(id, 10) * 86400000).getTime(),
                    uv: Math.round(parseFloat(volume) * 100) / 100
                }))
                .reverse(),
            tooltip: (payload: any, label: any): string => getChartDateValueTooltip(t('transactedOn'), payload, label),
            type: 'bar'
        },
        growth: data.growth.volume,
        numeric: {
            suffix: 'cUSD',
            value: currencyValue(data.daily.reduce((result, { volume }) => result + parseFloat(volume), 0))
        }
    })
};
