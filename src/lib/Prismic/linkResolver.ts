import prismicT from '@prismicio/types';

const exceptions = [] as string[];
const homepageRedirects = ['translations-site-temp', 'translations', 'config', 'dao_articles', 'homepage', 'modals'];

const clearPrefix = (type?: string, prefix: string = '') => {
    if (!type) {
        return '';
    }

    return type.replace(`website_${prefix}`, '');
};

const linkResolver = (doc: prismicT.FilledLinkToDocumentField) => {
    if (exceptions.includes(doc.type)) {
        return null;
    }

    if (homepageRedirects.includes(clearPrefix(doc.type))) {
        return `/${doc.lang}`;
    }

    return `/${doc.lang}/${clearPrefix(doc.type, 'page_')}`;
};

export default linkResolver;
