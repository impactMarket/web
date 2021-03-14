import { useData } from '../DataProvider/DataProvider';
import Head from 'next/head';
import React from 'react';

const getMetaData: any = (metaData: any) =>
    Object.keys(metaData).reduce((meta: any, metaName: any) => {
        const metaValue = metaData[metaName];

        if (!metaValue) {
            return meta;
        }

        if (metaName === 'image') {
            return [
                ...meta,
                { content: metaValue, property: `og:${metaName}` },
                { content: metaValue, property: `og:${metaName}:secure_url` },
                { content: metaValue, name: `twitter:${metaName}` }
            ];
        }

        if (metaName === 'keywords') {
            return [...meta, { content: metaValue, name: metaName }];
        }

        if (metaName === 'title') {
            return [
                ...meta,
                { content: metaValue, property: `og:${metaName}` },
                { content: metaValue, name: `twitter:${metaName}` }
            ];
        }

        if (metaName === 'url') {
            return [...meta, { content: metaValue, property: `og:${metaName}` }];
        }

        return [
            ...meta,
            { content: metaValue, name: metaName },
            { content: metaValue, name: `twitter:${metaName}` },
            { content: metaValue, property: `og:${metaName}` }
        ];
    }, []);

export const SEO = () => {
    const { seo } = useData();

    const meta = getMetaData(seo);
    const title = seo?.title;

    return (
        <Head>
            <title>{title}</title>
            {meta.map((metaprops: any, index: any) => (
                <meta key={index} {...metaprops} />
            ))}
        </Head>
    );
};
