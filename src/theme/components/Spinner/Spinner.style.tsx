import { position, size } from 'polished';
import styled, { css } from 'styled-components';

export const SpinnerWrapper = styled.div`
    ${size('100%')};
    ${position('absolute', 0)};

    overflow: hidden;
    z-index: 10;
`;

type SpinnerContainerProps = {
    backgroundColor?: string;
    isLoading?: boolean;
};

export const SpinnerContainer = styled.div<SpinnerContainerProps>`
    ${size('100%')};

    align-items: center;
    background-color: ${({ backgroundColor }) => backgroundColor};
    display: flex;
    justify-content: center;
    opacity: 0;
    transition: all 500 cubic-bezier(0.39, 0.575, 0.565, 1);
    visibility: hidden;

    ${({ isLoading }) =>
        isLoading &&
        css`
            opacity: 1;
            visibility: visible;
        `}
`;

export const SpinnerElement = styled.svg`
    color: inherit;
    height: 50%;
`;
