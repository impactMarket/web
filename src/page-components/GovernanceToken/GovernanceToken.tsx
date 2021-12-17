// import { DataDash } from './DataDash/DataDash';
import { GovernanceArticles } from '../../components/GovernanceArticles/GovernanceArticles';
import { Hero } from './Hero/Hero';
import { Illustration } from './Illustration/Illustration';
import { useData } from '../../components/DataProvider/DataProvider';
import React from 'react';

export const GovernanceToken = () => {
    const { page } = useData();
    const {
        // dataDash
    } = page || {};

    return (
        <>
            <Hero />
            {/* <DataDash items={dataDash || []} /> */}
            <GovernanceArticles sBackground="backgroundSecondaryDisabled" sPadding={{ md: '4 0', xs: '2 0' }} />
            <Illustration />
        </>
    );
};
