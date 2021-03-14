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
    sans: `'Inter', sans-serif`
};

// [size, lineHeight, letterSpacing]
const sizes = {
    h1: [48, 54],
    h2: [48, 54],
    h3: [40, 54],
    h4: [28, 40],
    h5: [24, 32],
    h6: [20, 30],

    subtitle1: [18, 28],
    subtitle2: [18, 28],

    lead1: [18, 32],
    lead2: [14, 24],

    body: [16, 26],
    small: [14, 22],
    XXSmall: [12, 16, 0],

    label1: [20, 30],
    label2: [14, 20],
    label3: [12, 16],

    badge: [20, 24]
};

export const fonts = {
    families,
    sizes,
    weights
};
