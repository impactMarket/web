import { config, pages } from '../../../data';
import React, { createContext } from 'react';

const initialData: {
    page?: string;
    url?: string;
} = {};

export const DataContext = createContext(initialData);

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

    return { config, page: pageData, url };
};

export const DataConsumer = DataContext.Consumer;
