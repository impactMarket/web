import { PrismicSlice } from '../types';
import ErrorPage from 'next/error';
import React, { ComponentType } from 'react';
import componentCase from '../../../helpers/componentCase';
import sliceComponents from '../../../slices';

type SlicesProps = {
    components?: { [componentName: string]: ComponentType | Function };
    slices: PrismicSlice[];
};

const Slices = (props: SlicesProps) => {
    const { components = {}, slices } = props;

    if (!slices) {
        return <ErrorPage statusCode={404} />;
    }

    // Build each component with the same name/api in Prismic and Components files names

    return (
        <>
            {slices?.map((slice, index) => {
                if (slice?.primary?.isActive) {
                    const SliceComponent =
                        components[componentCase(slice.sliceType)] || sliceComponents[componentCase(slice.sliceType)];

                    if (!SliceComponent) {
                        console.log(`No slice component found for ${slice.sliceType}`);

                        return null;
                    }

                    return <SliceComponent key={index} {...slice} />;
                }

                return null;
            })}
        </>
    );
};

export default Slices;
