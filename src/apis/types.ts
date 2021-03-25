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

export interface IClaimLocation {
    gps: {
        latitude: number;
        longitude: number;
    };
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

export interface IGlobalValue {
    title: string;
    subtitle: string;
    postsubtitle?: string;
}

// API and app
export interface CommunityAttributes {
    publicId: string;
    requestByAddress: string;
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
    claimed: string;
    claims: number;
    beneficiaries: number;
    raised: string;
    backers: number;
}

export interface CommunityContractAttributes {
    claimAmount: string;
    maxClaim: string;
    baseInterval: number;
    incrementInterval: number;
}

export interface CommunityDailyMetricsAttributes {
    ssiDayAlone: number;
    ssi: number;
    ubiRate: number;
    estimatedDuration: number;
    date: Date;
}

export interface ICommunity extends CommunityAttributes {
    state: CommunityStateAttributes;
    contract: CommunityContractAttributes;
    metrics?: CommunityDailyMetricsAttributes;
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
