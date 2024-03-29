/*
 * styled-gen generator
 * https://github.com/psoaresbj/styled-gen/tree/master/src/generator
 */
import { alignments } from './alignments';
import { colors } from './colors';
import { display } from './display';
import { flexAlignments } from './flexAlignments';
import { flexDirection } from './flexDirection';
import { fontSize } from '../helpers/fontSize';
import { fonts } from './fonts';
import { padding } from 'polished';

/* eslint-disable sort-keys */
export const generator = {
    // Named props
    namedProps: [
        { list: { relative: 'relative' }, cssProp: 'position' },
        { list: { uppercase: 'uppercase' }, cssProp: 'text-transform' },
        { list: alignments, cssProp: 'text-align' },
        { list: colors, cssProp: 'color' },
        { list: display, cssProp: 'display' },
        { list: flexDirection, cssProp: 'flex-direction' },
        { list: fonts.families, cssProp: 'font-family' },
        { list: fonts.weights, cssProp: 'font-weight' },
        { list: { relative: 'relative' }, cssProp: 'position' },
        { list: { underlined: 'underline' }, cssProp: 'text-decoration' },
        { list: { preline: 'pre-line' }, cssProp: 'white-space' }
    ],

    // Space props
    spaceProps: [
        { prop: 'margin', units: 'rem' },
        { prop: 'padding', units: 'rem' }
    ],

    // Variable props
    variableProps: [
        { name: 'sAlpha', cssProp: 'opacity' },
        { name: 'sAlignItems', list: flexAlignments.alignItemsAligments, cssProp: 'align-items' },
        { name: 'sBackground', list: colors, cssProp: 'background-color' },
        { name: 'sBorderColor', list: colors, cssProp: 'border-color' },
        { name: 'sBorderRadius', cssProp: 'border-radius', units: 'px' },
        { name: 'sColor', list: colors, cssProp: 'color' },
        { name: 'sDisplay', list: display, cssProp: 'display' },
        { name: 'sFontSize', cssProp: 'font-size', units: 'rem' },
        { name: 'sFontWeight', list: fonts.weights, cssProp: 'font-weight' },
        { name: 'sFlexDirection', list: flexDirection, cssProp: 'flex-direction' },
        { name: 'sHeight', cssProp: 'height', units: 'rem' },
        { name: 'sJustifyContent', list: flexAlignments.justifyContentAlignments, cssProp: 'justify-content' },
        { name: 'sLineHeight', cssProp: 'line-height', units: 'rem' },
        { name: 'sMaxHeight', cssProp: 'max-height', units: 'rem' },
        { name: 'sMaxWidth', cssProp: 'max-width', units: 'rem' },
        { name: 'sMinHeight', cssProp: 'min-height', units: 'rem' },
        { name: 'sMinWidth', cssProp: 'min-width', units: 'rem' },
        { name: 'sTextAlign', list: alignments, cssProp: 'text-align' },
        { name: 'sWidth', cssProp: 'width', units: 'rem' },

        // Function props
        { name: 'fontSize', helperFn: fontSize, units: 'px' },
        { name: 'sPadding', helperFn: padding, units: 'rem' }
    ]
} as const;
