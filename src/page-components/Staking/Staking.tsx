import { useRouter } from 'next/router';
import Hero from './Hero/Hero';
import React from 'react';

export const Staking = () => {
    const router = useRouter();

    router.push('/crypto-hub#staking');

    return <Hero />;
};
