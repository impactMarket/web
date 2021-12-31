import { ICommunity } from './types';
import { currencyValue } from '../helpers/currencyValue';
import { getChartDateValueTooltip } from '../helpers/getChartDateValueTooltip';
import { humanifyNumber } from '../helpers/humanifyNumber';
import { numericalValue } from '../helpers/numericalValue';
import BigNumber from 'bignumber.js';

export const communityDashboardDistribution: { [key: string]: Function } = {
    claimed: (community: ICommunity, t: Function) => ({
        chart: {
            data: community?.dashboard?.dailyState
                .map(({ date, claimed }: any) => ({
                    name: new Date(date).getTime(),
                    uv: parseFloat(humanifyNumber(claimed))
                }))
                .reverse(),
            tooltip: (payload: any, label: any): string => getChartDateValueTooltip(t('claimedOn'), payload, label),
            type: 'bar'
        },
        numeric: {
            suffix: 'cUsd',
            value: currencyValue(
                humanifyNumber(
                    community?.dashboard?.dailyState
                        .reduce((result, { claimed }) => result.plus(claimed), new BigNumber('0'))
                        .toString()
                )
            )
        }
    }),

    claims: (community: ICommunity, t: Function) => ({
        chart: {
            data: community?.dashboard?.dailyState
                .map(({ date, claims }) => ({ name: new Date(date).getTime(), uv: claims }))
                .reverse(),
            tooltip: (payload: any, label: any): string => getChartDateValueTooltip(t('claimsOn'), payload, label)
        },
        numeric: {
            value: numericalValue(
                community?.dashboard?.dailyState.reduce((result, { claims }) => result + claims, 0).toString()
            )
        }
    }),

    newBeneficiaries: (community: ICommunity, t: Function) => ({
        chart: {
            data: community?.dashboard?.dailyState
                .map(({ beneficiaries, date }) => ({ name: new Date(date).getTime(), uv: beneficiaries }))
                .reverse(),
            tooltip: (payload: any, label: any): string =>
                getChartDateValueTooltip(t('newBeneficiariesOn'), payload, label)
        },
        numeric: {
            value: numericalValue(
                community?.dashboard?.dailyState
                    .reduce((results, { beneficiaries }) => results + beneficiaries, 0)
                    .toString()
            )
        }
    })
};
