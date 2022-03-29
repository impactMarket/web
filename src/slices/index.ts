import { ComponentType } from 'react';
import dynamic from 'next/dynamic';

const slices = {
    DocumentLink: dynamic(() => import('./DocumentLink'), { ssr: false }),
    LogoList: dynamic(() => import('./LogoList'), { ssr: false }),
    MobileAppCta: dynamic(() => import('./MobileAppCta'), { ssr: false }),
    NumbersFromApi: dynamic(() => import('./NumbersFromApi'), { ssr: false }),
    SubscribeCta: dynamic(() => import('./SubscribeCta'), { ssr: false }),
    VideoSection: dynamic(() => import('./VideoSection'), { ssr: false })
} as { [componentName: string]: ComponentType | Function };

export default slices;
