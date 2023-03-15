import { ComponentType } from 'react';
import dynamic from 'next/dynamic';

const slices = {
    Banner: dynamic(() => import('./Banner'), { ssr: false }),
    CardList: dynamic(() => import('./CardList'), { ssr: false }),
    DocumentLink: dynamic(() => import('./DocumentLink'), { ssr: false }),
    Features: dynamic(() => import('./Features'), { ssr: false }),
    Hero: dynamic(() => import('./Hero/Hero'), { ssr: false }),
    Info: dynamic(() => import('./Info'), { ssr: false }),
    LogoList: dynamic(() => import('./LogoList'), { ssr: false }),
    NumbersFromApi: dynamic(() => import('./NumbersFromApi'), { ssr: false }),
    Pact: dynamic(() => import('./Pact'), { ssr: false }),
    Partners: dynamic(() => import('./Partners'), { ssr: false }),
    Stories: dynamic(() => import('./Stories'), { ssr: false }),
    SubscribeCta: dynamic(() => import('./SubscribeCta'), { ssr: false }),
    Testimonial: dynamic(() => import('./Testimonial'), { ssr: false }),
    Tokenomics: dynamic(() => import('./Tokenomics'), { ssr: false }),
    Wallets: dynamic(() => import('./Wallets'), { ssr: false })
} as { [componentName: string]: ComponentType | Function };

export default slices;
