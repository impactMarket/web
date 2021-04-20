import { CommunityContractAttributes, CommunityStateAttributes, ICommunity } from './types';
import { claimFrequencyToText } from '../helpers/claimFrequencytoText';
import { currencyValue } from '../helpers/currencyValues';
import { humanifyNumber } from '../helpers/humanifyNumber';
import BigNumber from 'bignumber.js';

export const communityDashboardResume = {
    getClaimingValuePerFrequence: (contract: CommunityContractAttributes, getString: Function) => {
        const value = currencyValue(humanifyNumber(contract?.claimAmount));
        const frequency = claimFrequencyToText(contract?.baseInterval.toString());

        return getString('eachClaimingPerDay', { frequency, value });
    },

    getGoal: (community: ICommunity) =>
        currencyValue(
            humanifyNumber(new BigNumber(community?.contract?.maxClaim).multipliedBy(community?.state?.beneficiaries))
        ),

    getGoalProgress: (community: ICommunity) => {
        const raised = humanifyNumber(community?.state?.raised);
        const goal = humanifyNumber(
            new BigNumber(community?.contract?.maxClaim).multipliedBy(community?.state?.beneficiaries)
        );

        return new BigNumber(raised).dividedBy(goal).multipliedBy(100).decimalPlaces(0).toString();
    },

    getRaised: (state: CommunityStateAttributes) => currencyValue(humanifyNumber(state?.raised))
};
