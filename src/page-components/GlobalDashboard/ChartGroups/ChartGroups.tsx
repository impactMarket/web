import { GlobalDashboardChartGroup } from './GlobalDashboardChartGroup';
import { IGlobalDashboard } from '../../../apis/types';
import React from 'react';

type ChartGroupsProps = {
    data?: IGlobalDashboard;
    items?: {
        [key: string]: {
            charts: any[];
        };
    };
};

export const ChartGroups = (props: ChartGroupsProps) => {
    const { data, items } = props;
    const chartGroups = ['distribution', 'fundraising', 'economic'];

    return (
        <>
            {chartGroups.map((name, index) => (
                <GlobalDashboardChartGroup
                    data={data}
                    key={index}
                    name={name}
                    pb={index + 1 === chartGroups.length ? { sm: 4, xs: 2 } : 0}
                    {...items[name]}
                />
            ))}
        </>
    );
};
