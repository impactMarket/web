/* eslint-disable sort-keys */
/* eslint-disable no-process-env */
const config = {
    /**
     * Base URL
     */
    baseUrl: process.env.NEXT_PUBLIC_URL!,

    /**
     * Base URL to api
     */
    baseApiUrl: `${process.env.NEXT_PUBLIC_URL_API}/api/v2`!,

    /**
     * cUSD decimals to use in ui format
     */
    cUSDDecimals: 18,

    /**
     * MapBox API Key
     */
    mapBoxApiKey: process.env.NEXT_PUBLIC_MAPBOX_KEY!,

    /**
     * MapBox API style
     */
    mapBoxStyle: process.env.NEXT_PUBLIC_MAPBOX_STYLE!,

    /*
     * Images URL
     */
    imagesUrl: process.env.NEXT_PUBLIC_IMAGES_URL!,

    /*
     * Images Bucket
     */
    imagesBucket: process.env.NEXT_PUBLIC_IMAGES_BUCKET!,

    /**
     * Base URL to api
     */
    chainExplorer: process.env.NEXT_PUBLIC_CHAIN_EXPLORER_URL!,

    /**
     * MaxAge for caching claims on users browser
     */
    cacheClaimsMaxAge: parseInt(process.env.NEX_PUBLIC_CACHE_CLAIMS_MAX_AGE!, 10),

    /**
     * Google Analytics
     */
    gaId: process.env.NEXT_PUBLIC_GA,

    /**
     * Hubspot
     */
    hubspotId: process.env.NEXT_PUBLIC_HUBSPOT,

    /**
     * Hubspot contact form
     */
    hubspotContactFormId: process.env.NEXT_PUBLIC_HUBSPOT_CONTACT_FORM,

    /**
     * ReCaptcha key
     */
    recaptchaKey: process.env.NEXT_PUBLIC_RECAPTCHA_KEY,

    /*
     * is Production
     */
    isProduction: process.env.NODE_ENV === 'production',

    /*
     * RPC URL
     */
    networkRpcUrl: process.env.NEXT_PUBLIC_NETWORK_RPC_URL,

    /*
     * Voting platform
     */
    votingPlatformUrl: 'https://commonwealth.im/impactmarket/proposal/:id',

    /*
     * Wallet addresses
     */
    wallets: {
        btc: 'bc1qe7ksg8va9uzfu4pl9ea8zyftad94p0tgtuavk4',
        celo: '0xC483Cd9FC68e58074d1D82b7a9fFdE948Db6d119',
        eth: '0x4D93536aa77FE4fDD48DC7f2c228410eC49c233C'
    },

    /*
     * Treasury address
     */
    treasuryAddress: process.env.NEXT_PUBLIC_TREASURY_ADDRESS,

    /**
     * Subgraph URL
     */
    subgraphUrl: process.env.NEXT_PUBLIC_SUBGRAPH_URL,

    /**
     * Chain ID
     */
    chainId: parseInt(process.env.NEXT_PUBLIC_CHAIN_ID!, 10),

    /**
     * Number of days until a signature is expired
     */
    signatureExpires: process.env.NEXT_PUBLIC_SIGNATURE_EXPIRES,

    /**
     * Signature message to confirm signature
     */
    signatureMessage: process.env.NEXT_PUBLIC_SIGNATURE_MESSAGE,

    /**
     * Signature secret
     */
    signatureSecret: process.env.NEXT_PUBLIC_SIGNATURE_SECRET,

    /**
     * Deposit Token
     */
    depositToken: process.env.NEXT_PUBLIC_DEPOSIT_TOKEN,

    /**
     * WalletConnect project id, mandatory for WalletConnect v2
     */
    walletConnectProjectId: process.env.NEXT_PUBLIC_WALLET_CONNECT_PROJECT_ID!,

    /**
     * Sentry DSN
     */
    sentryDSN: process.env.NEXT_PUBLIC_SENTRY_DSN,

    /**
     * Use testnet
     */
    useTestNet: process.env.NEXT_PUBLIC_USE_TESTNET === 'true',
};

export default config;
