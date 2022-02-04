import { Cta } from '../../components';
import { EmailSubscribe } from './EmailSubscribe/EmailSubscribe';
import { GovernanceArticles } from '../../components/GovernanceArticles/GovernanceArticles';
import { Hero } from './Hero/Hero';
import { Numbers } from './Numbers/Numbers';
import { Partners } from './Partners/Partners';
import PromotionalBanner from './PromotionalBanner/PromotionBanner';
import React from 'react';

export const Homepage = () => {
    return (
        <>
            <PromotionalBanner />
            <Hero />
            <GovernanceArticles sPadding="1 0" />
            <Partners />
            <Numbers />
            <Cta />
            <EmailSubscribe />
        </>
    );
};
