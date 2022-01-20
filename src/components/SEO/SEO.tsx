import { usePrismicData } from '../../lib/Prismic/components/PrismicDataProvider';
import Head from 'next/head';
import React from 'react';
import isEmpty from 'lodash/isEmpty';
import pickBy from 'lodash/pickBy';

type MetaProps = {
    description?: string;
    image?: { url: string } | string;
    keywords?: string;
    title?: string;
    url?: string;
};

type SeoProps = {
    meta?: MetaProps;
};

type MetaArray = {
    content?: string;
    property?: string;
    name?: string;
}[];

const getMetaData: any = (metaData: any) =>
    Object.keys(metaData).reduce((meta: any, metaName: any) => {
        const metaValue = metaData[metaName];

        if (!metaValue) {
            return meta;
        }

        if (metaName === 'image') {
            return [
                ...meta,
                { content: metaValue?.url || metaValue, property: `og:${metaName}` },
                { content: metaValue?.url || metaValue, property: `og:${metaName}:secure_url` },
                { content: metaValue?.url || metaValue, name: `twitter:${metaName}` }
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

export const SEO = (props: SeoProps) => {
    const { extractFromConfig, extractFromPage, url } = usePrismicData();

    const metaFromConfig = pickBy(extractFromConfig('seo') as MetaProps, prop =>
        typeof prop === 'string' ? !isEmpty(prop) : !isEmpty(prop?.url)
    ) as MetaProps;

    const metaFromPage = pickBy(extractFromPage('seo') as MetaProps, prop =>
        typeof prop === 'string' ? !isEmpty(prop) : !isEmpty(prop?.url)
    ) as MetaProps;

    const metaFromProps = pickBy(props?.meta, prop =>
        typeof prop === 'string' ? !isEmpty(prop) : !isEmpty(prop?.url)
    ) as MetaProps;

    const mergedMeta = { ...metaFromConfig, ...metaFromPage, ...metaFromProps, url } as MetaProps;

    const metaArr = getMetaData(mergedMeta) as MetaArray;

    const title = mergedMeta?.title || '';

    return (
        <Head>
            <title>{title}</title>
            {metaArr.map((metaProps, index) => (
                <meta key={index} {...metaProps} />
            ))}
        </Head>
    );
};
