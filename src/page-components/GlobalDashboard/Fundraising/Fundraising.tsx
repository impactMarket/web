import { DashboardChartGroup } from '../../../components';
import { IGlobalDashboard } from '../../../apis/types';
import { fundraising } from '../../../apis/fundraising';
import { useData } from '../../../components/DataProvider/DataProvider';
import React from 'react';

type FundraisingProps = {
    data?: IGlobalDashboard;
    charts: any[];
};

export const Fundraising = (props: FundraisingProps) => {
    const { data, charts, ...forwardProps } = props;
    const { getString } = useData();

    const chartsConfig = charts.map(({ heading, helper }) => {
        const helperData = fundraising[helper] ? fundraising[helper](data, getString) : {};

        return {
            ...helperData,
            heading
        };
    });

    return <DashboardChartGroup charts={chartsConfig} {...forwardProps} />;
};
