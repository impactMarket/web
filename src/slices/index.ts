import { ComponentType } from 'react';
import dynamic from 'next/dynamic';

const slices = {
    DocumentLink: dynamic(() => import('./DocumentLink'), { ssr: false }),
    LogoList: dynamic(() => import('./LogoList'), { ssr: false })
} as { [componentName: string]: ComponentType | Function };

export default slices;
