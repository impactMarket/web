import React, { createContext } from 'react';

const initialData: {
    metrics?: {
        [key: string]: number | string;
    };
} = {
    metrics: {
        backers: 0,
        beneficiaries: '',
        claimed: '',
        communities: 0,
        countries: 0
    }
};

export const CommunityMetricsContext = createContext(initialData);

type ProviderProps = {
    children?: any;
    metrics?: {
        backers?: number;
        beneficiaries: string;
        claimed: string;
        communities: number;
        countries: number;
    };
};

export const CommunityMetricsProvider = ({ children, metrics }: ProviderProps) => {
    return <CommunityMetricsContext.Provider value={{ metrics }}>{children}</CommunityMetricsContext.Provider>;
};

export const useData = () => {
    const { metrics } = React.useContext(CommunityMetricsContext);

    return metrics;
};

export const CommunityMetricsConsumer = CommunityMetricsContext.Consumer;
