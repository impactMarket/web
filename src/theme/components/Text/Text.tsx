import { BoolProps, GeneratedPropsTypes } from '../../Types';
import { fonts } from '../../variables/fonts';
import { generateProps, variations } from 'styled-gen';
import { getTag } from '../../../helpers/getTags';
import styled, { css } from 'styled-components';

const fontSizes: { [key: string]: number[] } = fonts.sizes;

const sizeVariations = Object.keys(fonts.sizes).reduce(
    (results, key: string) => {
        const fontValues: number[] = fontSizes[key];
        const [fontSize, lineHeight, letterSpacing]: number[] = fontValues || [];

        return {
            ...results,
            [key]: css`
                font-size: ${fontSize ? `${fontSize}px` : null};
                line-height: ${lineHeight ? `${lineHeight}px` : null};
                letter-spacing: ${letterSpacing ? `${letterSpacing}px` : null};
            `
        };
    },
    {
        default: css`
            font-size: ${fontSizes?.body[0] || 16}px;
            line-height: ${fontSizes?.body[1] || 24}px;
        `
    }
);

type FontSizeVariations = BoolProps<typeof fonts.sizes>;

export const Text = styled.p.attrs((props: object) => ({
    as: getTag(props, { defaultTag: 'p' })
}))<FontSizeVariations & GeneratedPropsTypes>`
    margin: unset;
    padding: unset;

    ${variations(sizeVariations)};
    ${generateProps}
`;
