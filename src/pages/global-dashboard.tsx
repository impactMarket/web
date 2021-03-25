import { Col, Grid, Heading, Row } from '../theme/components';
import { IGlobalDashboard } from '../apis/types';
import { useData } from '../components/DataProvider/DataProvider';
import Api from '../apis/api';
import React from 'react';

type GlobalDashboardProps = {
    data: IGlobalDashboard;
    page: string;
};

const GlobalDashboard = (props: GlobalDashboardProps) => {
    const { page } = useData();

    console.log(props);

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

export const getServerSideProps = async () => {
    const data = await Api.getGlobalValues();

    return {
        props: {
            data,
            page: 'globalDashboard'
        }
    };
};

export default GlobalDashboard;
