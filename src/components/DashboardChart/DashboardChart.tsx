import { DashboardChartTooltip } from '../DashboardChartTooltip/DashboardChartTooltip';
import { Line, LineChart, ResponsiveContainer, Tooltip, XAxis } from 'recharts';
import { colors } from '../../theme';
import React from 'react';

type DashboardChartProps = {
    data: any;
    dataKey: string;
    height: number;
    line?: boolean;
    tooltip: Function;
    xAxysDataKey: string;
};

export const DashboardChart = (props: DashboardChartProps) => {
    const { height = 130, tooltip, dataKey, data, xAxysDataKey } = props;

    return (
        <ResponsiveContainer height={height} width="100%">
            <LineChart data={data}>
                <XAxis dataKey={xAxysDataKey} hide />
                <Tooltip content={<DashboardChartTooltip tooltip={tooltip} />} />
                <Line dataKey={dataKey} dot={<></>} stroke={colors.brandPrimary} strokeWidth={2} type="monotone" />
            </LineChart>
        </ResponsiveContainer>
    );
};
