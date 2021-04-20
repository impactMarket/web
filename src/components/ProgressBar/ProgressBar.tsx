import { GeneratedPropsTypes } from '../../theme/Types';
import { colors } from '../../theme';
import { generateProps } from 'styled-gen';
import React from 'react';
import styled from 'styled-components';

const barThickness = 6;

type BarProps = {
    progress: number;
};

const Bar = styled.div<BarProps>`
    background-color: ${colors.backgroundSecondary};
    border-radius: ${barThickness / 2}px;
    height: ${barThickness}px;
    overflow: hidden;
    position: relative;
    width: 100%;

    ${generateProps};

    &::after {
        background-color: ${colors.brandPrimary};
        border-radius: ${barThickness / 2}px;
        content: '';
        height: 100%;
        position: absolute;
        width: ${({ progress }) => `${progress}%`};
    }
`;

type ProgressBarProps = {
    progress: number | string;
};

export const ProgressBar = (props: ProgressBarProps & GeneratedPropsTypes) => {
    const { progress, ...forwardProps } = props;

    return <Bar progress={+progress || 0} {...forwardProps} />;
};
