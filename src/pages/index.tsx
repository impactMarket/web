import { Button, Grid, Icon, Logo, Text } from '../theme/components';
import { Col, Row } from '../theme/components/Grid/Grid';
import React from 'react';

const Home = () => {
    return (
        <Grid pt={{ md: 5, xs: 3 }}>
            <Row>
                <Col xs={12}>
                    <Logo />
                    <Text h1 n09 semibold>
                        Impact market
                    </Text>
                    <Button small>
                        <span>Testing button</span>
                    </Button>
                    <Icon icon="facebook" ml={2} n06 sHeight={2} />
                </Col>
            </Row>
        </Grid>
    );
};

export default Home;
