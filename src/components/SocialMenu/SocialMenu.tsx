import { Div, Icon } from '../../theme/components';
import { GeneratedPropsTypes } from '../../theme/Types';
import { colors } from '../../theme';
import { ease, transitions } from 'styled-gen';
import { useData } from '../DataProvider/DataProvider';
import React from 'react';
import styled from 'styled-components';

const socialIcons = ['telegram', 'linkedin', 'github', 'facebook', 'twitter'] as const;

const SocialLink = styled.a.attrs({
    rel: 'noreferrer noopener',
    target: '_blank'
})`
    ${transitions(['color', 'text-shadow'], 250, ease.outSine)};

    color: ${colors.brandSecondary};

    & + & {
        margin-left: 1rem;
    }

    &:hover {
        color: ${colors.textPrimary};
        text-shadw: 0 0.5rem 1rem rgba(0, 0, 0, 0.24);
    }
`;

type SocialMenuProps = GeneratedPropsTypes;

export const SocialMenu = (props: SocialMenuProps) => {
    const { config } = useData();
    const socialNetworks = config?.social;

    return (
        <Div {...props}>
            {socialNetworks &&
                socialIcons.map((icon: typeof socialIcons[number]) => (
                    <SocialLink href={socialNetworks[icon]} key={icon}>
                        <Icon icon={icon} sHeight={2} />
                    </SocialLink>
                ))}
        </Div>
    );
};
