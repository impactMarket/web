import { Div, Icon } from '../../theme/components';
import { GeneratedPropsTypes } from '../../theme/Types';
import { usePrismicData } from '../../lib/Prismic/components/PrismicDataProvider';
import React from 'react';
import RichText from '../../lib/Prismic/components/RichText';

export const WrongNetwork = (props: GeneratedPropsTypes) => {
    const { extractFromConfig } = usePrismicData();

    const { wrongNetwork } = extractFromConfig('commonTexts') as any;

    return (
        <Div column pl={1.5} pr={1.5} sAlignItems="center" {...props}>
            <Icon error icon="circleWarning" sHeight={2} sWidth={2} />
            <RichText center content={wrongNetwork} mt={1} small />
        </Div>
    );
};
