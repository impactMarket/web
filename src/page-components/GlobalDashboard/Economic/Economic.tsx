import { DashboardChartGroup } from '../../../components';
import { IGlobalDashboard } from '../../../apis/types';
import { economic } from '../../../apis/economic';
import { useData } from '../../../components/DataProvider/DataProvider';
import React from 'react';

type EconomicProps = {
    data?: IGlobalDashboard;
    charts: any[];
};

export const Economic = (props: EconomicProps) => {
    const { data, charts, ...forwardProps } = props;
    const { getString } = useData();

    const chartsConfig = charts.map(({ heading, helper }) => {
        const helperData = economic[helper] ? economic[helper](data, getString) : {};

        return {
            ...helperData,
            heading
        };
    });

    return <DashboardChartGroup charts={chartsConfig} {...forwardProps} pb={{ sm: 4, xs: 2 }} />;
};
