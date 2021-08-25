import { Articles } from './Articles/Articles';
import { DataDash } from './DataDash/DataDash';
import { Hero } from './Hero/Hero';
import { Illustration } from './Illustration/Illustration';
import { useData } from '../../components/DataProvider/DataProvider';
import React from 'react';

export const GovernanceToken = () => {
    const { page } = useData();
    const { articles, dataDash } = page || {};

    return (
        <>
            <Hero />
            <DataDash items={dataDash || []} />
            <Articles articles={articles || []} />
            <Illustration />
        </>
    );
};
