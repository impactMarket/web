import { CommunityContractAttributes, CommunityStateAttributes, ICommunity } from './types';
import { currencyValue } from '../helpers/currencyValue';
import { frequencyToText } from '@impact-market/utils';
import { humanifyNumber } from '../helpers/humanifyNumber';
import BigNumber from 'bignumber.js';

export const communityDashboardResume = {
    getClaimingValuePerFrequence: (contract: CommunityContractAttributes, t: Function) => {
        const value = currencyValue(humanifyNumber(contract?.claimAmount));
        const frequency = frequencyToText(contract?.baseInterval);

        if (frequency === 'unknown') {
            return '';
        }

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

    getGoalProgress: (_community: ICommunity, _symbol?: string) => {
        return 0;
    },

    getRaised: (state: CommunityStateAttributes) => currencyValue(humanifyNumber(state?.contributed))
};
