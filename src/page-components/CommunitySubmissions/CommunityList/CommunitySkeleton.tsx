import {
    CommunityContent,
    CommunityContentBottom,
    CommunityCover,
    CommunityHeadingWrapper,
    CommunityWrapper
} from './Community.style';
import { Div, GhostElement } from '../../../theme/components';
import React from 'react';

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
