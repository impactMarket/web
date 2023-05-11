import { IGlobalDashboard } from './types';
import { currencyValue } from '../helpers/currencyValue';
import { getChartDateValueTooltip } from '../helpers/getChartDateValueTooltip';
import { numericalValue } from '../helpers/numericalValue';

export const fundraising: { [key: string]: Function } = {
    backers: (data: IGlobalDashboard, t: Function) => ({
        chart: {
            data: data.daily
                .map(({ id, contributors }) => ({
                    name: new Date(parseInt(id, 10) * 86400).getTime(),
                    uv: contributors
                }))
                .reverse(),
            tooltip: (payload: any, label: any): string =>
                getChartDateValueTooltip(t('monthlyActiveBackers'), payload, label)
        },
        growth: data.growth.backers,
        numeric: {
            value: numericalValue(data.daily[0].contributors.toString())
        }
    }),

    fundingRate: (data: IGlobalDashboard, t: Function) => ({
        chart: {
            data: data.daily
                .map(({ id, fundingRate }) => ({
                    name: new Date(parseInt(id, 10) * 86400).getTime(),
                    uv: Math.round(parseFloat(fundingRate) * 100) / 100
                }))
                .reverse(),
            tooltip: (payload: any, label: any): string => getChartDateValueTooltip(t('fundingRateOn'), payload, label)
        },
        growth: data.growth.fundingRate,
        numeric: {
            suffix: '%',
            value: Math.round(parseFloat(data.daily[0].fundingRate) * 100) / 100
        }
    }),

    raised: (data: IGlobalDashboard, t: Function) => ({
        chart: {
            data: data.daily
                .map(({ id, contributed }) => ({
                    name: new Date(parseInt(id, 10) * 86400000).getTime(),
                    uv: Math.round(parseFloat(contributed) * 100) / 100
                }))
                .reverse(),
            tooltip: (payload: any, label: any): string => getChartDateValueTooltip(t('raisedOn'), payload, label),
            type: 'bar'
        },
        growth: data.growth.raised,
        numeric: {
            suffix: 'cUSD',
            value: currencyValue(
                data.daily.reduce((results, { contributed }) => results + parseFloat(contributed), 0).toString()
            )
        }
    })
};
