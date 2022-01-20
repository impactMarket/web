const extractFromData = (data: { [key: string]: any | any[] }, partial: string) =>
    Object.keys(data).reduce((result, key) => {
        const [, splitKey] = key.split(partial);

        return splitKey
            ? { ...result, [`${splitKey.charAt(0).toLowerCase()}${splitKey.slice(1)}`]: data[key] }
            : result;
    }, {});

export default extractFromData;
