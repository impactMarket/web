import countriesJSON from '../src/assets/countries.json';

const countries: {
    [key: string]: {
        name: string;
        native: string;
        currency: string;
        languages: string[];
        emoji: string;
    };
} = countriesJSON;

export function getCountryNameFromInitials(countryInitials: string) {
    if (countries[countryInitials]) {
        return countries[countryInitials].name;
    }

    return 'Unknown';
}
