import { Hero } from './Hero/Hero';
import { useData } from '../../components/DataProvider/DataProvider';
import React from 'react';

export const GovernanceToken = () => {
    const { page } = useData();

    console.log(page);

    return (
        <>
            <Hero />
        </>
    );
};
