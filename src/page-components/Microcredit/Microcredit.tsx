import { usePrismicData } from '../../lib/Prismic/components/PrismicDataProvider';
import React from 'react';
import Slices from '../../lib/Prismic/components/Slices';

export const Microcredit = () => {
    const { page } = usePrismicData();
    const slices = page?.data?.body;

    return <Slices slices={slices} />;
};
