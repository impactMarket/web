import { Col, DashboardCard, Div, Grid, Row, Section } from '../../../theme/components';
import { IClaimLocation } from '../../../apis/types';
import { Map } from '../../../components';
import Api from '../../../apis/api';
import React, { useEffect, useState } from 'react';

export const HealingMap = () => {
    const [claims, setClaims] = useState<IClaimLocation[] | undefined>();

    useEffect(() => {
        const getClaims = async () => {
            const claims = await Api.getAllClaimLocation();

            setClaims(claims);
        };

        getClaims();
    }, []);

    return (
        <Section>
            <Grid>
                <Row>
                    <Col xs={12}>
                        <DashboardCard sPadding="0">
                            <Div sHeight={27}>{claims && <Map claims={claims} />}</Div>
                        </DashboardCard>
                    </Col>
                </Row>
            </Grid>
        </Section>
    );
};
