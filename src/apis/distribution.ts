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

export const distribution: { [key: string]: Function } = {
    claimed: (data: IGlobalDashboard, getString: Function) => {
        return {
            chart: {
                data: data.monthly
                    .map(({ date, claimed }) => ({
                        name: new Date(date).getTime(),
                        uv: parseFloat(humanifyNumber(claimed))
                    }))
                    .reverse(),
                tooltip: (payload: any, label: any): string => getTooltip(getString('claimedOn'), payload, label),
                type: 'bar'
            },
            growth: data.growth.claimed,
            numeric: {
                suffix: 'cUsd',
                value: currencyValue(
                    humanifyNumber(
                        data.monthly
                            .reduce((result, { claimed }) => result.plus(claimed), new BigNumber('0'))
                            .toString()
                    )
                )
            }
        };
    },

    claims: (data: IGlobalDashboard, getString: Function) => {
        return {
            chart: {
                data: data.monthly
                    .map(({ date, claims }) => ({ name: new Date(date).getTime(), uv: claims }))
                    .reverse(),
                tooltip: (payload: any, label: any): string => getTooltip(getString('claimsOn'), payload, label)
            },
            growth: data.growth.claims,
            numeric: {
                value: numericalValue(data.monthly.reduce((result, { claims }) => result + claims, 0).toString())
            }
        };
    },

    newBeneficiaries: (data: IGlobalDashboard, getString: Function) => {
        return {
            chart: {
                data: data.monthly
                    .map(({ beneficiaries, date }) => ({ name: new Date(date).getTime(), uv: beneficiaries }))
                    .reverse(),
                tooltip: (payload: any, label: any): string =>
                    getTooltip(getString('newBeneficiariesOn'), payload, label)
            },
            growth: data.growth.beneficiaries,
            numeric: {
                value: numericalValue(
                    data.monthly.reduce((results, { beneficiaries }) => results + beneficiaries, 0).toString()
                )
            }
        };
    }
};
