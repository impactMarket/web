import { AgeRange } from './AgeRange';
import { Beneficiaries } from './Beneficiaries';
import { Col, DashboardCard, Grid, Heading, InfoTooltip, Row, Section, Text } from '../../../theme/components';
import { IGlobalDashboard } from '../../../apis/types';
import { bracked } from '../../../helpers/bracked';
import {
    getDemographicsAgeRange,
    getDemographicsBeneficiariesByCountry,
    getDemographicsTotalPercentage
} from '../../../apis/demographics';
import React from 'react';

type DemographicsProps = {
    charts?: {
        ageRange: { heading: string };
        countries: { heading: string };
    };
    data?: IGlobalDashboard;
    heading?: string;
    tooltip?: string;
};

export const Demographics = (props: DemographicsProps) => {
    const { charts, data, heading, tooltip } = props;
    const demographics = data?.demographics;
    const totalPercentage = getDemographicsTotalPercentage(demographics);

    return (
        <Section pt={{ md: 4, xs: 2 }} sBackground="backgroundLight">
            <Grid>
                <Row>
                    <Col xs={12}>
                        <Heading h3>
                            {heading}
                            <InfoTooltip>
                                <Text regular small>
                                    {bracked(tooltip || '', { totalPercentage })}
                                </Text>
                            </InfoTooltip>
                        </Heading>
                    </Col>
                </Row>
                <Row mt={1}>
                    <Col md={4} xs={12}>
                        <DashboardCard>
                            <Text small textSecondary>
                                {charts?.ageRange?.heading}
                            </Text>
                            <AgeRange data={getDemographicsAgeRange(demographics)} />
                        </DashboardCard>
                    </Col>
                    <Col md={8} mt={{ md: 0, xs: 2 }} xs={12}>
                        <DashboardCard sPadding={0}>
                            <Text sPadding="1 1 null 1" small textSecondary>
                                {charts?.countries?.heading}
                            </Text>
                            <Beneficiaries
                                countriesCount={demographics?.length}
                                data={getDemographicsBeneficiariesByCountry(demographics)}
                            />
                        </DashboardCard>
                    </Col>
                </Row>
            </Grid>
        </Section>
    );
};
