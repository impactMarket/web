import { Col, DashboardCard, Grid, Heading, Row, Section, Text } from '../../../theme/components';
import { DashboardNumericContent } from '../../../components';
import { IGlobalDashboard } from '../../../apis/types';
import { dashboard as dashboardHelpers } from '../../../apis/dashboard';
import { useData } from '../../../components/DataProvider/DataProvider';
import React from 'react';

type GlobalProps = {
    data?: IGlobalDashboard;
    heading?: string;
    rows?: {
        heading?: string;
        items?: {
            heading?: string;
            helper?: string;
        }[];
    }[];
    text?: string;
};

export const Global = (props: GlobalProps) => {
    const { data, heading, rows, text } = props;
    const { getString } = useData();

    return (
        <Section pt={2} sBackground="backgroundLight">
            <Grid>
                <Row>
                    <Col xs={12}>
                        <Heading h2>{heading}</Heading>
                        <Text mt={0.5} small>
                            {text}
                        </Text>
                    </Col>
                </Row>
                {rows &&
                    rows.map(({ heading, items: colItems }, index) => (
                        <React.Fragment key={index}>
                            <Row mb={0.5} mt={2}>
                                <Col xs={12}>
                                    <Heading h6>{heading}</Heading>
                                </Col>
                            </Row>
                            <Row vGutter={1.25}>
                                {colItems &&
                                    colItems.map(({ heading: colHeading, helper }, colIndex) => (
                                        <Col key={colIndex} md={3} sm={6} xs={12}>
                                            <DashboardCard>
                                                <Text body ellipsis textSecondary>
                                                    {colHeading}
                                                </Text>
                                                <DashboardNumericContent
                                                    content={dashboardHelpers.getHelper(helper, data, getString)}
                                                    mt="auto"
                                                />
                                            </DashboardCard>
                                        </Col>
                                    ))}
                            </Row>
                        </React.Fragment>
                    ))}
            </Grid>
        </Section>
    );
};
