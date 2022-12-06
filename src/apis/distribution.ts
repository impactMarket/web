import { IGlobalDashboard } from './types';
import { currencyValue } from '../helpers/currencyValue';
import { getChartDateValueTooltip } from '../helpers/getChartDateValueTooltip';
import { numericalValue } from '../helpers/numericalValue';

export const distribution: { [key: string]: Function } = {
    claimed: (data: IGlobalDashboard, t: Function) => ({
        chart: {
            data: data.daily
                .map(({ id, claimed }: any) => ({
                    name: new Date(parseInt(id, 10) * 86400000).getTime(),
                    uv: Math.round(claimed * 100) / 100
                }))
                .reverse(),
            tooltip: (payload: any, label: any): string => getChartDateValueTooltip(t('claimedOn'), payload, label),
            type: 'bar'
        },
        growth: data.growth.claimed,
        numeric: {
            suffix: 'cUSD',
            value: currencyValue(data.daily.reduce((result, { claimed }) => result + parseFloat(claimed), 0).toString())
        }
    }),

    claims: (data: IGlobalDashboard, t: Function) => ({
        chart: {
            data: data.daily
                .map(({ id, claims }: any) => ({ name: new Date(parseInt(id, 10) * 86400000).getTime(), uv: claims }))
                .reverse(),
            tooltip: (payload: any, label: any): string => getChartDateValueTooltip(t('claimsOn'), payload, label)
        },
        growth: data.growth.claims,
        numeric: {
            value: numericalValue(data.daily.reduce((result, { claims }) => result + claims, 0).toString())
        }
    }),

    newBeneficiaries: (data: IGlobalDashboard, t: Function) => ({
        chart: {
            data: data.daily
                .map(({ beneficiaries, id }) => ({
                    name: new Date(parseInt(id, 10) * 86400000).getTime(),
                    uv: beneficiaries
                }))
                .reverse(),
            tooltip: (payload: any, label: any): string =>
                getChartDateValueTooltip(t('newBeneficiariesOn'), payload, label)
        },
        growth: data.growth.beneficiaries,
        numeric: {
            value: numericalValue(
                data.daily.reduce((results, { beneficiaries }) => results + beneficiaries, 0).toString()
            )
        }
    })
};
