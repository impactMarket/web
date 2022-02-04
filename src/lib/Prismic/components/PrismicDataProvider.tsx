import React, { createContext } from 'react';
import baseConfig from '../../../../config';
import extractFromData from '../helpers/extractFromData';

const { isProduction } = baseConfig;

const initialData: {
    data?: any;
    page?: string;
    url?: string;
} = {};

export const PrismicDataContext = createContext(initialData);

type ProviderProps = {
    children?: any;
    data?: any;
    page?: string;
    url?: string;
};

export const PrismicDataProvider = ({ data, children, page, url }: ProviderProps) => {
    return <PrismicDataContext.Provider value={{ data, page, url }}>{children}</PrismicDataContext.Provider>;
};

type UsePrismicDataOptions = {
    list?: boolean;
};

export const usePrismicData = (options: UsePrismicDataOptions = {}) => {
    const { list } = options;
    const { data, page: pageName, url } = React.useContext(PrismicDataContext);
    const { config, modals, ...forwardData } = data || {};
    const page = data?.[pageName] || {};

    delete forwardData?.[pageName];

    const extractFromConfig = (key: string) => extractFromData(config?.data || {}, key);
    const extractFromPage = (key: string) => extractFromData(page?.data || {}, key);
    const extractFromModals = (modalName: string) => extractFromData(modals?.data || {}, modalName);

    if (list && !isProduction) {
        console.log(`Data from prismic\n`, { config, data: forwardData, modals, page, url });
    }

    return { config, data: forwardData, extractFromConfig, extractFromModals, extractFromPage, modals, page, url };
};

export const PrismicDataConsumer = PrismicDataContext.Consumer;
