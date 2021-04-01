import { Col, DashboardCard, Div, Grid, Heading, Icon, Row, Section, Text } from '../../theme/components';
import { DashboardChart } from '../DashboardChart/DashboardChart';
import { DashboardNumericContent } from '../DashboardNumericContent/DashboardNumericContent';
import { GeneratedPropsTypes } from '../../theme/Types';
import { useData } from '../DataProvider/DataProvider';
import React from 'react';

type DashboardChartGroupProps = {
    charts: {
        chart: { [key: string]: any };
        growth?: number;
        heading?: string;
        numeric?: string;
    }[];
    heading?: string;
    text?: string;
};

export const DashboardChartGroup = (props: DashboardChartGroupProps & GeneratedPropsTypes) => {
    const { charts, heading, text, ...forwardProps } = props;
    const { getString } = useData();

    return (
        <Section pt={{ sm: 4, xs: 2 }} sBackground="backgroundLight" {...forwardProps}>
            <Grid>
                <Row>
                    <Col xs={12}>
                        <Heading h3>{heading}</Heading>
                        <Text mt={0.5} small>
                            {text}
                        </Text>
                    </Col>
                </Row>
                <Row mt={1}>
                    {charts.map(({ chart, growth, heading, numeric }, index) => (
                        <Col key={index} md={4} mt={{ md: 0, xs: index ? 1 : 0 }} xs={12}>
                            <DashboardCard>
                                <Text small textSecondary>
                                    {heading}
                                </Text>
                                {numeric && <DashboardNumericContent content={numeric} />}
                                {chart?.data && (
                                    <Div mt={1}>
                                        <DashboardChart {...chart} />
                                    </Div>
                                )}
                                {growth !== undefined && (
                                    <Div mt={0.5} sAlignItems="baseline">
                                        <Icon
                                            icon={growth > 0 ? 'arrowUp' : 'arrowDown'}
                                            sColor={growth > 0 ? 'success' : 'error'}
                                            sHeight={0.5}
                                        />
                                        <Text bold ml={0.25} small>
                                            {growth}%
                                        </Text>
                                        <Text XXSmall ml={0.25} textSecondary>
                                            {getString('vsPrevious30Days')}
                                        </Text>
                                    </Div>
                                )}
                            </DashboardCard>
                        </Col>
                    ))}
                </Row>
            </Grid>
        </Section>
    );
};
