import { config, modals, pages } from '../../../data';
import React, { createContext } from 'react';

const intialData: {
    page?: string;
    url?: string;
} = {};

export const DataContext = createContext(intialData);

type ProviderProps = {
    children?: any;
    page?: string;
    url?: string;
};

export const DataProvider = ({ children, page, url }: ProviderProps) => {
    return <DataContext.Provider value={{ page, url }}>{children}</DataContext.Provider>;
};

export const useData = () => {
    const { page, url } = React.useContext(DataContext);

    const pageData: any = pages?.[page] || {};

    return { config, modals, page: pageData, url };
};

export const DataConsumer = DataContext.Consumer;
