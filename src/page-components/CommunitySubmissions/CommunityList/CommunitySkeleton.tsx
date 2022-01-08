import {
    CommunityContent,
    CommunityContentBottom,
    CommunityCover,
    CommunityHeadingWrapper,
    CommunityWrapper
} from './Community.style';
import { Div } from '../../../theme/components';
import { GeneratedPropsTypes } from '../../../theme/Types';
import { colors } from '../../../theme';
import { generateProps } from 'styled-gen';
import { rgba } from 'polished';
import React from 'react';
import styled, { keyframes } from 'styled-components';

const shine = keyframes`
     0% {
        background-position: -3rem;
    }

    100% {
        background-position: 500px;
    }
`;

const GhostElement = styled.div<GeneratedPropsTypes>`
    animation: ${shine} 1.6s infinite linear;
    background-color: ${colors.backgroundLight};
    background-image: linear-gradient(
        90deg,
        ${colors.backgroundLight} 0px,
        ${rgba(colors.backgroundSecondary, 0.5)} 3rem,
        ${colors.backgroundLight} 80px
    );
    background-size: 500px;
    border-radius: 0.5rem;
    width: 100%;

    ${generateProps};
`;

export const CommunitySkeleton = () => {
    return (
        <CommunityWrapper isLoading>
            <CommunityCover />
            <CommunityContent>
                <CommunityHeadingWrapper>
                    <GhostElement sHeight={1.75} sMaxWidth="50%" />
                    <GhostElement mt={0.5} sHeight={1.15} sMaxWidth="30%" />
                </CommunityHeadingWrapper>
                <CommunityContentBottom>
                    <Div column pr={2} sWidth="100%">
                        <GhostElement sHeight={1.15} sMaxWidth="40%" />
                        <GhostElement mt={0.5} sHeight={1.15} sMaxWidth="30%" />
                    </Div>
                    <GhostElement mt={{ sm: 'auto', xs: 2 }} sHeight={2.75} sMaxWidth={12.25} />
                </CommunityContentBottom>
            </CommunityContent>
        </CommunityWrapper>
    );
};
