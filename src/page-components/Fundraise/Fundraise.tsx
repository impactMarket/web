import { Balance } from './Balance/Balance';
import { Hero } from './Hero/Hero';
import { useData } from '../../components/DataProvider/DataProvider';
import React from 'react';

export const Fundraise = () => {
    const { page } = useData();
    const { hero, balance } = page || {};

    return (
        <>
            <Hero {...hero} />
            <Balance {...balance} />
        </>
    );
};
