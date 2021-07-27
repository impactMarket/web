import { Col, Grid, Heading, Row, Section } from '../../../theme/components';
import { DashboardChartGroup, String, Warning } from '../../../components';
import { ICommunity } from '../../../apis/types';
import { communityDashboardDistribution } from '../../../apis/communityDashboardDistribution';
import { communityDashboardEconomic } from '../../../apis/communityDashboardEconomic';
import { communityDashboardFundraising } from '../../../apis/communityDashboardFundraising';
import { useData } from '../../../components/DataProvider/DataProvider';
import { useTranslation } from '../../../components/TranslationProvider/TranslationProvider';
import React from 'react';

const chartHelpers: { [key: string]: any } = {
    distribution: communityDashboardDistribution,
    fundraising: communityDashboardFundraising,
    // eslint-disable-next-line sort-keys
    economic: communityDashboardEconomic
};

export const Dashboard = (props: ICommunity) => {
    const { page } = useData();
    const { t } = useTranslation();
    const withDashboard = !!props?.dashboard?.dailyState?.length;

    const getChartGroupData = (name: string) => ({
        ...page?.dashboard?.[name],
        heading: t(`page.community.dashboard.${name}.heading`),
        text: t(`page.community.dashboard.${name}.text`)
    });

    const getCharts = (name: string) => {
        const item = getChartGroupData(name);

        const charts = item.charts.map(({ labelKey, name: helper }: { labelKey?: string; name: string }) => {
            const helperData = chartHelpers[name][helper] ? chartHelpers[name][helper](props, t) : {};

            return {
                ...helperData,
                heading: t(labelKey || helper)
            };
        });

        return charts || [];
    };

    return (
        <>
            <Section
                mt={2}
                pb={{ sm: !withDashboard ? 4 : 0, xs: !withDashboard ? 2 : 0 }}
                sBackground={withDashboard && 'backgroundLight'}
                sPadding="2 0 0"
            >
                <Grid>
                    <Row>
                        <Col xs={12}>
                            <Heading h2>
                                <String id="communityDashboard" />
                            </Heading>
                        </Col>
                    </Row>
                    {!withDashboard && (
                        <Warning mt={1}>
                            <String id="page.community.dashboard.recentCommunityWarning" />
                        </Warning>
                    )}
                </Grid>
            </Section>
            {withDashboard &&
                Object.keys(chartHelpers).map((name, index) => (
                    <DashboardChartGroup
                        {...getChartGroupData(name)}
                        charts={getCharts(name)}
                        key={index}
                        pb={Object.keys(chartHelpers).length === index + 1 ? 4 : 0}
                        pt={{ sm: index === 0 ? 2 : 4, xs: 2 }}
                    />
                ))}
        </>
    );
};
