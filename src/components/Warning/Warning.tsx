import { Div, Icon, Text } from '../../theme/components';
import { GeneratedPropsTypes } from '../../theme/Types';
import { colors } from '../../theme';
import { generateProps } from 'styled-gen';
import React from 'react';
import styled from 'styled-components';

const WarningWrapper = styled.div<GeneratedPropsTypes>`
    align-items: flex-start;
    background-color: ${colors.white};
    border-radius: 0.25rem;
    border: 0.125rem solid ${colors.warning};
    display: flex;
    padding: 0.5rem;

    ${generateProps}
`;

type WarningProps = GeneratedPropsTypes & {
    children: any;
    type: ['warning', 'success', 'error'];
};

export const Warning = (props: WarningProps) => {
    const { children, type, ...forwardProps } = props;

    return (
        <WarningWrapper sBorderColor={type} {...forwardProps}>
            <Div pt={0.2}>
                <Icon icon="warning" sColor={type} sHeight={1} sWidth={1} />
            </Div>
            <Text ml={0.5} small>
                {children}
            </Text>
        </WarningWrapper>
    );
};

Warning.defaultProps = {
    type: 'warning'
};
