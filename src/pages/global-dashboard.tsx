import { Col, Grid, Row, Text } from '../theme/components';
import { useData } from '../components';
import React from 'react';

const GlobalDashboard = () => {
    const { page } = useData();

    return (
        <Grid pt={{ md: 5, xs: 3 }}>
            <Row>
                <Col xs={12}>
                    <Text h1 semibold>
                        {page?.hero?.heading}
                    </Text>
                </Col>
            </Row>
        </Grid>
    );
};

export const getStaticProps = () => {
    return {
        props: {
            page: 'globalDashboard'
        }
    };
};

export default GlobalDashboard;
