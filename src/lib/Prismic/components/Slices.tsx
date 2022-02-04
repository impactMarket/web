import { PrismicSlice } from '../types';
import React, { ComponentType } from 'react';
import componentCase from '../../../helpers/componentCase';
import sliceComponents from '../../../slices';

type SlicesProps = {
    components?: { [componentName: string]: ComponentType | Function };
    slices: PrismicSlice[];
};

const Slices = (props: SlicesProps) => {
    const { components = {}, slices } = props;

    return (
        <>
            {slices.map((slice, index) => {
                const SliceComponent =
                    components[componentCase(slice.sliceType)] || sliceComponents[componentCase(slice.sliceType)];

                if (!SliceComponent) {
                    console.log(`No slice component found for ${slice.sliceType}`);

                    return null;
                }

                return <SliceComponent key={index} {...slice} />;
            })}
        </>
    );
};

export default Slices;
