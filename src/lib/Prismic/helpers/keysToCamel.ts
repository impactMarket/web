import camelCase from 'lodash/camelCase';
import isArray from 'lodash/isArray';
import isPlainObject from 'lodash/isPlainObject';

const keysToCamel = (object: any | any[]) => {
    if (!isPlainObject(object) && !isArray(object)) {
        return object;
    }

    if (isPlainObject(object)) {
        const newObject = {} as { [key: string]: any | any[] };

        Object.keys(object).forEach(key => {
            newObject[camelCase(key)] = keysToCamel(object[key]);
        });

        return newObject;
    }

    return object.map((entry: any | any[]) => keysToCamel(entry));
};

export default keysToCamel;
