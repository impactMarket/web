const cookieConsentDismissed = 'dismissed';
const cookieConsentKey = 'hasCookieConsentDismissed';

export const setCookieConsentDismissed = () => window.localStorage.setItem(cookieConsentKey, cookieConsentDismissed);

export const hasCookieConsentDismissed = () => {
    const isCookieConsentDismissed = window.localStorage.getItem(cookieConsentKey);

    return isCookieConsentDismissed === cookieConsentDismissed;
};
