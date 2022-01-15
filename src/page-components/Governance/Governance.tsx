import { GovernanceArticles } from '../../components/GovernanceArticles/GovernanceArticles';
import { Hero } from './Hero/Hero';
import { Illustration } from './Illustration/Illustration';
import { Tokenomics } from './Tokenomics/Tokenomics';
import React from 'react';

export const Governance = () => {
    return (
        <>
            <Hero />
            <Tokenomics />
            <GovernanceArticles sBackground="backgroundSecondaryDisabled" sPadding={{ md: '4 0', xs: '2 0' }} />
            <Illustration />
        </>
    );
};
