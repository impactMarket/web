import { DashboardChartGroup } from '../../../components';
import { IGlobalDashboard } from '../../../apis/types';
import { distribution } from '../../../apis/distribution';
import { economic } from '../../../apis/economic';
import { fundraising } from '../../../apis/fundraising';
import { useTranslation } from '../../../components/TranslationProvider/TranslationProvider';
import React from 'react';

const api: { [key: string]: any } = {
    distribution,
    economic,
    fundraising
};

type GlobalDashboardChartGroupProps = {
    data?: IGlobalDashboard;
    charts: any[];
    name: string;
    pb: object | number;
};

export const GlobalDashboardChartGroup = (props: GlobalDashboardChartGroupProps) => {
    const { data, charts, name, ...forwardProps } = props;
    const { t } = useTranslation();

    const chartsConfig = charts.map(({ labelKey, name: helper }) => {
        const helperData = api[name][helper] ? api[name][helper](data, t) : {};

        return {
            ...helperData,
            heading: t(labelKey || helper)
        };
    });

    const composedProps = {
        ...forwardProps,
        heading: t(`page.globalDashboard.${name}.heading`),
        text: t(`page.globalDashboard.${name}.text`)
    };

    return <DashboardChartGroup charts={chartsConfig} {...composedProps} />;
};
