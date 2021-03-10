/*
 * styled-gen generator
 * https://github.com/psoaresbj/styled-gen/tree/master/src/generator
 */
import { alignments } from './alignments';
import { colors } from './colors';
import { fonts } from './fonts';

/* eslint-disable sort-keys */
export const generator = {
    // Named props
    namedProps: [
        { list: colors, cssProp: 'color' },
        { list: fonts.weights, cssProp: 'font-weight' }
    ],

    // Space props
    spaceProps: [
        { prop: 'margin', units: 'rem' },
        { prop: 'padding', units: 'rem' }
    ],

    // Variable props
    variableProps: [
        { name: 'sBackground', list: colors, cssProp: 'background-color' },
        { name: 'sColor', list: colors, cssProp: 'color' },
        { name: 'sHeight', cssProp: 'height', units: 'rem' },
        { name: 'sFontWeight', list: fonts.weights, cssProp: 'font-weight' },
        { name: 'sTextAlign', list: alignments, cssProp: 'text-align' },
        { name: 'sWidth', cssProp: 'width', units: 'rem' }
    ]
} as const;
