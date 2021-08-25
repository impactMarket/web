import { mq } from 'styled-gen';
import React from 'react';
import styled, { css } from 'styled-components';

const IllustrationWrapper = styled.div`
    display: flex;
    height: 10rem;
    justify-content: center;
    overflow: hidden;
    position: relative;

    ${mq.tabletLandscape(css`
        height: unset;
    `)}

    img {
        display: block;
        height: 100%;
        position: absolute;
        width: auto;

        ${mq.tabletLandscape(css`
            height: auto;
            position: relative;
            width: 100%;
        `)}
    }
`;

export const Illustration = () => (
    <IllustrationWrapper>
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img alt="PACT Illustration" src="/img/governance-illustration.svg" />
    </IllustrationWrapper>
);
