export type CommunityListRequestArguments = {
    country?: string;
    extended?: boolean;
    filter?: string;
    limit?: string | number;
    name?: string;
    orderBy?: string;
    page?: string | number;
};

export type CommunityListRequestResponseType = {
    count: number;
    items?: ICommunity[];
    page: number;
};

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

export interface IStory {
    storyMediaPath: string;
}

export interface IStories {
    data: IStory[];
    count: number;
    success: boolean;
}

export interface ICommunities {
    count: number;
    rows: ICommunity[];
}

export interface ICommunityCampaign {
    id: string | number;
    communityId: string | number;
    campaignUrl: string;
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
    cover: Cover;
    status: 'pending' | 'valid' | 'removed';
    started: Date;
}

export interface CommunityStateAttributes {
    contributors: number;
    beneficiaries: number;
    claimed: string;
    claims: number;
    contributed: string;
    claimAmount: string;
    maxClaim: string;
    baseInterval: number;
    ubiRate: number;
    estimatedDuration: number;
}

export interface CommunityContractAttributes {
    communityId: string | number;
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
    reachedLastMonth: {
        reach: number;
        reachOut: number;
    };
}

export interface ICommunity extends CommunityAttributes {
    campaign?: ICommunityCampaign;
    claimLocations?: IClaimLocationGps[];
    contract: CommunityContractAttributes;
    managers?: IManager[];
    metrics?: CommunityDailyMetricsAttributes | CommunityDailyMetricsAttributes[] | any;
    state: CommunityStateAttributes;
    dashboard: ICommunityDashboard;
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
