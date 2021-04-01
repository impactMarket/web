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

export const fundraising: { [key: string]: Function } = {
    backers: (data: IGlobalDashboard, getString: Function) => {
        return {
            chart: {
                data: data.monthly
                    .map(({ backers, date }) => ({ name: new Date(date).getTime(), uv: backers }))
                    .reverse(),
                tooltip: (payload: any, label: any): string =>
                    getTooltip(getString('monthlyActiveBackers'), payload, label)
            },
            growth: data.growth.backers,
            numeric: {
                value: numericalValue(data.monthly[0].backers.toString())
            }
        };
    },
    fundingRate: (data: IGlobalDashboard, getString: Function) => {
        return {
            chart: {
                data: data.monthly
                    .map(({ date, fundingRate }) => ({ name: new Date(date).getTime(), uv: fundingRate }))
                    .reverse(),
                tooltip: (payload: any, label: any): string => getTooltip(getString('fundingRateOn'), payload, label)
            },
            growth: data.growth.fundingRate,
            numeric: {
                suffix: '%',
                value: data.monthly[0].fundingRate.toString()
            }
        };
    },
    raised: (data: IGlobalDashboard, getString: Function) => {
        return {
            chart: {
                data: data.monthly
                    .map(({ date, raised }) => ({
                        name: new Date(date).getTime(),
                        uv: parseFloat(humanifyNumber(raised))
                    }))
                    .reverse(),
                tooltip: (payload: any, label: any): string => getTooltip(getString('raisedOn'), payload, label),
                type: 'bar'
            },
            growth: data.growth.raised,
            numeric: {
                suffix: 'cUsd',
                value: currencyValue(
                    humanifyNumber(
                        data.monthly
                            .reduce((results, { raised }) => results.plus(raised), new BigNumber('0'))
                            .toString()
                    )
                )
            }
        };
    }
};
