import * as Sentry from '@sentry/browser';

export default function processTransactionError(
    error: any,
    userActivity: string
) {
    Sentry.withScope((scope) => {
        // group errors together based on their request and response
        scope.setTag('user_activity', userActivity);
        Sentry.captureException(error);
    });
}