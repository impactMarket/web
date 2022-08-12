import { ComponentType } from 'react';
import dynamic from 'next/dynamic';

const slices = {
    Hero: dynamic(() => import('./Hero'), { ssr: false }),
    DocumentLink: dynamic(() => import('./DocumentLink'), { ssr: false }),
    LogoList: dynamic(() => import('./LogoList'), { ssr: false }),
    NumbersFromApi: dynamic(() => import('./NumbersFromApi'), { ssr: false }),
    SubscribeCta: dynamic(() => import('./SubscribeCta'), { ssr: false }),
} as { [componentName: string]: ComponentType | Function };

export default slices;
