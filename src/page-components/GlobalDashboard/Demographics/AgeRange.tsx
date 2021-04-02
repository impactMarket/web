import { Bar, BarChart, LabelList, ResponsiveContainer, XAxis } from 'recharts';
import { Div } from '../../../theme/components';
import { colors } from '../../../theme';
import React from 'react';

type AgeRangeProps = {
    data: any[];
};

const CustomizedLabel = (props: { x?: string | number | undefined; y?: string | number | undefined; value?: any }) => {
    const { x, y, value } = props;

    if (!x || !y || value === undefined) {
        return null;
    }

    return (
        <g transform={`translate(${+x + 16},${+y - 8})`}>
            <text fill={colors.textPrimary} fontSize={12} textAnchor="middle" x={0} y={0}>
                {value}%
            </text>
        </g>
    );
};

export const AgeRange = (props: AgeRangeProps) => {
    const { data } = props;

    return (
        <Div mt="auto" pt={1}>
            <ResponsiveContainer height={140} width="100%">
                <BarChart data={data} margin={{ bottom: 0, left: 0, right: 0, top: 16 }}>
                    <XAxis
                        axisLine={false}
                        dataKey="label"
                        interval={0}
                        tick={{ fill: colors.brandSecondary, fontSize: '0.625rem' }}
                        tickLine={false}
                    />
                    <Bar dataKey="percentage" fill="rgba(116, 114, 243, 0.5)" maxBarSize={32} radius={[4, 4, 4, 4]}>
                        <LabelList content={labelProps => <CustomizedLabel {...labelProps} />} dataKey="percentage" />
                    </Bar>
                </BarChart>
            </ResponsiveContainer>
        </Div>
    );
};
