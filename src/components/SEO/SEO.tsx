import { useData } from '../DataProvider/DataProvider';
import { useTranslation } from '../TranslationProvider/TranslationProvider';
import Head from 'next/head';
import React from 'react';

type SeoProps = any;

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

export const SEO = (props: SeoProps) => {
    const { page, url, config } = useData();
    const { meta: metaFromPage } = page || {};
    const { seo } = config;
    const { meta: metaFromProps } = props;

    const { t } = useTranslation();

    const defaultMeta = ['description', 'keywords', 'title'].reduce(
        (result, key) => ({ ...result, [key]: t(`seo.${key}`) }),
        { url }
    );

    const pageMeta = ['description', 'keywords', 'title'].reduce(
        (result, key) => (metaFromPage?.[key] ? { ...result, [key]: t(metaFromPage[key]) } : result),
        {}
    ) as any;

    if (metaFromPage?.image) {
        pageMeta.image = metaFromPage.image;
    }

    const metaObject = Object.assign({}, { ...seo, ...defaultMeta, ...pageMeta }, metaFromProps);

    const meta = getMetaData(metaObject);
    const title = metaObject?.title;

    return (
        <Head>
            <title>{title}</title>
            <meta content="website" property="og:type" />
            {meta.map((metaprops: any, index: any) => (
                <meta key={index} {...metaprops} />
            ))}
        </Head>
    );
};
