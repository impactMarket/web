import { CommunityContractAttributes, CommunityStateAttributes, ICommunity } from './types';
import { claimFrequencyToText } from '../helpers/claimFrequencytoText';
import { currencyValue } from '../helpers/currencyValue';
import { humanifyNumber } from '../helpers/humanifyNumber';
import BigNumber from 'bignumber.js';

export const communityDashboardResume = {
    getClaimingValuePerFrequence: (contract: CommunityContractAttributes, t: Function) => {
        const value = currencyValue(humanifyNumber(contract?.claimAmount));
        const frequency = claimFrequencyToText(contract?.baseInterval.toString());

        return t('eachClaimingPerDay', { frequency, value });
    },

    getGoal: (community: ICommunity) => {
        const value = humanifyNumber(
            new BigNumber(community?.contract?.maxClaim).multipliedBy(community?.state?.beneficiaries)
        );

        if (!value || value === '0') {
            return '--';
        }

        return currencyValue(value);
    },

    getGoalProgress: (community: ICommunity, symbol?: string) => {
        const raised = humanifyNumber(community?.state?.raised);
        const goal = humanifyNumber(
            new BigNumber(community?.contract?.maxClaim).multipliedBy(community?.state?.beneficiaries)
        );

        const result = new BigNumber(raised).dividedBy(goal).multipliedBy(100).decimalPlaces(0).toString();

        return `${result === 'Infinity' ? 0 : result}${symbol || ''}`;
    },

    getRaised: (state: CommunityStateAttributes) => currencyValue(humanifyNumber(state?.raised))
};
