/* eslint-disable radix */
import { Bar, BarChart, LabelList, ResponsiveContainer, Tooltip, XAxis, YAxis } from 'recharts';
import { Div, IconButton, Text, TooltipWrapper } from '../../../../theme/components';
import { String } from '../../../../components';
import { colors } from '../../../../theme/variables/colors';
import { ease, mq, transitions } from 'styled-gen';
import React, { useMemo, useState } from 'react';
import styled, { css } from 'styled-components';

type BeneficiariesProps = {
    data?: any;
    countriesCount?: number;
};

const genderColors: { [key: string]: string } = {
    female: '#F9ACFB',
    male: 'rgba(35, 98, 251, 0.5)'
};

const gender: { [key: string]: string } = { female: 'Woman', male: 'Man' };

type ICircleProps = {
    gender: string;
};

type BeneficiariesCountriesPageProps = {
    activePage?: number;
};

const Circle = styled.div<ICircleProps>`
    background-color: ${({ gender }) => genderColors[gender]};
    border-radius: 50%;
    display: inline-block;
    height: 8px;
    width: 8px;
`;

const LegendList = styled.ul`
    list-style: none;
    padding-left: 1rem;
    padding-top: 0.5rem;

    li {
        display: inline-flex;
        align-items: center;
    }

    ${mq.tablet(css`
        padding: 0;
        position: absolute;
        right: 1rem;
        top: 1rem;
    `)}
`;

const BeneficiariesCountriesWrapper = styled.div`
    overflow: hidden;
`;

const BeneficiariesCountries = styled.div`
    display: flex;
    position: relative;
    width: 100%;
`;

const BeneficiariesCountriesPage = styled.div<BeneficiariesCountriesPageProps>`
    ${transitions(['transform'], 500, ease.inOutCirc)};

    flex-shrink: 0;
    padding: 1rem 1rem 0;
    width: 100%;

    ${({ activePage }) =>
        activePage !== undefined &&
        css`
            transform: translateX(${-(activePage * 1 * 100)}%);
        `}

    .recharts-label {
        font-size: 0.75rem;
        font-weight: 500;
    }
`;

const Legend = () => (
    <LegendList>
        {Object.keys(gender).map((genderType: string, index) => (
            <li key={genderType} style={{ marginLeft: index ? 24 : 0 }}>
                <Circle gender={genderType} />
                <Text ml={0.75} small textSecondary>
                    {gender[genderType]}
                </Text>
            </li>
        ))}
    </LegendList>
);

const CustomTooltip = (props: any) => {
    const { active, payload = [] } = props;

    if (active && payload?.length) {
        const undisclosedPercentage = +((payload[0]?.payload?.undisclosed / payload[0]?.payload?.total) * 100).toFixed(
            2
        );

        return (
            <TooltipWrapper>
                {payload.map(({ name, payload: { total }, value }: any, index: number) => {
                    const percentage = +((parseInt(value) / total) * 100).toFixed(2);

                    return (
                        <Text key={index} semibold small>
                            {gender[name]}: {!isNaN(percentage) ? `${percentage}%` : '---'}
                        </Text>
                    );
                })}
                <Text semibold small>
                    Undisclosed: {!isNaN(undisclosedPercentage) ? `${undisclosedPercentage}%` : '---'}
                </Text>
            </TooltipWrapper>
        );
    }

    return null;
};

const CustomYAxisTick = (props: { y: number; payload: any }) => {
    const { y, payload } = props;

    return (
        <g transform={`translate(${0},${y + 3})`}>
            <text fill={colors.textPrimary} fontSize={10} textAnchor="start" x={0} y={0}>
                {payload.value}
            </text>
        </g>
    );
};

type PaginationStateProps = {
    first?: number;
    last?: number;
    page: number;
};

export const Beneficiaries = (props: BeneficiariesProps) => {
    const { data, countriesCount } = props;
    const [pagination, setPagination] = useState<PaginationStateProps>({ first: 1, last: 6, page: 0 });

    const changePage = (page: number) => {
        let nextPage = page;

        if (page < 0) {
            nextPage = data.length - 1;
        }

        if (data.length < page + 1) {
            nextPage = 0;
        }

        const first = 6 * nextPage + 1;
        const last = nextPage + 1 === data.length ? countriesCount : first - 1 + 6;

        return setPagination({ first, last, page: nextPage });
    };

    const rightOffset = useMemo(() => {
        const offsetArr = data.reduce((result: any, arr: any) => {
            const innerResults = arr.reduce((arrResult: any, innerData: any) => {
                if (!innerData) {
                    return arrResult;
                }

                const offset = Math.floor(innerData?.total?.toString()?.length) * 10 || 10;

                if (offset > arrResult) {
                    return offset;
                }

                return arrResult;
            }, []);

            return [...result, innerResults];
        }, []);

        return offsetArr;
    }, [data]);

    return (
        <BeneficiariesCountriesWrapper>
            <Legend />
            <BeneficiariesCountries>
                {data.map((chartData: any, index: number) => (
                    <BeneficiariesCountriesPage activePage={pagination.page} key={index}>
                        <ResponsiveContainer height={140} width="100%">
                            <BarChart
                                barSize={10}
                                data={chartData}
                                layout="vertical"
                                margin={{ bottom: 0, left: 0, right: rightOffset[index] || 0, top: 0 }}
                            >
                                <XAxis hide type="number" />
                                <YAxis
                                    axisLine={false}
                                    dataKey="country"
                                    interval={0}
                                    tick={tickProps => <CustomYAxisTick {...tickProps} />}
                                    tickLine={false}
                                    type="category"
                                    width={90}
                                />
                                <Tooltip
                                    content={<CustomTooltip />}
                                    cursor={{ fill: colors.backgroundLight, radius: 8 }}
                                />
                                {Object.keys(gender).map((genderType, index) => {
                                    const isLast = Object.keys(gender).length === index + 1;
                                    const isFirst = !index;

                                    return (
                                        <Bar
                                            dataKey={genderType}
                                            fill={genderColors[genderType]}
                                            key={index}
                                            radius={[isFirst ? 4 : 0, isLast ? 4 : 0, isLast ? 4 : 0, isFirst ? 4 : 0]}
                                            stackId="a"
                                        >
                                            {isLast && <LabelList dataKey="total" offset={8} position="right" />}
                                        </Bar>
                                    );
                                })}
                            </BarChart>
                        </ResponsiveContainer>
                    </BeneficiariesCountriesPage>
                ))}
            </BeneficiariesCountries>
            <Div
                sAlignItems="center"
                sJustifyContent={{ sm: 'flex-end', xs: 'center' }}
                sPadding={{ sm: '0 1 1', xs: 1 }}
            >
                <Text XXSmall>
                    <String
                        id="xOfCountries"
                        variables={{
                            first: pagination.first,
                            last: pagination.last,
                            total: countriesCount
                        }}
                    />
                </Text>
                <Div ml={1.5}>
                    <IconButton
                        disabled={pagination.page < 1}
                        icon="left"
                        onClick={() => changePage(pagination.page - 1)}
                    />
                    <IconButton
                        disabled={!(pagination.page + 1 < data.length)}
                        icon="right"
                        onClick={() => changePage(pagination.page + 1)}
                    />
                </Div>
            </Div>
        </BeneficiariesCountriesWrapper>
    );
};
