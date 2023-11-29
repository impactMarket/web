import { Text, TooltipWrapper } from '../../theme/components';
import React from 'react';

type DashboardChartTooltipProps = {
    active?: boolean;
    label?: string;
    payload?: any[];
    tooltip: Function;
};

export const DashboardChartTooltip = (props: DashboardChartTooltipProps) => {
    const { active, payload, label, tooltip } = props;

    if (active && payload !== null && tooltip !== undefined) {
        return (
            <TooltipWrapper>
                <Text sFontWeight={600} small>
                    {tooltip(payload, label)}
                </Text>
            </TooltipWrapper>
        );
    }

    return null;
};
