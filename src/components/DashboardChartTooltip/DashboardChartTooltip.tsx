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
                <Text semibold small>
                    {tooltip(payload, label)}
                </Text>
            </TooltipWrapper>
        );
    }

    return null;
};
