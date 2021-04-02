import { Bar, BarChart, Line, LineChart, ResponsiveContainer, Tooltip, XAxis } from 'recharts';
import { DashboardChartTooltip } from '../DashboardChartTooltip/DashboardChartTooltip';
import { colors } from '../../theme';
import React from 'react';

type DashboardChartProps = {
    data?: any;
    dataKey?: string;
    height?: number;
    type?: 'bar' | 'line';
    tooltip?: Function;
    xAxysDataKey?: string;
};

const chartDefaultHeight = 110;

const chartComponents = {
    bar: {
        Chart: BarChart,
        ChartItem: Bar,
        itemProps: {
            barSize: 4,
            fill: colors.brandPrimary,
            radius: [4, 4, 4, 4]
        },
        tooltipProps: {
            cursor: { fill: colors.backgroundSecondary, radius: [4, 4, 4, 4] }
        }
    },
    line: {
        Chart: LineChart,
        ChartItem: Line,
        itemProps: {
            dot: <></>,
            stroke: colors.brandPrimary,
            strokeWidth: 2,
            type: 'monotone'
        }
    }
};

export const DashboardChart = (props: DashboardChartProps) => {
    const { data, dataKey = 'uv', height = chartDefaultHeight, tooltip, type = 'line', xAxysDataKey = 'name' } = props;
    const { Chart, ChartItem, itemProps, tooltipProps = {} }: { [key: string]: any } = chartComponents[type] || {};

    if (!Chart) {
        return null;
    }

    return (
        <ResponsiveContainer height={height} width="100%">
            <Chart data={data} margin={{ bottom: 0, left: 0, right: 0, top: 0 }}>
                <XAxis dataKey={xAxysDataKey} hide />
                {tooltip && <Tooltip content={<DashboardChartTooltip tooltip={tooltip} />} {...tooltipProps} />}
                <ChartItem dataKey={dataKey} {...itemProps} />
            </Chart>
        </ResponsiveContainer>
    );
};
