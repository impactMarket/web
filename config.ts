/* eslint-disable sort-keys */
/* eslint-disable no-process-env */
export default {
    /**
     * Base URL to api
     */
    baseUrl: process.env.NEXT_PUBLIC_URL!,

    /**
     * Base URL to api
     */
    baseApiUrl: `${process.env.NEXT_PUBLIC_URL_API}/api`!,

    /**
     * cUSD decimals to use in ui format
     */
    cUSDDecimals: 18,

    /**
     * Base URL to api
     */
    chainExplorer: process.env.NEXT_PUBLIC_CHAIN_EXPLORER_URL!,

    /**
     * MaxAge for caching claims on users browser
     */
    cacheClaimsMaxAge: parseInt(process.env.NEX_PUBLIC_CACHE_CLAIMS_MAX_AGE!, 10)
};
