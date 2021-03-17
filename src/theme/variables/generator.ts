/*
 * styled-gen generator
 * https://github.com/psoaresbj/styled-gen/tree/master/src/generator
 */
import { alignments } from './alignments';
import { colors } from './colors';
import { display } from './display';
import { flexAlignments } from './flexAlignments';
import { flexDirection } from './flexDirection';
import { fonts } from './fonts';

/* eslint-disable sort-keys */
export const generator = {
    // Named props
    namedProps: [
        { list: alignments, cssProp: 'text-align' },
        { list: colors, cssProp: 'color' },
        { list: display, cssProp: 'display' },
        { list: flexDirection, cssProp: 'flex-direction' },
        { list: fonts.weights, cssProp: 'font-weight' }
    ],

    // Space props
    spaceProps: [
        { prop: 'margin', units: 'rem' },
        { prop: 'padding', units: 'rem' }
    ],

    // Variable props
    variableProps: [
        { name: 'sAlignItems', list: flexAlignments.alignItemsAligments, cssProp: 'align-items' },
        { name: 'sBackground', list: colors, cssProp: 'background-color' },
        { name: 'sColor', list: colors, cssProp: 'color' },
        { name: 'sDisplay', list: display, cssProp: 'display' },
        { name: 'sFontWeight', list: fonts.weights, cssProp: 'font-weight' },
        { name: 'sFlexDirection', list: flexDirection, cssProp: 'flex-direction' },
        { name: 'sHeight', cssProp: 'height', units: 'rem' },
        { name: 'sJustifyContent', list: flexAlignments.justifyContentAlignments, cssProp: 'justify-content' },
        { name: 'sMaxWidth', cssProp: 'max-width', units: 'rem' },
        { name: 'sTextAlign', list: alignments, cssProp: 'text-align' },
        { name: 'sWidth', cssProp: 'width', units: 'rem' }
    ]
} as const;
