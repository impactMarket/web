import { Col, DashboardCard, Grid, Heading, Row, Section, Text } from '../../../../theme/components';
import { DashboardNumericContent, String } from '../../../../components';
import { IGlobalDashboard } from '../../../../apis/types';
import { dashboard as dashboardHelpers } from '../../../../apis/dashboard';
import { useTranslation } from '../../../../components/TranslationProvider/TranslationProvider';
import React from 'react';

type GlobalProps = {
    data?: IGlobalDashboard;
    rows?: {
        items?: {
            labelKey?: string;
            name?: string;
        }[];
        labelKey?: string;
    }[];
};

export const Global = (props: GlobalProps) => {
    const { data, rows } = props;
    const { t } = useTranslation();

    return (
        <Section pt={2} sBackground="backgroundLight">
            <Grid>
                <Row>
                    <Col xs={12}>
                        <Heading h2>
                            <String id="page.globalDashboard.global.heading" />
                        </Heading>
                        <Text mt={0.5} small>
                            <String id="page.globalDashboard.global.text" />
                        </Text>
                    </Col>
                </Row>
                {rows &&
                    rows.map(({ labelKey, items: colItems }, index) => (
                        <React.Fragment key={index}>
                            <Row mb={0.5} mt={2}>
                                <Col xs={12}>
                                    <Heading h6>
                                        <String id={labelKey} />
                                    </Heading>
                                </Col>
                            </Row>
                            <Row vGutter={1.25}>
                                {colItems &&
                                    colItems.map(({ labelKey, name: helper }, colIndex) => (
                                        <Col key={colIndex} md={3} sm={6} xs={12}>
                                            <DashboardCard>
                                                <Text body ellipsis textSecondary>
                                                    <String id={labelKey || helper} />
                                                </Text>
                                                <DashboardNumericContent
                                                    content={dashboardHelpers.getHelper(helper, data, t)}
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
