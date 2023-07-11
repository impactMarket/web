import { IDemographics } from './types';
import chunk from 'lodash/chunk';
import countriesJSON from '../constants/countries.json';
import sortBy from 'lodash/sortBy';

interface IDataItem {
    label: string;
    value: number;
}
interface ICountryItem {
    country: string;
    female: number;
    male: number;
    total: number;
    undisclosed: number;
}

const countries: {
    [key: string]: {
        name: string;
        native: string;
        phone: string;
        currency: string;
        languages: string[];
        emoji: string;
    };
} = countriesJSON;

export const getDemographicsAgeRange = (
    data: IDemographics[] | undefined
): IDataItem[] => {
    if (!data || !data.length) {
        return [];
    }

    let total = 0;

    const ageItems = [...new Array(6)];

    const ranges = ageItems.map((_, index: number) => {
        const value = data.reduce((result, countryData: any) => {
            const rangeValue = countryData[`ageRange${index + 1}`] || 0;

            return result + rangeValue;
        }, 0);

        total += value;

        const label =
            index + 1 < ageItems.length
                ? `${index ? (index + 1) * 10 + 5 : 18}-${(index + 2) * 10 + 4}`
                : '65+';

        return { label, value };
    });

    return ranges.map(({ value, ...rest }) => ({
        ...rest,
        percentage: +((value / total) * 100).toFixed(),
        value
    }));
};

export const getDemographicsByCountry = (
    data: any[] | undefined,
    chunkSize = 6
): ICountryItem[][] => {
    if (!data || !data.length) {
        return [];
    }

    const result = data.map(
        ({ country: countryCode, female, male, totalGender, undisclosed }) => {
            const country = countries[countryCode]?.name;

            const totalMF = male + female;
            const nMale = (male / totalMF) * totalGender;
            const nFemale = (female / totalMF) * totalGender;

            return {
                country,
                female: totalMF === 0 ? 0 : nFemale,
                male: totalMF === 0 ? 0 : nMale,
                total: totalGender,
                undisclosed
            };
        }
    );

    const chunks = chunk(sortBy(result, ['total']).reverse(), chunkSize);

    chunks[chunks.length - 1] = [
        ...chunks[chunks.length - 1],
        ...new Array(chunkSize - chunks[chunks.length - 1].length).map(() => ({
            country: '',
            female: 0,
            male: 0,
            total: 0,
            undisclosed: 0
        }))
    ];

    return chunks;
};

export const getDemographicsTotalPercentage = (
    data: any[] | undefined
): number => {
    if (!data || data.length === 0) {
        return 0; // or any other default value that makes sense in your context
    }

    const { total, totalFromGender } = data?.reduce(
        (result, { female, male, totalGender }) => ({
            total: result.total + totalGender,
            totalFromGender: result.totalFromGender + female + male
        }),
        { total: 0, totalFromGender: 0 }
    );

    const percentage = +((totalFromGender / total) * 100).toFixed();

    return percentage;
};
