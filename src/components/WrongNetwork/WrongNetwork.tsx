import { Div, Icon, Text } from '../../theme/components';
import { GeneratedPropsTypes } from '../../theme/Types';
import { String } from '../String/String';
import React from 'react';

export const WrongNetwork = (props: GeneratedPropsTypes) => {
    return (
        <Div column pl={1.5} pr={1.5} sAlignItems="center" {...props}>
            <Icon error icon="circleWarning" sHeight={2} sWidth={2} />
            <Text center mt={1} small>
                <String id="wrongNetworkDetected" />
            </Text>
        </Div>
    );
};
