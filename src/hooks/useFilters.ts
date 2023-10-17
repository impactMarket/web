import { useRouter } from 'next/router';
import isObject from 'lodash/isObject';

const useFilters = () => {
    const { pathname, push, query } = useRouter();

    const callback = (query: any) =>
        push({ pathname, query }, undefined, {
            shallow: true
        });

    /**
     * Clear one or more fields
     * @param {string | string[]} keys Name of the field
     * @returns {boolean} just returns the callback (push function result)
     */
    const clear = (keys: string | string[]) => {
        const shallowQuery = { ...query };
        const arrKeys = Array.isArray(keys) ? keys : [keys];

        arrKeys.forEach((key: string) => delete shallowQuery?.[key]);

        return callback(shallowQuery);
    };

    /**
     * Check if a field or an array of fields matches
     * @param {string} key Name of the field
     * @param {string | string[]} value Content or multiple content as array
     * @returns {boolean} Returns boolean
     */
    const isSelected = (key: string, value: string | string[] | number) => {
        if (Array.isArray(query?.[key])) {
            const arr = query?.[key] as string[];

            return Array.isArray(value)
                ? value.reduce(
                      (result, current) =>
                          result ? arr.includes(current?.toString()) : result,
                      true
                  )
                : !!arr.includes(value as any);
        }

        return query?.[key] === value;
    };

    /**
     * Return all values from a given key
     * @param {string} key Name of the field
     * @returns {string | string[] | number | number[]} Returns single or multiple selected values
     */
    const getByKey = (key: string) => query?.[key];

    /**
     * Return all values from a given key
     * @returns {string[]} Returns multiple selected values
     */
    const getAllQueryParams = () => query;

    /**
     * Updates the url parameters
     * @param {string | Object} nameOrObject A string as key or an object to append to the query
     * @param {string | string[]} value A value to add to url parameters
     * @returns {Callback} just returns the callback (push function result)
     */
    const update = (
        nameOrObject: string | Object,
        value?: string | string[] | number | number[]
    ) => {
        const shallowQuery = { ...query };

        if (isObject(nameOrObject)) {
            return callback({ ...shallowQuery, ...nameOrObject });
        }

        const queryExtra = {
            ...shallowQuery,
            [nameOrObject]: value
        };

        if (
            !queryExtra?.[nameOrObject]?.toString() ||
            !value?.toString()?.length
        ) {
            delete queryExtra?.[nameOrObject];
        }

        return callback(queryExtra);
    };

    return { clear, getAllQueryParams, getByKey, isSelected, update };
};

export default useFilters;
