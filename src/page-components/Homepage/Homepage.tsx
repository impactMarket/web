import { Cta } from '../../components';
import { EmailSubscribe } from './EmailSubscribe/EmailSubscribe';
import { GovernanceArticles } from '../../components/GovernanceArticles/GovernanceArticles';
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
            <GovernanceArticles sPadding="1 0" />
            <Partners />
            <Numbers numbers={numbers} />
            <Cta />
            <EmailSubscribe />
        </>
    );
};
