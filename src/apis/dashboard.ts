import { IGlobalDashboard } from './types';
import { currencyValue } from '../helpers/currencyValue';
import { humanifyNumber } from '../helpers/humanifyNumber';
import { numericalValue } from '../helpers/numericalValue';

export const dashboard: { [key: string]: Function } = {
    getAvgCumulativeUbi: (data: IGlobalDashboard, t: Function) => ({
        prefix: '~',
        suffix: `/${t('beneficiary')}`,
        value: currencyValue(
            humanifyNumber(data?.monthly?.[0]?.avgComulativeUbi),
            { decimals: false, symbol: '$' }
        )
    }),

    getAvgUbiDuration: (data: IGlobalDashboard, t: Function) => ({
        prefix: '~',
        suffix: `${t('months')} / ${t('beneficiary')}`,
        value: numericalValue(
            data?.monthly?.[0]?.avgUbiDuration?.toString(),
            false
        )
    }),

    getBackers: (data: IGlobalDashboard) => ({
        value: numericalValue(data?.general?.contributors)
    }),

    getBeneficiaries: (data: IGlobalDashboard) => ({
        value: numericalValue(data?.general?.beneficiaries)
    }),

    getHelper: (
        helper: string,
        data: IGlobalDashboard,
        t: Function
    ): Function => {
        const method: string = `get${`${helper
            .charAt(0)
            .toUpperCase()}${helper.slice(1)}`}`;

        const helperFunction: any = dashboard[method];

        if (!helperFunction || !data) {
            return () => {};
        }

        return helperFunction(data, t);
    },

    getRatePerBacker: (data: IGlobalDashboard, t: Function) => ({
        prefix: '~',
        suffix: `/${t('day')}`,
        value: currencyValue(data?.monthly?.[0]?.givingRate?.toString())
    }),

    getRatePerBeneficiary: (data: IGlobalDashboard, t: Function) => ({
        prefix: '~',
        suffix: `/${t('day')}`,
        value: currencyValue(data?.monthly?.[0]?.ubiRate?.toString())
    }),

    getReach: (data: IGlobalDashboard) => ({
        value: numericalValue(data?.monthly?.[0]?.totalReach?.toString())
    }),

    getSpendingRate: () => ({
        value: '- -'
    }),

    getTotalDistributed: (data: IGlobalDashboard) => ({
        suffix: 'cUSD',
        value: currencyValue(data?.general?.claimed)
    }),

    getTotalRaised: (data: IGlobalDashboard) => ({
        suffix: 'cUSD',
        value: currencyValue(data?.general?.contributed)
    }),

    getTotalVolume: (data: IGlobalDashboard) => ({
        suffix: 'cUSD',
        value: currencyValue(data?.general?.volume)
    }),

    getTransfers: (data: IGlobalDashboard) => ({
        value: numericalValue(data?.general?.transactions)
    })
};
