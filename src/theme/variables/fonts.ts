/* eslint-disable sort-keys */
const weights = {
    extrabold: 800,
    bold: 700,
    semibold: 600,
    medium: 500,
    regular: 400,
    light: 300
};

const families = {
    manrope: `'Manrope', sans-serif`,
    inter: `'Inter', sans-serif`
};

export const bodySizes = {
    subtitle1: [18, 28],
    subtitle2: [18, 28],

    lead1: [18, 32],
    lead2: [14, 24],

    body: [16, 32],
    small: [14, 22],
    XSmall: [12, 16],
    XXSmall: [10, 19],

    label1: [20, 30],
    label2: [14, 20],
    label3: [12, 16],

    badge: [20, 24]
};

export const headingSizes = {
    h1: { md: [48, 54], xs: [36, 45] },
    h2: [32, 42],
    h3: [24, 36],
    h4: [24, 36],
    h5: [15, 28],
    h6: [14, 22]
};

export const fonts = {
    families,
    weights
};
