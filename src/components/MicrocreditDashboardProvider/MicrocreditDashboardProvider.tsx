import React, { createContext } from 'react';

const initialData: {
    data?: {
        [key: string]: number;
    };
    demographics?: {
        [key: string]: string | {};
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
    },
    demographics: {
        gender: {
            country: '0',
            male: '0',
            female: '0',
            undisclosed: '0',
            totalGender: '0'
        },
        ageRange: {
            paid: {
                ageRange1: '0',
                ageRange2: '0',
                ageRange3: '0',
                ageRange4: '0',
                ageRange5: '0',
                ageRange6: '0'
            },
            pending: {
                ageRange1: '0',
                ageRange2: '0',
                ageRange3: '0',
                ageRange4: '0',
                ageRange5: '0',
                ageRange6: '0'
            },
            overdue: {
                ageRange1: '0',
                ageRange2: '0',
                ageRange3: '0',
                ageRange4: '0',
                ageRange5: '0',
                ageRange6: '0'
            }
        }
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
    demographics: {
        gender: {
            country: string;
            male: string;
            female: string;
            undisclosed: string;
            totalGender: string;
        }[];
        ageRange: {
            paid: {
                ageRange1: string;
                ageRange2: string;
                ageRange3: string;
                ageRange4: string;
                ageRange5: string;
                ageRange6: string;
            };
            pending: {
                ageRange1: string;
                ageRange2: string;
                ageRange3: string;
                ageRange4: string;
                ageRange5: string;
                ageRange6: string;
            };
            overdue: {
                ageRange1: string;
                ageRange2: string;
                ageRange3: string;
                ageRange4: string;
                ageRange5: string;
                ageRange6: string;
            };
        };
    };
};

export const MicrocreditDashboardProvider = ({
    children,
    data,
    demographics
}: ProviderProps) => {
    return (
        <MicrocreditDashboardContext.Provider value={{ data, demographics }}>
            {children}
        </MicrocreditDashboardContext.Provider>
    );
};

export const useData = () => {
    const { data } = React.useContext(MicrocreditDashboardContext);

    return data;
};

export const useDemographics = () => {
    const { demographics } = React.useContext(MicrocreditDashboardContext);

    return demographics;
};

export const MicrocreditDashboardConsumer =
    MicrocreditDashboardContext.Consumer;
