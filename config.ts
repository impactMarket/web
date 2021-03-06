/* eslint-disable sort-keys */
/* eslint-disable no-process-env */
export default {
    /**
     * Base URL
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
     * MapBox API Key
     */
    mapBoxApiKey: process.env.NEXT_PUBLIC_MAPBOX_KEY!,

    /**
     * MapBox API style
     */
    mapBoxStyle: process.env.NEXT_PUBLIC_MAPBOX_STYLE!,

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
    recaptchaKey: process.env.NEXT_PUBLIC_RECAPTCHA_KEY
};
