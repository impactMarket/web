import { IGlobalDashboard } from './types';
import { currencyValue } from '../helpers/currencyValues';
import { humanifyNumber } from '../helpers/humanifyNumber';
import { numericalValue } from '../helpers/numericalValue';
import BigNumber from 'bignumber.js';

export const dashboard: { [key: string]: Function } = {
    getAvgCumulativeUbi: (data: IGlobalDashboard, getString: Function) => ({
        prefix: '~',
        suffix: `/${getString('beneficiary')}`,
        value: currencyValue(humanifyNumber(data?.monthly[0]?.avgComulativeUbi), false)
    }),

    getAvgUbiDuration: (data: IGlobalDashboard, getString: Function) => ({
        prefix: '~',
        suffix: `${getString('months')} / ${getString('beneficiary')}`,
        value: numericalValue(data?.monthly[0]?.avgUbiDuration.toString(), false)
    }),

    getBackers: (data: IGlobalDashboard) => ({
        value: numericalValue(data?.totalBackers?.toString())
    }),

    getBeneficiaries: (data: IGlobalDashboard) => ({
        value: numericalValue((data?.monthly[0]?.totalBeneficiaries + data?.today?.totalBeneficiaries).toString())
    }),

    getHelper: (helper: string, data: IGlobalDashboard, getString: Function): Function => {
        const method: string = `get${`${helper.charAt(0).toUpperCase()}${helper.slice(1)}`}`;

        const helperFunction: any = dashboard[method];

        if (!helperFunction || !data) {
            return () => {};
        }

        return helperFunction(data, getString);
    },

    getRatePerBacker: (data: IGlobalDashboard, getString: Function) => ({
        prefix: '~',
        suffix: `/${getString('day')}`,
        value: currencyValue(data?.monthly[0]?.givingRate.toString())
    }),

    getRatePerBeneficiary: (data: IGlobalDashboard, getString: Function) => ({
        prefix: '~',
        suffix: `/${getString('day')}`,
        value: currencyValue(data?.monthly[0]?.ubiRate.toString())
    }),

    getReach: (data: IGlobalDashboard) => ({
        value: numericalValue(data?.monthly[0]?.totalReach.toString())
    }),

    getSpendingRate: () => ({
        value: '- -'
    }),

    getTotalDistributed: (data: IGlobalDashboard) => ({
        suffix: 'cUSD',
        value: currencyValue(
            humanifyNumber(new BigNumber(data?.monthly[0]?.totalDistributed).plus(data?.today?.totalClaimed).toString())
        )
    }),

    getTotalRaised: (data: IGlobalDashboard) => ({
        suffix: 'cUsd',
        value: currencyValue(
            humanifyNumber(new BigNumber(data?.monthly[0]?.totalRaised).plus(data?.today?.totalRaised).toString())
        )
    }),

    getTotalVolume: (data: IGlobalDashboard) => ({
        suffix: 'cUsd',
        value: currencyValue(humanifyNumber(data?.monthly[0]?.totalVolume))
    }),

    getTransfers: (data: IGlobalDashboard) => ({
        value: numericalValue(data?.monthly[0]?.totalTransactions.toString())
    })
};
