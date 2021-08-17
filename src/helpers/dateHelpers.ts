import { format as dateFnsFormat } from 'date-fns';
import { es, fr, ptBR } from 'date-fns/locale';
import langConfig from '../../lang-config';

declare global {
    interface Window {
        __localeId__: string;
    }
}

const dateLocales: { [key: string]: any } = { es, fr, ptBR };

const getLocale = () => {
    if (!window) {
        return;
    }

    // eslint-disable-next-line no-underscore-dangle
    const dateFnsCode = langConfig.find(({ code }) => code === window?.__localeId__)?.dateFnsCode;

    return dateLocales?.[dateFnsCode];
};

export const format = (date: any, formatString: string = 'PP') =>
    dateFnsFormat(date, formatString, { locale: getLocale() });

export const dateHelpers = {
    short: (date: string) => format(new Date(date), 'MMM d, y')
};
