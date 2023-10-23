import {
    format as dateFnsFormat,
    differenceInMilliseconds,
    formatDistance,
    isPast
} from 'date-fns';
import { es, fr, ptBR } from 'date-fns/locale';
import langConfig from '../../lang-config';

declare global {
    interface Window {
        __localeId__: string;
    }
}

const dateLocales: { [key: string]: any } = { es, fr, ptBR };

const getLocale = () => {
    try {
        // eslint-disable-next-line no-underscore-dangle
        const dateFnsCode = langConfig.find(
            ({ code }) => code === window?.__localeId__
        )?.dateFnsCode;

        return dateLocales?.[dateFnsCode];
    } catch (error) {
        return;
    }
};

export const format = (date: any, formatString: string = 'PP') =>
    dateFnsFormat(date, formatString, { locale: getLocale() });

export const dateHelpers = {
    difference: (end: number | Date, start = new Date()) =>
        formatDistance(start, end, { locale: getLocale() }),

    isPast: (date: string | Date) => isPast(new Date(date)),

    short: (date: string | Date) =>
        date ? format(new Date(date), 'MMM d, y') : '',

    timeLeft: (date: string | Date) => {
        const today = new Date();
        const targetDate = new Date(date);

        let diff = differenceInMilliseconds(targetDate, today) / 1000;

        const days = Math.floor(diff / 86400);

        diff -= days * 86400;

        const hours = Math.floor(diff / 3600) % 24;

        diff -= hours * 3600;

        const minutes = Math.floor(diff / 60) % 60;

        diff -= minutes * 60;

        const seconds = Math.floor(diff / 60) % 60;

        return { days, hours, minutes, seconds };
    },

    monthsToSeconds: (month: number) => {
        const daysInMonth = 30.44; // Average number of days in a month
        const hoursInDay = 24; // Number of hours in a day
        const minutesInHour = 60; // Number of minutes in an hour
        const secondsInMinute = 60; // Number of seconds in a minute

        // Convert 1 month to seconds
        const oneMonthInSeconds =
            daysInMonth * hoursInDay * minutesInHour * secondsInMinute;

        // Convert 5 months to seconds
        const seconds = month * oneMonthInSeconds;

        return Math.floor(seconds);
    }
};
