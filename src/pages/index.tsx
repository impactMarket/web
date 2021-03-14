import { Button, Grid, Icon, Logo, Text } from '../theme/components';
import { Col, Row } from '../theme/components/Grid/Grid';
import { useData } from '../components';
import React from 'react';

const Homepage = () => {
    const { getString, page } = useData();

    const str = getString('testVar', { date: new Date(), name: 'Michael' });

    return (
        <Grid pt={{ md: 5, xs: 3 }}>
            <Row>
                <Col xs={12}>
                    <Logo />
                    <Text h1 n09 semibold>
                        {page?.hero?.heading}
                    </Text>
                    <Text body>{str}</Text>
                    <Button small>
                        <span>Submit</span>
                    </Button>
                    <Icon icon="facebook" ml={2} n06 sHeight={2} />
                </Col>
            </Row>
        </Grid>
    );
};

export const getStaticProps = () => {
    return {
        props: {
            page: 'homepage'
        }
    };
};

export default Homepage;
