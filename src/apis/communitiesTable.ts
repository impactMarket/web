import { ICommunity } from './types';
import { currencyValue } from '../helpers/currencyValue';
import { frequencyToText } from '@impact-market/utils';
import { shortenAddress } from '../helpers/shortenAddress';
import config from '../../config';
import countriesJson from '../constants/countries.json';

const { chainExplorer } = config;

const countries: { [key: string]: any } = countriesJson;

const getAllowencePerBeneficiary = (claimAmount: number, baseInterval: number) =>
    `${currencyValue(claimAmount)} / ${frequencyToText(baseInterval)}`;

const getComunityName = (city: string, country: string, name: string, id: string | number) => [
    { href: `https://app.impactmarket.com/communities/${id}`, label: name },
    `${city}, ${countries[country]?.name || ''} ${countries[country]?.emoji || ''}`
];

const getEstimatedUbiDuration = (estimatedDuration: number | undefined, t: Function) =>
    estimatedDuration === undefined ? '-' : `~${Math.floor(estimatedDuration)} ${t('months').toLowerCase()}`;

const getRaised = (beneficiaries: number, contributed: number, maxClaim: number) =>
    `${currencyValue(contributed)} / ${currencyValue(maxClaim * beneficiaries)}`;

const getAddress = (address: string | null) =>
    address
        ? {
              href: chainExplorer.replace('{{address}}', address),
              label: shortenAddress(address)
          }
        : '';

const getUbiRatePerBeneficiary = (ubiRate: number | undefined, baseInterval: any) => {
    const rate = currencyValue(ubiRate || 0);
    const frequency = frequencyToText(baseInterval);

    return ubiRate === undefined ? '-' : `~${rate} / ${frequency}`;
};

export const communitiesTable: { [key: string]: Function } = {
    getRows: (data: ICommunity[], t: Function) => {
        return data.map(({ city, contractAddress, country, id, name, state }) => ({
            allowancePerBeneficiary: getAllowencePerBeneficiary(parseFloat(state.claimAmount), state.baseInterval),
            backers: state.contributors,
            beneficiaries: state?.beneficiaries,
            claimed: currencyValue(state.claimed),
            communityName: getComunityName(city, country, name, id),
            estimatedUbiDuration: getEstimatedUbiDuration(state.estimatedDuration, t),
            raised: getRaised(state.beneficiaries, parseFloat(state.contributed), parseFloat(state.maxClaim)),
            ubiContract: getAddress(contractAddress),
            ubiRatePerBeneficiary: getUbiRatePerBeneficiary(state.ubiRate, state.baseInterval)
        }));
    }
};
