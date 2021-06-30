import { PartialDeep } from 'type-fest';
import { bracked } from '../../helpers/bracked';
import React, { createContext } from 'react';
import allLangs, { en as defaultData } from '../../../data';
import get from 'lodash/get';
import langConfig from '../../../lang-config';

const defaultLang = langConfig.find(({ isDefault }) => isDefault)?.shortCode || 'en';

type DataType = PartialDeep<typeof defaultData>;
type AllLangsData = Record<string, DataType>;
type StringsType = keyof typeof defaultData.config.strings;

const allLangsData: AllLangsData = allLangs;

const getLangShortCode = (locale: string) => langConfig.find(({ code }) => code === locale)?.shortCode || defaultLang;

const intialData: {
    lang?: string;
    page?: string;
    url?: string;
} = {
    lang: 'en'
};

export const DataContext = createContext(intialData);

type ProviderProps = {
    children?: any;
    locale?: string;
    page?: string;
    url?: string;
};

export const DataProvider = ({ children, locale, page, url }: ProviderProps) => {
    const lang = langConfig.find(({ code }) => code === locale)?.shortCode || defaultLang;

    return <DataContext.Provider value={{ lang, page, url }}>{children}</DataContext.Provider>;
};

const getDataPropByLang: any = (lang: string, prop: string) => {
    const result = get(allLangsData, `${lang}.${prop}`, get(defaultData, prop));

    return result;
};

export const getServerSideString = (locale: string, key: string, variables?: object) =>
    bracked(getDataPropByLang(getLangShortCode(locale), `config.strings.${key}`), variables);

const getDataContentByLang: any = (lang: string, key: string) => {
    let results;
    const langData: any = allLangsData[lang] || defaultData;
    const content = get(langData, key, get(defaultData, key));
    const mapContent = get(defaultData, key);

    if (typeof content === 'string' || typeof content === 'number' || Array.isArray(content)) {
        return content;
    }

    if (typeof content === 'object') {
        results = Object.keys(mapContent).reduce(
            (result, itemKey) => ({
                ...result,
                [itemKey]: getDataContentByLang(lang, `${key}.${itemKey}`)
            }),
            {}
        );
    }

    return results;
};

export const useData = () => {
    const { lang, page, url } = React.useContext(DataContext);

    const getData: any = (prop: string) => getDataPropByLang(lang, prop);
    const getDataContent: any = (prop: string) => getDataContentByLang(lang, prop);

    const config: PartialDeep<typeof defaultData.config> = getDataContent('config');
    const getModal = (modal: string) => getDataContent(`modals.${modal}`);
    const getString = (key: StringsType, vars: any | undefined = {}) => bracked(getData(`config.strings.${key}`), vars);
    const pageData: any = getDataContent(`pages.${page}`);
    const seo: Partial<typeof defaultData.config.seo> = {
        ...(getDataContent(`pages.${page}.seo`) || getDataContent(`config.seo`)),
        url
    };

    return { config, getModal, getString, page: pageData, seo };
};

export const DataConsumer = DataContext.Consumer;
