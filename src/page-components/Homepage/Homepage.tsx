import { Cta } from '../../components';
import { EmailSubscribe } from './EmailSubscribe/EmailSubscribe';
import { Hero } from './Hero/Hero';
import { Numbers } from './Numbers/Numbers';
import { Partners } from './Partners/Partners';
import React from 'react';

type HomepageProps = any;

export const Homepage = (props: HomepageProps) => {
    const numbers = props?.data?.numbers;

    return (
        <>
            <Hero />
            <Partners />
            <Numbers numbers={numbers} />
            <Cta />
            <EmailSubscribe />
        </>
    );
};
