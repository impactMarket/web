import { Bar, BarChart, LabelList, ResponsiveContainer, XAxis } from 'recharts';
import { Div } from '../../theme/components';
import { colors } from '../../theme';
import React, { useEffect, useState } from 'react';

type AgeRangeProps = {
    data: object | any[];
};

const CustomizedLabel = (props: {
    x?: string | number | undefined;
    y?: string | number | undefined;
    value?: number | string;
}) => {
    const { x, y, value } = props;

    if (!x || !y || value === undefined) {
        return null;
    }

    return (
        <g transform={`translate(${+x + 10},${+y - 7})`}>
            <text
                color={colors.g700}
                fontSize={12}
                textAnchor="middle"
                x={0}
                y={0}
                fontWeight="700"
            >
                {value}
            </text>
        </g>
    );
};

export const AgeRange = (props: AgeRangeProps) => {
    const { data } = props;

    const [updatedData, setUpdatedData] = useState<
        { label: string; value: number }[] | undefined
    >();

    useEffect(() => {
        if (data) {
            const transformedData = Object.entries(data).map(([key, value]) => {
                let label = '';

                switch (key) {
                    case 'ageRange1':
                        label = '18 - 24';
                        break;
                    case 'ageRange2':
                        label = '25 - 34';
                        break;
                    case 'ageRange3':
                        label = '35 - 44';
                        break;
                    case 'ageRange4':
                        label = '45 - 54';
                        break;
                    case 'ageRange5':
                        label = '55 - 65';
                        break;
                    case 'ageRange6':
                        label = '65+';
                        break;
                    default:
                        break;
                }

                return {
                    label,
                    value: parseInt(value)
                };
            });

            setUpdatedData(transformedData);
        }
    }, [data]);

    return (
        <Div mt="auto" pt={1}>
            <ResponsiveContainer height={140} width="100%">
                <BarChart
                    data={updatedData}
                    margin={{ bottom: 0, left: 0, right: 0, top: 16 }}
                >
                    <XAxis
                        axisLine={false}
                        dataKey="label"
                        interval={0}
                        tick={{
                            color: colors.g500,
                            fontSize: '0.75rem'
                        }}
                        tickLine={false}
                    />
                    <Bar
                        dataKey="value"
                        fill={colors.p500}
                        maxBarSize={20}
                        radius={[4, 4, 4, 4]}
                    >
                        <LabelList
                            content={(labelProps) => (
                                <CustomizedLabel {...labelProps} />
                            )}
                            dataKey="value"
                        />
                    </Bar>
                </BarChart>
            </ResponsiveContainer>
        </Div>
    );
};
