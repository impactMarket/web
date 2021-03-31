import { Text } from '../../theme/components';
import { colors } from '../../theme';
import { rgba } from 'polished';
import React from 'react';
import styled from 'styled-components';

type DashboardChartTooltipProps = {
    active?: boolean;
    label?: string;
    payload?: any[];
    tooltip: Function;
};

const TooltipWrapper = styled.div`
    background-color: ${colors.white};
    border-radius: 0.5rem;
    padding: 1rem;
    box-shadow: 0 0 0.5rem ${rgba(colors.textPrimary, 0.16)};
`;

export const DashboardChartTooltip = (props: DashboardChartTooltipProps) => {
    const { active, payload, label, tooltip } = props;

    if (active && payload !== null && tooltip !== undefined) {
        return (
            <TooltipWrapper>
                <Text small>{tooltip(payload, label)}</Text>
            </TooltipWrapper>
        );
    }

    return null;
};
