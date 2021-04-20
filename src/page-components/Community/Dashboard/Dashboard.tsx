import { Col, Grid, Heading, Row, Section } from '../../../theme/components';
import { DashboardChartGroup } from '../../../components';
import { ICommunity } from '../../../apis/types';
import { communityDashboardDistribution } from '../../../apis/communityDashboardDistribution';
import { communityDashboardEconomic } from '../../../apis/communityDashboardEconomic';
import { communityDashboardFundraising } from '../../../apis/communityDashboardFundraising';
import { useData } from '../../../components/DataProvider/DataProvider';
import React from 'react';

const chartHelpers: { [key: string]: any } = {
    distribution: communityDashboardDistribution,
    fundraising: communityDashboardFundraising,
    // eslint-disable-next-line sort-keys
    economic: communityDashboardEconomic
};

export const Dashboard = (props: ICommunity) => {
    const { getString, page } = useData();

    const getChartGroupData = (name: string) => page?.dashboard?.[name] || {};

    const getCharts = (name: string) => {
        const item = getChartGroupData(name);

        const charts = item.charts.map(({ heading, helper }: { heading: string; helper: string }) => {
            const helperData = chartHelpers[name][helper] ? chartHelpers[name][helper](props, getString) : {};

            return {
                ...helperData,
                heading
            };
        });

        return charts || [];
    };

    return (
        <>
            <Section mt={2} sBackground="backgroundLight" sPadding="2 0 0">
                <Grid>
                    <Row>
                        <Col xs={12}>
                            <Heading h2>{getString('communityDashboard')}</Heading>
                        </Col>
                    </Row>
                </Grid>
            </Section>
            {Object.keys(chartHelpers).map((name, index) => (
                <DashboardChartGroup
                    {...getChartGroupData(name)}
                    charts={getCharts(name)}
                    key={index}
                    pb={Object.keys(chartHelpers).length === index + 1 ? 4 : 0}
                />
            ))}
        </>
    );
};
