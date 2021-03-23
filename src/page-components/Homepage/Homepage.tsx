import { Cta } from '../../components';
import { Hero } from './Hero/Hero';
import { Numbers } from './Numbers/Numbers';
import { Partners } from './Partners/Partners';
import React from 'react';

export const Homepage = () => (
    <>
        <Hero />
        <Partners />
        <Numbers />
        <Cta />
    </>
);
