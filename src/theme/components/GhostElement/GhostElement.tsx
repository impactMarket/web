import { GeneratedPropsTypes } from '../../Types';
import { colors } from '../..';
import { generateProps } from 'styled-gen';
import { ease } from 'src/theme/variables/ease';
import styled, { keyframes } from 'styled-components';

const load = keyframes`
     from {
        left: -100%;
    }

    to {
        left: 100%;
    }
`;

export const GhostElement = styled.div<
    { overColored?: boolean; color?: string } & GeneratedPropsTypes
>`
    background-color: ${({ overColored, color }: any) =>
        !color &&
        colors[
            overColored ? 'backgroundSecondaryDisabled' : 'backgroundLight'
        ]};
    border-radius: 0.5rem;
    width: 100%;
    position: relative;
    overflow: hidden;

    &::before {
        content: '';
        display: block;
        position: absolute;
        left: -100%;
        top: 0;
        height: 100%;
        width: 100%;
        background: ${({ color }: any) =>
            `linear-gradient(to right, transparent 0%, ${
                color ? color : colors.backgroundShadow
            } 50%, transparent 100%)`};
        animation: ${load} 1s ${ease.inOutCirc} infinite;
    }

    ${generateProps};
`;
