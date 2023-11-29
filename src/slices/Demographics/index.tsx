import { AgeRange } from './AgeRange';
import {
    Col,
    DashboardCard,
    Grid,
    Row,
    Section,
    Text
} from '../../theme/components';
import { String } from '../../components';
import { getDemographicsByCountry } from '../../apis/demographics';
import React, { useEffect, useState } from 'react';
import { Borrowers } from './Borrowers';
import { PrismicSlice } from '../../lib/Prismic/types';
import { useDemographics } from '../../components/MicrocreditDashboardProvider/MicrocreditDashboardProvider';
import { Display } from '@impact-market/ui';

const Demographics = (props: PrismicSlice) => {
    const { primary } = props;
    const {
        borrowerAgeRange,
        country,
        paidBackAgeRange,
        demographicsHeading,
        id
    } = primary;

    const [isLoaded, setIsLoaded] = useState(false);

    const demographics = useDemographics() as object | any;
    const demographicsAgeRange = demographics?.ageRange;
    const demographicsCountriesData = getDemographicsByCountry(
        demographics?.gender
    );

    // Send to component X if url has hash
    useEffect(() => {
        if (document.getElementById(location.hash.slice(1))) {
            document
                .getElementById(location.hash.slice(1))
                .scrollIntoView({ block: 'center' });
        }
    }, [location.hash]);

    useEffect(() => {
        setTimeout(() => {
            setIsLoaded(true);
        }, 1000);
    }, []);

    if (!isLoaded) {
        return null;
    }

    return (
        <Section
            flex
            id={id?.substring(1)}
            relative
            sPadding={{ sm: '0 1', xs: '0 0 2 0' }}
            style={{
                overflow: 'hidden',
                width: '100%'
            }}
        >
            <Grid sPadding="3rem 2rem">
                <Row>
                    <Col xs={12}>
                        <Display g900 semibold small>
                            {demographicsHeading}
                        </Display>
                    </Col>
                </Row>
                <Row mt={1}>
                    <Col md={4} sm={6} xs={12}>
                        <DashboardCard>
                            <Text small g500 sFontWeight={500}>
                                <String id={paidBackAgeRange} />
                            </Text>
                            <AgeRange data={demographicsAgeRange?.paid} />
                        </DashboardCard>
                    </Col>
                    <Col md={4} mt={{ sm: 0, xs: 2 }} sm={6} xs={12}>
                        <DashboardCard>
                            <Text small g500 sFontWeight={500}>
                                <String id={borrowerAgeRange} />
                            </Text>
                            <AgeRange data={demographicsAgeRange?.pending} />
                        </DashboardCard>
                    </Col>
                    <Col md={4} mt={{ md: 0, xs: 2 }} xs={12}>
                        <DashboardCard sPadding={0}>
                            <Text
                                sPadding="1 1 null 1"
                                small
                                g500
                                sFontWeight={500}
                            >
                                <String id={country} />
                            </Text>
                            <Borrowers
                                countriesCount={demographics?.gender?.length}
                                data={demographicsCountriesData}
                            />
                        </DashboardCard>
                    </Col>
                </Row>
            </Grid>
        </Section>
    );
};

export default Demographics;
