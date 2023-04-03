import React, { createContext } from 'react';

const initialData: {
    data?: {
        [key: string]: number;
    };
} = {
    data: {
        activeBorrowers: 0,
        apr: 0,
        avgBorrowedAmount: 0,
        currentDebt: 0,
        earnedInterest: 0,
        estimatedMaturity: 0,
        inReview: 0,
        liquidityAvailable: 0,
        paidBack: 0,
        totalApplicants: 0,
        totalBorrowed: 0,
        totalDebitsRepaid: 0
    }
};

export const MicrocreditDashboardContext = createContext(initialData);

type ProviderProps = {
    children?: any;
    data: {
        activeBorrowers: number;
        apr: number;
        avgBorrowedAmount: number;
        currentDebt: number;
        earnedInterest: number;
        estimatedMaturity: number;
        inReview: number;
        liquidityAvailable: number;
        paidBack: number;
        totalApplicants: number;
        totalBorrowed: number;
        totalDebtisRepaid: number;
    };
};

export const MicrocreditDashboardProvider = ({ children, data }: ProviderProps) => {
    return <MicrocreditDashboardContext.Provider value={{ data }}>{children}</MicrocreditDashboardContext.Provider>;
};

export const useData = () => {
    const { data } = React.useContext(MicrocreditDashboardContext);

    return data;
};

export const MicrocreditDashboardConsumer = MicrocreditDashboardContext.Consumer;
