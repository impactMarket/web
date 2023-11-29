import { Breakdown, ShareThis, String } from '../../../components';
import {
    Button,
    Col,
    Div,
    DotBackground,
    Grid,
    Heading,
    RichContentFormat,
    Row,
    Section,
    Text
} from '../../../theme/components';
import { modal } from 'react-modal-handler';
import React from 'react';

export const Hero = () => {
    const handleContributeClick = () => {
        return modal.open('donate');
    };

    return (
        <Section relative>
            <DotBackground />
            <Grid pb={2} pt={2} relative>
                <Row>
                    <Col md={6} xs={12}>
                        <Heading
                            fontSize={{ md: '41 54', sm: '32 42', xs: '24 36' }}
                            h1
                        >
                            <String id="page.governanceToken.hero.heading" />
                        </Heading>
                        <RichContentFormat
                            fontSize={{ md: '16 28', xs: '14 24' }}
                            mt={1}
                        >
                            <String id="page.governanceToken.hero.text" />
                        </RichContentFormat>
                        <Div
                            mt={2}
                            sAlignItems="center"
                            sFlexDirection={{ sm: 'row', xs: 'column' }}
                        >
                            <Button
                                large
                                mr={{ sm: 2, xs: 0 }}
                                onClick={handleContributeClick}
                                sWidth={{ sm: 'unset', xs: '100%' }}
                            >
                                <Text sFontWeight={700}>
                                    <String id="contributeAndEarnRewards" />
                                </Text>
                            </Button>
                        </Div>
                        <ShareThis
                            mt={2}
                            sJustifyContent={{ sm: 'left', xs: 'center' }}
                        />
                    </Col>
                    <Col md={6} mt={{ md: 0, xs: 2.5 }} relative xs={12}>
                        <Breakdown />
                    </Col>
                </Row>
            </Grid>
        </Section>
    );
};
