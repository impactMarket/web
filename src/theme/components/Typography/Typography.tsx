/* eslint-disable no-nested-ternary */
import { BoolProps, GeneratedPropsTypes } from '../../Types';
import { bodySizes, fonts, headingSizes } from '../../variables/fonts';
import { generateProps, mq, variations } from 'styled-gen';
import { getTag } from '../../../helpers/getTags';
import styled, { css } from 'styled-components';

const applySingularSize = (size: any) => css`
    font-size: ${(typeof size === 'number' ? size : size[0]) / 16}rem;
    letter-spacing: ${typeof size === 'number' ? undefined : size[2] !== undefined ? `${size[2] / 16}rem` : undefined};
    line-height: ${typeof size === 'number' ? undefined : size[1] !== undefined ? `${size[1] / 16}rem` : undefined};
`;

const applyMultipleSizes = (sizes: any) =>
    Object.keys(sizes).map((size: any) =>
        size === 'xs' ? applySingularSize(sizes[size]) : mq.from(size, applySingularSize(sizes[size]))
    );

const applySizes = (sizes: any) =>
    typeof sizes === 'number' || Array.isArray(sizes) ? applySingularSize(sizes) : applyMultipleSizes(sizes);

const setSizeVariations = (sizeVariations: any) =>
    Object.keys(sizeVariations).reduce(
        (result, key) => ({
            ...result,
            [key]: css`
                ${applySizes(sizeVariations[key])}
            `
        }),
        {}
    );

const headingSizeVariations = setSizeVariations(headingSizes);

const BodySizeVariations = setSizeVariations(bodySizes);

type FontBodySizeVariations = BoolProps<typeof bodySizes>;
type FontHeadingSizeVariations = BoolProps<typeof headingSizes>;

export const Heading = styled.h1.attrs((props: object) => ({
    as: getTag(props, { defaultTag: 'h1' })
}))<FontHeadingSizeVariations & GeneratedPropsTypes>`
    font-weight: ${fonts.weights.extrabold};
    font-family: ${fonts.families.manrope};

    ${variations(headingSizeVariations)};
    ${generateProps};
`;

export const Text = styled.p.attrs((props: object) => ({
    as: getTag(props, { defaultTag: 'p' })
}))<FontBodySizeVariations & GeneratedPropsTypes>`
    font-family: ${fonts.families.inter};

    ${variations(BodySizeVariations)};
    ${generateProps};
`;
