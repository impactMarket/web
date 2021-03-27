import { Div, Heading, Text } from '../../theme/components';
import { GeneratedPropsTypes } from '../../theme/Types';
import React from 'react';

type DashboardNumericContentProps = { content: any } & GeneratedPropsTypes;

export const DashboardNumericContent = (props: DashboardNumericContentProps) => {
    const { content, ...forwardProps } = props;

    if (!content) {
        return null;
    }

    const { prefix, value, suffix } = props.content;

    return (
        <Div sAlignItems="baseline" {...forwardProps}>
            {!!prefix && <Heading h3>{prefix}</Heading>}
            <Heading h3>{value || '- -'}</Heading>
            {!!suffix && (
                <Text XXSmall ml={0.25}>
                    {suffix}
                </Text>
            )}
        </Div>
    );
};
