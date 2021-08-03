const deafaultDivider = ';';

export const multipleItemString = {
    parse: (string: string, divider = deafaultDivider) => string?.split(divider),
    stringify: (string: string[], divider = deafaultDivider) => string?.join(divider)
};
