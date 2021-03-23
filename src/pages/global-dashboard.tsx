import { Col, Grid, Heading, Row } from '../theme/components';
import { useData } from '../components/DataProvider/DataProvider';
import React from 'react';

const GlobalDashboard = () => {
    const { page } = useData();

    return (
        <Grid pt={{ md: 5, xs: 3 }}>
            <Row>
                <Col xs={12}>
                    <Heading h1 semibold>
                        {page?.hero?.heading}
                    </Heading>
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
