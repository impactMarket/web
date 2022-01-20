import camelCase from 'lodash/camelCase';

const snakeToCamel = (string: string, remove?: string) => {
    const value = remove ? string.replace(remove, '') : string;

    return camelCase(value);
};

export default snakeToCamel;
