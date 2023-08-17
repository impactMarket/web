// This file configures the initialization of Sentry on the server.
// The config you add here will be used whenever the server handles a request.
// https://docs.sentry.io/platforms/javascript/guides/nextjs/

import * as Sentry from '@sentry/nextjs';
import config from './config';

Sentry.init({
    // eslint-disable-next-line no-process-env
    debug: process.env.NODE_ENV === 'development',
    dsn: config.sentryDSN,
    enabled:
        // eslint-disable-next-line no-process-env
        process.env.NODE_ENV !== 'development' && config.useTestNet !== true,
    // Adjust this value in production, or use tracesSampler for greater control
    tracesSampler: (samplingContext) => {
        const error = samplingContext.transactionContext;

        // if there's any user action, send 100%
        // (it tracks only extremely important errors)
        if (error && error.tags && error.tags['user_activity']) {
            return 1;
        }

        return 0.1;
    }
});
