import { format as dateFnsFormat, differenceInMilliseconds } from 'date-fns';
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
        const dateFnsCode = langConfig.find(({ code }) => code === window?.__localeId__)?.dateFnsCode;

        return dateLocales?.[dateFnsCode];
    } catch (error) {
        return;
    }
};

export const format = (date: any, formatString: string = 'PP') =>
    dateFnsFormat(date, formatString, { locale: getLocale() });

export const dateHelpers = {
    short: (date: string) => format(new Date(date), 'MMM d, y'),

    timeLeft: (date: string) => {
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
    }
};
