import { IGlobalDashboard } from './types';
import { currencyValue } from '../helpers/currencyValue';
import { getChartDateValueTooltip } from '../helpers/getChartDateValueTooltip';
import { humanifyNumber } from '../helpers/humanifyNumber';
import { numericalValue } from '../helpers/numericalValue';
import BigNumber from 'bignumber.js';

export const distribution: { [key: string]: Function } = {
    claimed: (data: IGlobalDashboard, t: Function) => ({
        chart: {
            data: data.monthly
                .map(({ date, claimed }) => ({
                    name: new Date(date).getTime(),
                    uv: parseFloat(humanifyNumber(claimed))
                }))
                .reverse(),
            tooltip: (payload: any, label: any): string => getChartDateValueTooltip(t('claimedOn'), payload, label),
            type: 'bar'
        },
        growth: data.growth.claimed,
        numeric: {
            suffix: 'cUsd',
            value: currencyValue(
                humanifyNumber(
                    data.monthly.reduce((result, { claimed }) => result.plus(claimed), new BigNumber('0')).toString()
                )
            )
        }
    }),

    claims: (data: IGlobalDashboard, t: Function) => ({
        chart: {
            data: data.monthly.map(({ date, claims }) => ({ name: new Date(date).getTime(), uv: claims })).reverse(),
            tooltip: (payload: any, label: any): string => getChartDateValueTooltip(t('claimsOn'), payload, label)
        },
        growth: data.growth.claims,
        numeric: {
            value: numericalValue(data.monthly.reduce((result, { claims }) => result + claims, 0).toString())
        }
    }),

    newBeneficiaries: (data: IGlobalDashboard, t: Function) => ({
        chart: {
            data: data.monthly
                .map(({ beneficiaries, date }) => ({ name: new Date(date).getTime(), uv: beneficiaries }))
                .reverse(),
            tooltip: (payload: any, label: any): string =>
                getChartDateValueTooltip(t('newBeneficiariesOn'), payload, label)
        },
        growth: data.growth.beneficiaries,
        numeric: {
            value: numericalValue(
                data.monthly.reduce((results, { beneficiaries }) => results + beneficiaries, 0).toString()
            )
        }
    })
};
