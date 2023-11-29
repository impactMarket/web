import { Div, Icon } from '../../theme/components';
import { GeneratedPropsTypes } from '../../theme/Types';
import { colors } from '../../theme';
import { transitions } from 'src/theme/helpers/transitions';
import { ease } from 'src/theme/variables/ease';
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

    color: ${(props) => (props.color ? props.color : colors.brandSecondary)};

    &:hover {
        color: ${colors.textPrimary};
        text-shadow: 0 0.5rem 1rem rgba(0, 0, 0, 0.24);
    }
`;

type SocialMenuProps = GeneratedPropsTypes & {
    color?: string;
};

type Social = {
    name: (typeof socialIcons)[number];
    url: string;
}[];

export const SocialMenu = (props: SocialMenuProps) => {
    const { config } = usePrismicData();
    const socialNetworks = config?.data?.social as Social;

    return (
        <Div {...props} style={{ flexWrap: 'wrap', gap: '1rem 1.5rem' }}>
            {!!socialNetworks?.length &&
                socialNetworks.map(({ name, url }, index) => (
                    <SocialLink color={props.color} href={url} key={index}>
                        <Icon icon={name} sHeight={1.563} />
                    </SocialLink>
                ))}
        </Div>
    );
};
