import { colors } from '../../variables/colors';
import { position, rgba } from 'polished';
import React from 'react';
import styled from 'styled-components';

const DotBackgroundGradient = styled.div`
    ${position('absolute', 0)};

    background: linear-gradient(320deg, ${rgba(colors.white, 0)} 0%, ${colors.white} 75%);
`;

const DotBackgroundWrapper = styled.div`
    ${position('absolute', 0)};

    background-image: url('/img/dot-pattern.svg');
`;

export const DotBackground = () => {
    return (
        <DotBackgroundWrapper>
            <DotBackgroundGradient />
        </DotBackgroundWrapper>
    );
};
