

export interface GlobalGrowth {
    date: Date;
    claimed: number;
    claims: number;
    beneficiaries: number;
    raised: number;
    backers: number;
    fundingRate: number;
    volume: number;
    transactions: number;
    reach: number;
    reachOut: number;
}

export interface IClaimLocationGps {
    latitude: number;
    longitude: number;
}

export interface IClaimLocation {
    gps: IClaimLocationGps;
}

export interface IMicrocreditData {
    totalApplications: number;
    inReview: number;
    estimatedMaturity: number;
    avgBorrowedAmount: number;
    apr: number;
    totalBorrowed: number;
    currentDebt: number;
    paidBack: number;
    earnedInterest: number;
    activeBorrowers: number;
    totalDebitsRepaid: number;
    liquidityAvailable: number;
}

export interface IMicrocredit {
    data: IMicrocreditData[];
    success: boolean;
}

export interface IMicrocreditDemographicsData {
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
}

export interface IMicrocreditDemographics {
    data: IMicrocreditDemographicsData[];
    success: boolean;
}

export interface IStory {
    storyMediaPath: string;
}

export interface IStories {
    data: IStory[];
    count: number;
    success: boolean;
}


export interface IGlobalDailyState {
    avgComulativeUbi: string;
    avgMedianSSI: number;
    avgUbiDuration: number;
    backers: number;
    beneficiaries: number;
    claimed: string;
    claims: number;
    date: Date;
    fundingRate: number;
    givingRate: number;
    monthlyBackers: number;
    raised: string;
    reach: number;
    reachOut: number;
    spendingRate: number;
    totalBackers: number;
    totalBeneficiaries: number;
    totalDistributed: string;
    totalRaised: string;
    totalReach: BigInt;
    totalReachOut: BigInt;
    totalTransactions: BigInt;
    totalVolume: string;
    transactions: number;
    ubiRate: number;
    volume: string;
}

export interface IGlobalApiResult {
    monthly: IGlobalDailyState[];
    general: {
        id: string;
        claimed: string;
        claims: number;
        beneficiaries: number;
        contributed: string;
        contributors: number;
        volume: string;
        transactions: number;
        reach: number;
    };
    daily: {
        id: string;
        claimed: string;
        claims: number;
        beneficiaries: number;
        contributed: string;
        contributors: number;
        fundingRate: string;
        volume: string;
        transactions: number;
        reach: number;
    }[];
    lastQuarterAvgSSI: { date: Date; avgMedianSSI: number }[];
    today: {
        totalClaimed: string;
        totalBeneficiaries: number;
        totalRaised: string;
    };
    totalBackers: number;
    reachedLastMonth: {
        reach: number;
        reachOut: number;
    };
    growth: GlobalGrowth;
}

export interface IGlobalDashboard extends IGlobalApiResult {
    demographics?: IDemographics[];
}

export interface IGlobalNumbers {
    data: {
        claimed: string;
        countries: number;
        beneficiaries: number;
        backers: number;
        communities: number;
    };
}

export interface IGlobalValue {
    title: string;
    subtitle: string;
    postsubtitle?: string;
}

export interface Cover {
    height: number;
    id: number;
    thumbnails: {
        height: number;
        id: number;
        mediaContentId: number;
        pixelRatio: number;
        url: string;
        width: number;
    }[];
    url: string;
    width: number;
}

// API and app

export interface IUser {
    address: string;
    avatar?: {
        url?: string;
    };
    createdAt: string;
    username?: string;
}

// in app

export interface ChartData {
    title: string;
    subtitle: string;
    postsubtitle: string;
    data: {
        name: number;
        uv: number;
    }[];
    line: boolean;
    tooltip: string;
    growth: number;
}

export interface IDemographics {
    id: string | number;
    date: Date;
    country: string;
    male: number;
    female: number;
    ageRange1: number;
    ageRange2: number;
    ageRange3: number;
    ageRange4: number;
    ageRange5: number;
    ageRange6: number;
    createdAt: Date;
    totalGender: number;
    undisclosed: number;
    updatedAt: Date;
}
