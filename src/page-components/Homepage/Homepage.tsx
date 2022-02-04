import { Cta } from '../../components';
import { EmailSubscribe } from './EmailSubscribe/EmailSubscribe';
import { Numbers } from './Numbers/Numbers';
import { usePrismicData } from '../../lib/Prismic/components/PrismicDataProvider';
import Hero from './Hero/Hero';
import PromotionalBanner from './PromotionalBanner/PromotionBanner';
import React from 'react';
import Slices from '../../lib/Prismic/components/Slices';

export const Homepage = () => {
    const { page } = usePrismicData();
    const slices = page?.data?.body;

    return (
        <>
            <PromotionalBanner />
            <Hero />
            <Slices slices={slices} />
            <Numbers />
            <Cta />
            <EmailSubscribe />
        </>
    );
};
