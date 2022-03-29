import { GeneratedPropsTypes } from '../../theme/Types';
import { Icon } from '../../theme/components';
import { generateProps, transitions } from 'styled-gen';
import { position } from 'polished';
import React, { useState } from 'react';
import ReactPlayer from 'react-player/youtube';
import styled, { css } from 'styled-components';

// #region === style ===
const CoverImage = styled.div<{ image?: string; isActive?: boolean }>`
    ${position('absolute', 0)};
    ${transitions('all', 150, 'linear')};

    align-items: center;
    background-image: url('${({ image }) => image}');
    background-position: center;
    background-size: cover;
    display: flex;
    justify-content: center;
    opacity: 0;
    visibility: hidden;
    z-index: 1;

    ${({ isActive }) =>
        isActive &&
        css`
            visibility: visible;
            opacity: 1;
        `}
`;

const Wrapper = styled.div`
    border-radius: 0.5rem;
    overflow: hidden;
    padding-bottom: 56.25%;
    position: relative;
    width: 100%;
    background: red;

    & > * {
        position: absolute;
    }

    ${generateProps};
`;
// #endregion === style ===

type VideoType = {
    embedUrl?: string;
    providerName?: string;
    thumbnailUrl?: string;
} & GeneratedPropsTypes;

export const Video = (props: VideoType) => {
    const { embedUrl, providerName, thumbnailUrl, ...forwardProps } = props;

    const [playing, setIsPlaying] = useState(false);

    if (!embedUrl || providerName !== 'YouTube') {
        return null;
    }

    return (
        <Wrapper {...forwardProps}>
            {!!thumbnailUrl && (
                <CoverImage image={thumbnailUrl} isActive={!playing} onClick={() => setIsPlaying(true)}>
                    <Icon icon="play" sHeight={4.5} sWidth={4.5} white />
                </CoverImage>
            )}
            <ReactPlayer
                controls
                height="100%"
                onEnded={() => setIsPlaying(false)}
                playing={playing}
                stopOnUnmount
                url={embedUrl}
                width="100%"
            />
        </Wrapper>
    );
};
