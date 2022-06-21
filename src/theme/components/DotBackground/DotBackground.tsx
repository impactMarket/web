import { colors } from '../../variables/colors';
import { position, rgba } from 'polished';
import React from 'react';
import styled, { css } from 'styled-components';

const DotBackgroundGradient = styled.div<{ blueGradient?: boolean }>`
    ${position('absolute', 0)};

    ${({ blueGradient }) =>
        blueGradient
            ? css`
                  background: linear-gradient(
                      135deg,
                      ${rgba(colors.white, 0)} 30%,
                      ${rgba(colors.brandPrimary, 0.4)} 75%
                  );
              `
            : css`
                  background: linear-gradient(320deg, ${rgba(colors.white, 0)} 0%, ${colors.white} 75%);
              `}

    z-index: 0;
`;

const DotBackgroundWrapper = styled.div`
    ${position('absolute', 0)};

    z-index: 0;
`;

const DotBackgroundPattern = styled.div`
    ${position('absolute', 0)};

    background-image: url('/img/dot-pattern.svg');
    z-index: 1;
    opacity: 0.5;
`;

type DotBackgroundProps = {
    blueGradient?: boolean;
};

export const DotBackground = (props: DotBackgroundProps) => {
    const { blueGradient } = props;

    return (
        <DotBackgroundWrapper>
            <DotBackgroundPattern />
            <DotBackgroundGradient blueGradient={blueGradient} />
        </DotBackgroundWrapper>
    );
};
