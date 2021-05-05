import { CommunityDailyMetricsAttributes, ICommunity } from './types';
import { claimFrequencyToText } from '../helpers/claimFrequencytoText';
import { currencyValue } from '../helpers/currencyValues';
import { humanifyNumber } from '../helpers/humanifyNumber';
import { shortenAddress } from '../helpers/shortenAddress';
import BigNumber from 'bignumber.js';
import config from '../../config';
import countriesJson from '../constants/countries.json';

const { chainExplorer } = config;

const countries: { [key: string]: any } = countriesJson;

const getAllowencePerBeneficiary = (claimAmount: string | BigNumber, baseInterval: number) =>
    `${currencyValue(humanifyNumber(claimAmount))} / ${claimFrequencyToText(baseInterval.toString())}`;

const getClaimed = ({ claimed, raised }: { claimed: string | BigNumber; raised: string | number }) =>
    `${currencyValue(humanifyNumber(claimed))} (${new BigNumber(claimed)
        .dividedBy(raised)
        .multipliedBy(100)
        .decimalPlaces(0)
        .toString()}%)`;

const getComunityName = (city: string, country: string, name: string) => [
    name,
    `${city}, ${countries[country]?.name || ''} ${countries[country]?.emoji || ''}`
];

const getEstimatedUbiDuration = (metrics: CommunityDailyMetricsAttributes | undefined, getString: Function) =>
    !metrics ? '-' : `~${Math.floor(metrics?.estimatedDuration)} ${getString('months').toLowerCase()}`;

const getRaised = (
    { beneficiaries, raised }: { beneficiaries: number; raised: string | BigNumber },
    maxClaim: string | number
) =>
    `${currencyValue(humanifyNumber(raised))} / ${currencyValue(
        humanifyNumber(new BigNumber(maxClaim).multipliedBy(beneficiaries))
    )}`;

const getAddress = (address: string | null) =>
    address
        ? {
              href: chainExplorer.replace('{{address}}', address),
              label: shortenAddress(address)
          }
        : '';

const getUbiRatePerBeneficiary = (metrics: any, baseInterval: any) => {
    const rate = currencyValue(metrics?.ubiRate);
    const frequency = claimFrequencyToText(baseInterval.toString());

    return !metrics ? '-' : `~${rate} / ${frequency}`;
};

export const communitiesTable: { [key: string]: Function } = {
    getRows: (data: ICommunity[], getString: Function) => {
        return data.map(
            ({
                city,
                contractAddress,
                contract: { baseInterval, claimAmount, maxClaim },
                country,
                metrics,
                name,
                state
            }) => ({
                allowancePerBeneficiary: getAllowencePerBeneficiary(claimAmount, baseInterval),
                backers: state.backers,
                beneficiaries: state?.beneficiaries,
                claimed: getClaimed(state),
                communityName: getComunityName(city, country, name),
                estimatedUbiDuration: getEstimatedUbiDuration(metrics, getString),
                raised: getRaised(state, maxClaim),
                ssi: !metrics ? '-' : metrics?.ssi,
                ubiContract: getAddress(contractAddress),
                ubiRatePerBeneficiary: getUbiRatePerBeneficiary(metrics, baseInterval)
            })
        );
    }
};
