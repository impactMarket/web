import { Div } from '../../../theme/components';
import { colors } from '../../../theme';
import React from 'react';
import styled from 'styled-components';

const SkeletonImagePlaceholder = styled.div`
    background-color: ${colors.backgroundSecondary};
    border-radius: 0.75rem;
    padding-top: 100%;
    width: 100%;
`;

const SkeletonTextLine = styled.div`
    background-color: ${colors.backgroundSecondary};
    border-radius: 0.5rem;
    height: 1rem;
    margin-top: 0.5rem;
    width: 10rem;

    &:not(:first-of-type) {
        width: 7rem;
    }
`;

const SkeletonWrapper = styled.div``;

export const CommunitySkeleton = () => {
    return (
        <SkeletonWrapper>
            <SkeletonImagePlaceholder />
            <Div column>
                <SkeletonTextLine />
                <SkeletonTextLine />
            </Div>
        </SkeletonWrapper>
    );
};
