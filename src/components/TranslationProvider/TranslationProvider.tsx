import { bracked } from '../../helpers/bracked';
import React, { createContext } from 'react';
import langConfig from '../../../lang-config';
// @ts-ignore
import translations from '../../../i18n/translations';

const defaultLang = langConfig.find(({ isDefault }) => isDefault)?.code?.toLowerCase() || 'en-us';

const initialData: {
    lang?: string;
    translations?: { [key: string]: any };
} = {
    lang: defaultLang,
    translations
};

export const TranslationContext = createContext(initialData);

type ProviderProps = {
    children?: any;
    locale?: string;
};

export const TranslationProvider = ({ children, locale }: ProviderProps) => {
    const lang = locale.toLocaleLowerCase();

    return <TranslationContext.Provider value={{ lang, translations }}>{children}</TranslationContext.Provider>;
};

const getTranslationFunction = (lang: string, translations: any) => {
    const t = (key: string, vars: object = {}) => {
        const string = translations?.[lang]?.[key] ?? translations?.[defaultLang]?.[key] ?? key;

        return bracked(string, vars);
    };

    return t;
};

export const getServerSideString = (locale: string, key: string, variables?: object) => {
    const t = getTranslationFunction(locale.toLowerCase(), translations);

    return t(key, variables);
};

export const useTranslation = () => {
    const { lang, translations } = React.useContext(TranslationContext);

    const t = getTranslationFunction(lang, translations);

    return { t };
};

export const TranslationConsumer = TranslationContext.Consumer;
