import { GovernanceArticles } from '../../components/GovernanceArticles/GovernanceArticles';
import { Hero } from './Hero/Hero';
import { Illustration } from './Illustration/Illustration';
import { Tokenomics } from './Tokenomics/Tokenomics';
import { usePrismicData } from '../../lib/Prismic/components/PrismicDataProvider';
import { useRouter } from 'next/router';
import React from 'react';

export const Governance = () => {
    const { data } = usePrismicData();
    const { daoArticles } = data || {};
    const articles = daoArticles?.data?.articles;
    const router = useRouter();

    router.push('/crypto-hub#farming');

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
