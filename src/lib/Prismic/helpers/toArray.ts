const toArray = (value: any[] | any) => {
    if (Array.isArray(value)) {
        return value;
    }

    return [value];
};

export default toArray;
