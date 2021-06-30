export const bracked = (str: string, vars: any = {}) => {
    if (!vars || !str) {
        return str;
    }

    return Object.keys(vars).reduce((result, key) => {
        if (!vars[key]) {
            return result;
        }

        const replacePattern = new RegExp(`{({|%)( |)${key}( |)(%|})}`);

        const newPattern = result.replace(replacePattern, `___${key}___`);

        return newPattern.replace(`___${key}___`, vars[key]);
    }, str);
};
