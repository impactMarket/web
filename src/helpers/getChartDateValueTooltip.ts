import { bracked } from './bracked';
import moment from 'moment';

export const getChartDateValueTooltip = (tooltip: string, payload: any, label: any): string => {
    // eslint-disable-next-line radix
    const date = moment(parseInt(label!)).format('MMMM Do');
    const value = payload[0]?.value || '--';

    return bracked(tooltip || '', { date, value }) || '';
};
