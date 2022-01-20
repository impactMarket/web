import { Div, Icon } from '../../theme/components';
import { GeneratedPropsTypes } from '../../theme/Types';
import { colors } from '../../theme';
import { ease, transitions } from 'styled-gen';
import { usePrismicData } from '../../lib/Prismic/components/PrismicDataProvider';
import React from 'react';
import styled from 'styled-components';

const socialIcons = [
    'telegram',
    'linkedin',
    'github',
    'facebook',
    'twitter',
    'discord',
    'instagram',
    'medium'
] as const;

const SocialLink = styled.a.attrs({
    rel: 'noreferrer noopener',
    target: '_blank'
})`
    ${transitions(['color', 'text-shadow'], 250, ease.outSine)};

    color: ${colors.brandSecondary};

    & + & {
        margin-left: 0.5rem;
    }

    &:hover {
        color: ${colors.textPrimary};
        text-shadow: 0 0.5rem 1rem rgba(0, 0, 0, 0.24);
    }
`;

type SocialMenuProps = GeneratedPropsTypes;

type Social = {
    name: typeof socialIcons[number];
    url: string;
}[];

export const SocialMenu = (props: SocialMenuProps) => {
    const { config } = usePrismicData();
    const socialNetworks = config?.data?.social as Social;

    return (
        <Div {...props}>
            {!!socialNetworks?.length &&
                socialNetworks.map(({ name, url }, index) => (
                    <SocialLink href={url} key={index}>
                        <Icon icon={name} sHeight={1.875} />
                    </SocialLink>
                ))}
        </Div>
    );
};
