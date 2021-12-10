import { Cta } from '../../components';
import { EmailSubscribe } from './EmailSubscribe/EmailSubscribe';
import { Hero } from './Hero/Hero';
import { Numbers } from './Numbers/Numbers';
import { Partners } from './Partners/Partners';
import { PromotionBanner } from './PromotionBanner/PromotionBanner';
import React from 'react';

type HomepageProps = any;

export const Homepage = (props: HomepageProps) => {
    const numbers = props?.data?.numbers;
    const promotionBanner = props?.data?.promotionBanner;

    return (
        <>
            <PromotionBanner {...promotionBanner} />
            <Hero />
            <Partners />
            <Numbers numbers={numbers} />
            <Cta />
            <EmailSubscribe />
        </>
    );
};
