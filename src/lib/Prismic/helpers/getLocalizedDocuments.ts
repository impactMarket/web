import { PrismicDocument } from '../types';
import langConfig from '../../../../lang-config';

const defaultLang = langConfig.find(({ isDefault }) => isDefault)?.code;

export const getLocalizedDocument = (documents: PrismicDocument[], lang: string): PrismicDocument => {
    const defaultDocument = documents.find(
        ({ lang: documentLang }) => documentLang.toLowerCase() === defaultLang.toLowerCase()
    );

    if (lang.toLowerCase() === defaultLang.toLowerCase()) {
        return defaultDocument;
    }

    const localizedDocument = documents.find(
        ({ lang: documentLang }) => documentLang.toLowerCase() === lang.toLowerCase()
    );

    return localizedDocument || defaultDocument;
};

export const getLocalizedDocuments = (documents: PrismicDocument[], lang: string): PrismicDocument[] => {
    const defaultDocuments = documents.filter(
        ({ lang: documentLang }) => documentLang.toLowerCase() === defaultLang.toLowerCase()
    );

    if (lang.toLowerCase() === defaultLang.toLowerCase()) {
        return defaultDocuments;
    }

    const localizedDocuments = defaultDocuments.map((document: PrismicDocument) => {
        const { id: localizedDocumentId } =
            document?.alternate_languages.find(
                ({ lang: alternateLang }) => alternateLang.toLowerCase() === lang.toLowerCase()
            ) || {};

        const selectedDocument = documents.find(({ id }) => id === localizedDocumentId);

        return selectedDocument || document;
    });

    return localizedDocuments;
};
