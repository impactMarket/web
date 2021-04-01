import { DashboardChartGroup } from '../../../components';
import { IGlobalDashboard } from '../../../apis/types';
import { distribution } from '../../../apis/distribution';
import { useData } from '../../../components/DataProvider/DataProvider';
import React from 'react';

type DistributionProps = {
    data?: IGlobalDashboard;
    charts: any[];
};

export const Distribution = (props: DistributionProps) => {
    const { data, charts, ...forwardProps } = props;
    const { getString } = useData();

    const chartsConfig = charts.map(({ heading, helper }) => {
        const helperData = distribution[helper] ? distribution[helper](data, getString) : {};

        return {
            ...helperData,
            heading
        };
    });

    return <DashboardChartGroup charts={chartsConfig} {...forwardProps} />;
};
