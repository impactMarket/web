import { PrismicSlice } from '../../lib/Prismic/types';
import { usePrismicData } from '../../lib/Prismic/components/PrismicDataProvider';
import React, { ComponentType } from 'react';
import camelCase from 'lodash/camelCase';
import componentCase from '../../helpers/componentCase';
import dynamic from 'next/dynamic';

const components = {
    Testimonial: dynamic(() => import('./Testimonial'), { ssr: false })
} as { [componentName: string]: ComponentType | Function };

const Testimonial = (props: PrismicSlice) => {
    const { primary } = props;
    const { data } = usePrismicData();
    const type = primary.testimonial?.type;
    const doc = data[camelCase(type.replace('website_', ''))];

    const Component = components[componentCase(type.replace('website_', ''))] as ComponentType;

    if (!Component) {
        console.log(`No Testimonial slice sub component found for ${type}\n`, props);

        return null;
    }

    if (!doc) {
        console.log(
            `No document data (${camelCase(
                type.replace('website_', '')
            )}) found in Testimonial slice sub component ${type}\n`,
            props
        );
    }

    return <Component {...doc} />;
};

export default Testimonial;
