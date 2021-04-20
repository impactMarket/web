import { ICommunity } from './types';
import { currencyValue } from '../helpers/currencyValues';
import { getChartDateValueTooltip } from '../helpers/getChartDateValueTooltip';
import { humanifyNumber } from '../helpers/humanifyNumber';
import { numericalValue } from '../helpers/numericalValue';
import BigNumber from 'bignumber.js';

export const communityDashboardFundraising: { [key: string]: Function } = {
    backers: (community: ICommunity, getString: Function) => ({
        chart: {
            data: community?.dashboard?.dailyState
                .map(({ backers, date }) => ({ name: new Date(date).getTime(), uv: backers }))
                .reverse(),
            tooltip: (payload: any, label: any): string =>
                getChartDateValueTooltip(getString('monthlyActiveBackers'), payload, label)
        },
        numeric: {
            value: numericalValue(community?.dashboard?.dailyState[0].backers.toString())
        }
    }),

    fundingRate: (community: ICommunity, getString: Function) => ({
        chart: {
            data: community?.dashboard?.dailyState
                .map(({ date, fundingRate }) => ({ name: new Date(date).getTime(), uv: fundingRate }))
                .reverse(),
            tooltip: (payload: any, label: any): string =>
                getChartDateValueTooltip(getString('fundingRateOn'), payload, label)
        },
        numeric: {
            suffix: '%',
            value: community?.dashboard?.dailyState[0].fundingRate.toString()
        }
    }),

    raised: (community: ICommunity, getString: Function) => ({
        chart: {
            data: community?.dashboard?.dailyState
                .map(({ date, raised }) => ({
                    name: new Date(date).getTime(),
                    uv: parseFloat(humanifyNumber(raised))
                }))
                .reverse(),
            tooltip: (payload: any, label: any): string =>
                getChartDateValueTooltip(getString('raisedOn'), payload, label),
            type: 'bar'
        },
        numeric: {
            suffix: 'cUsd',
            value: currencyValue(
                humanifyNumber(
                    community?.dashboard?.dailyState
                        .reduce((results, { raised }) => results.plus(raised), new BigNumber('0'))
                        .toString()
                )
            )
        }
    })
};
