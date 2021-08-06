import { AgeRange } from './AgeRange';
import { Beneficiaries } from './Beneficiaries';
import { Col, DashboardCard, Grid, Heading, InfoTooltip, Row, Section, Text } from '../../../theme/components';
import { IGlobalDashboard } from '../../../apis/types';
import { String } from '../../../components';
import {
    getDemographicsAgeRange,
    getDemographicsBeneficiariesByCountry,
    getDemographicsTotalPercentage
} from '../../../apis/demographics';
import React, { useEffect, useState } from 'react';

type DemographicsProps = {
    data?: IGlobalDashboard;
};

export const Demographics = (props: DemographicsProps) => {
    const { data } = props;
    const demographics = data?.demographics;
    const totalPercentage = getDemographicsTotalPercentage(demographics);
    const [isLoaded, setIsLoaded] = useState(false);

    const demographicsCountriesData = getDemographicsBeneficiariesByCountry(demographics);
    const demographicsAgeData = getDemographicsAgeRange(demographics);

    useEffect(() => {
        setTimeout(() => {
            setIsLoaded(true);
        }, 1000);
    }, []);

    if (!isLoaded) {
        return null;
    }

    return (
        <Section pt={{ md: 4, xs: 2 }} sBackground="backgroundLight">
            <Grid>
                <Row>
                    <Col xs={12}>
                        <Heading h3>
                            <String id="page.globalDashboard.demographics.heading" />
                            <InfoTooltip>
                                <Text regular small>
                                    <String
                                        id="page.globalDashboard.demographics.tooltip"
                                        variables={{ totalPercentage }}
                                    />
                                </Text>
                            </InfoTooltip>
                        </Heading>
                    </Col>
                </Row>
                <Row mt={1}>
                    <Col md={4} xs={12}>
                        <DashboardCard>
                            <Text small textSecondary>
                                <String id="page.globalDashboard.demographics.charts.ageRange.heading" />
                            </Text>
                            <AgeRange data={demographicsAgeData} />
                        </DashboardCard>
                    </Col>
                    <Col md={8} mt={{ md: 0, xs: 2 }} xs={12}>
                        <DashboardCard sPadding={0}>
                            <Text sPadding="1 1 null 1" small textSecondary>
                                <String id="page.globalDashboard.demographics.charts.countries.heading" />
                            </Text>
                            <Beneficiaries countriesCount={demographics?.length} data={demographicsCountriesData} />
                        </DashboardCard>
                    </Col>
                </Row>
            </Grid>
        </Section>
    );
};
