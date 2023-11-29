import { Icon } from '../../theme/components';
import { colors } from '../../theme';
// import { ease, transitions } from 'styled-gen';
import { transitions } from 'src/theme/helpers/transitions';
import { ease } from 'src/theme/variables/ease';
import { position, size } from 'polished';
import React from 'react';
import styled, { keyframes } from 'styled-components';

type LoadingProps = {
    isActive?: boolean;
};

const spinnerSize = 5;

const ripple = keyframes`
  0% {
    transform: scale(0);
    opacity: 0;
  }

  50% {
    opacity: 0.25;
  }

  100% {
    transform: scale(1);
    opacity: 0;
  }
`;

const LoadingWrapper = styled.div<LoadingProps>`
    ${position('fixed', 0)};
    ${transitions(['opacity', 'visibility'], 0.25, ease.inOutCubic)};

    align-items: center;
    background-color: ${colors.white};
    display: flex;
    justify-content: center;
    opacity: ${({ isActive }) => (isActive ? 1 : 0)};
    visibility: ${({ isActive }) => (isActive ? 'visible' : 'hidden')};
    z-index: 999999;

    svg {
        position: absolute;
    }
`;

const LoadingSpinnerChild = styled.div``;

const LoadingSpinner = styled.div`
    ${size(`${spinnerSize}rem`)};

    align-items: center;
    display: flex;
    justify-content: center;
    margin: ${`${spinnerSize / 1.3}rem`};

    ${LoadingSpinnerChild} {
        ${size(`${spinnerSize / 1.3}rem`)};
        ${position('absolute')};

        align-items: center;
        display: flex;
        justify-content: center;
        border-radius: 50%;
        animation: 1s ${ripple} infinite;
    }
`;

export const Loading = (props: LoadingProps) => {
    const { isActive } = props;

    return (
        <LoadingWrapper isActive={isActive}>
            <LoadingSpinner>
                <LoadingSpinnerChild>
                    <Icon brandPrimary icon="im" sHeight={4} />
                </LoadingSpinnerChild>
            </LoadingSpinner>
        </LoadingWrapper>
    );
};
