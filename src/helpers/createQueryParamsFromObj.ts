export const createQueryParamsFromObj = (object: { [key: string]: any }, params: string[]) => {
    const paramsString = params
        .reduce((results, param) => {
            const value = object[param];

            if (!value) {
                return results;
            }

            return [...results, `&${param}=${value.toString()}`];
        }, [])
        .join('');

    return `?${paramsString}`;
};
