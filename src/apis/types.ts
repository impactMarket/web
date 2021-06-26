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

export interface ICommunities {
    count: number;
    data: ICommunity[];
}

export interface IGlobalDailyState {
    date: Date;
    avgMedianSSI: number;
    claimed: string;
    claims: number;
    beneficiaries: number;
    raised: string;
    backers: number;
    volume: string;
    transactions: number;
    reach: number;
    reachOut: number;
    totalRaised: string;
    totalDistributed: string;
    totalBackers: number;
    totalBeneficiaries: number;
    givingRate: number;
    ubiRate: number;
    fundingRate: number;
    spendingRate: number;
    avgComulativeUbi: string;
    avgUbiDuration: number;
    totalVolume: string;
    totalTransactions: BigInt;
    totalReach: BigInt;
    totalReachOut: BigInt;
}

export interface IGlobalApiResult {
    monthly: IGlobalDailyState[];
    lastQuarterAvgSSI: { date: Date; avgMedianSSI: number }[];
    today: { totalClaimed: string; totalBeneficiaries: number; totalRaised: string };
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

// API and app
export interface CommunityAttributes {
    id: string | number;
    publicId: string;
    requestByAddress: string;
    contract?: CommunityContractAttributes;
    contractAddress: string | null;
    name: string;
    description: string;
    descriptionEn: string | null;
    language: string;
    currency: string;
    city: string;
    country: string;
    gps: {
        latitude: number;
        longitude: number;
    };
    email: string;
    visibility: 'public' | 'private';
    coverImage: string;
    status: 'pending' | 'valid' | 'removed';
    started: Date;
}

export interface CommunityStateAttributes {
    backers: number;
    beneficiaries: number;
    claimed: string;
    claims: number;
    raised: string;
}

export interface CommunityContractAttributes {
    baseInterval: number;
    claimAmount: string;
    incrementInterval: number;
    maxClaim: string;
}

export interface CommunityDailyMetricsAttributes {
    date: Date;
    estimatedDuration: number;
    ssi: number;
    ssiDayAlone: number;
    ubiRate: number;
}

export interface IUser {
    address: string;
    avatar?: {
        url?: string;
    };
    createdAt: string;
    username?: string;
}

export interface IManager {
    active: boolean;
    address: string;
    id: string | number;
    user: IUser;
}

export interface ICommunityDashboard {
    dailyState: IGlobalDailyState[];
    metrics: CommunityDailyMetricsAttributes[];
}

export interface ICommunity extends CommunityAttributes {
    claimLocations?: IClaimLocationGps[];
    contract: CommunityContractAttributes;
    managers?: IManager[];
    metrics?: CommunityDailyMetricsAttributes;
    state: CommunityStateAttributes;
    dashboard: ICommunityDashboard;
    reachedLastMonth?: any;
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

export type DataResponseType<T> = {
    count?: number;
    success?: boolean;
    data?: T;
};
