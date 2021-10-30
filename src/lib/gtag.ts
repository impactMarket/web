import config from '../../config';

const { gaId } = config;

// https://developers.google.com/analytics/devguides/collection/gtagjs/pages
export const pageview = (url: string) => {
    const { gtag } = window as any;

    if (!gtag) {
        return;
    }

    gtag('config', gaId, {
        page_path: url
    });
};

type EventProps = {
    action?: string;
    category?: string;
    label?: string;
    value?: string;
};

// https://developers.google.com/analytics/devguides/collection/gtagjs/events
export const event = ({ action, category, label, value }: EventProps) => {
    const { gtag } = window as any;

    if (!gtag) {
        return;
    }

    gtag('event', action, {
        event_category: category,
        event_label: label,
        value
    });
};
