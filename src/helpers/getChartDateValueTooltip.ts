import { bracked } from './bracked';
import { format } from './dateHelpers';

export const getChartDateValueTooltip = (tooltip: string, payload: any, label: any): string => {
    // eslint-disable-next-line radix
    const date = format(parseInt(label!), 'MMMM do');
    const value = payload[0]?.value || '0';

    return bracked(tooltip || '', { date, value }) || '';
};
