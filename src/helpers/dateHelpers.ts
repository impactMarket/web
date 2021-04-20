import { format } from 'date-fns';

export const dateHelpers = {
    short: (date: string) => format(new Date(date), 'MMM d, y')
};
