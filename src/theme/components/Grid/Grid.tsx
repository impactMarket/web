import * as FlexboxGrid from 'react-styled-flexboxgrid';
import { GeneratedPropsTypes, MqProp } from '../../Types';
import { breakpoints } from '../../variables/breakpoints';
import { generateProps, mq } from 'styled-gen';
import styled, { css } from 'styled-components';

// eslint-disable-next-line sort-keys
const bpMap: { [key: string]: string } = { xs: 'phone', sm: 'tablet', md: 'tabletLandscape', lg: 'desktop' };

const applyPaddedStyle = (value: any, bp?: string) => {
    const styleValue = Number.isNaN(value) ? value : `${value / 2}rem`;
    const style = css`
        margin-bottom: -${styleValue};
        margin-top: -${styleValue};

        & > * {
            padding-bottom: ${styleValue};
            padding-top: ${styleValue};
        }
    `;

    if (!bp || !bpMap[bp] || bp === 'xs') {
        return style;
    }

    return mq.from(bp, style);
};

const padded = (props: any) => {
    const vGutter = props?.vGutter;
    const defaultValue = 1;

    if (!vGutter || (typeof vGutter === 'object' && !Object.keys(vGutter)?.length)) {
        return;
    }

    if (typeof vGutter === 'object') {
        return Object.keys(bpMap).map((bp: string) =>
            vGutter[bp] !== undefined ? applyPaddedStyle(vGutter[bp], bp) : ''
        );
    }

    return applyPaddedStyle(vGutter || defaultValue);
};

export const Col = styled(FlexboxGrid.Col)<GeneratedPropsTypes>`
    ${generateProps};
`;

export const Grid = styled(FlexboxGrid.Grid)<GeneratedPropsTypes>`
    ${mq.upTo(
        `${breakpoints.lg}em`,
        css`
            width: 100%;
        `
    )}

    ${generateProps};
`;

type RowProps = {
    vGutter?: MqProp<number | string>;
};

export const Row = styled(FlexboxGrid.Row)<GeneratedPropsTypes & RowProps>`
    ${padded};
    ${generateProps};
`;
