import { GeneratedPropsTypes } from '../../theme/Types';
import { InlineShareButtons, InlineShareButtonsConfig } from 'sharethis-reactjs';
import { generateProps } from 'styled-gen';
import { useRouter } from 'next/router';
import React from 'react';
import styled from 'styled-components';

const Wrapper = styled.div`
    display: inline-flex;
    position: relative;
    width: 100%;
    z-index: 0;

    ${generateProps};
`;

const config: InlineShareButtonsConfig = {
    alignment: 'left',
    color: 'white',
    enabled: true,
    font_size: 16,
    labels: null,
    language: 'en',
    // @ts-ignore: Lib missing correct type
    networks: ['facebook', 'twitter', 'linkedin', 'reddit', 'telegram', 'email'],
    padding: 8,
    radius: 4,
    show_total: true,
    size: 36
};

export const ShareThis = (props: GeneratedPropsTypes) => {
    const { locale } = useRouter();

    const [language] = locale.split('-');

    if (!language) {
        return null;
    }

    return (
        <Wrapper {...props}>
            <InlineShareButtons config={{ ...config, language }} />
        </Wrapper>
    );
};
