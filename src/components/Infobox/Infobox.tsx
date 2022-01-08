import { GeneratedPropsTypes } from '../../theme/Types';
import { Icon, Text } from '../../theme/components';
import { generateProps } from 'styled-gen';
import React from 'react';
import styled from 'styled-components';

const Wrapper = styled.div<GeneratedPropsTypes>`
    align-items: center;
    border-radius: 0.5rem;
    display: flex;
    padding: 1rem;
    width: 100%;
    justify-content: center;

    ${generateProps}
`;

const types = {
    error: { color: 'errorLight', icon: 'circleWarning', iconColor: 'error' },
    info: { color: 'backgroundLight', icon: 'info', iconColor: 'brandSecondaryLight' },
    warning: { color: 'warningLight', icon: 'warning', iconColor: 'warning' }
} as const;

type InfoboxProps = {
    children: any;
    type?: keyof typeof types;
} & GeneratedPropsTypes;

const Infobox = (props: InfoboxProps) => {
    const { children, type, ...forwardProps } = props;
    const { color, icon, iconColor } = types[type || 'info'] || {};

    return (
        <Wrapper sBackground={color} {...forwardProps}>
            {icon && <Icon icon={icon} sColor={iconColor} sHeight={1} sWidth={1} />}
            <Text div ml={icon && 0.625} small>
                {children}
            </Text>
        </Wrapper>
    );
};

export default Infobox;
