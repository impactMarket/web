import { GovernanceArticles } from '../../components/GovernanceArticles/GovernanceArticles';
import { Hero } from './Hero/Hero';
import { Illustration } from './Illustration/Illustration';
import { Tokenomics } from './Tokenomics/Tokenomics';
import { usePrismicData } from '../../lib/Prismic/components/PrismicDataProvider';
import React from 'react';

export const Governance = () => {
    const { data } = usePrismicData();
    const { daoArticles } = data || {};
    const articles = daoArticles?.data?.articles;

    return (
        <>
            <Hero />
            <Tokenomics />
            <GovernanceArticles
                articles={articles as any}
                sBackground="backgroundSecondaryDisabled"
                sPadding={{ md: '4 0', xs: '2 0' }}
            />
            <Illustration />
        </>
    );
};
