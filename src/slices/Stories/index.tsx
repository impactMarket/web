import { PrismicSlice } from '../../lib/Prismic/types';
import { usePrismicData } from '../../lib/Prismic/components/PrismicDataProvider';
import React, { ComponentType } from 'react';
import camelCase from 'lodash/camelCase';
import componentCase from '../../helpers/componentCase';
import dynamic from 'next/dynamic';

const components = {
    Stories: dynamic(() => import('./Stories'), { ssr: false })
} as { [componentName: string]: ComponentType | Function };

const Stories = (props: PrismicSlice) => {
    const { primary } = props;
    const { isActive } = primary;
    const { data } = usePrismicData();
    const type = primary.stories?.type;
    const doc = data[camelCase(type.replace('website_', ''))];

    const Component = components[componentCase(type.replace('website_', ''))] as ComponentType;

    if (!Component) {
        console.log(`No Stories slice sub component found for ${type}\n`, props);

        return null;
    }

    if (!doc) {
        console.log(
            `No document data (${camelCase(
                type.replace('website_', '')
            )}) found in Stories slice sub component ${type}\n`,
            props
        );
    }

    return <Component {...doc} isActive={isActive} />;
};

export default Stories;
