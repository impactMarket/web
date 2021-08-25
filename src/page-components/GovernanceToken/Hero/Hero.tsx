import { CeloDonationButton, String } from '../../../components';
import {
    Col,
    DotBackground,
    Grid,
    Heading,
    RichContentFormat,
    Row,
    Section,
    TextLink
} from '../../../theme/components';
import React from 'react';

export const Hero = () => {
    const convertedValue = `~342.2 IPCT`;
    const value = `$100 cUSD`;

    return (
        <Section relative>
            <DotBackground />
            <Grid pb={2} pt={2} relative>
                <Row>
                    <Col md={6} xs={12}>
                        <Heading fontSize={{ md: '48 54', sm: '32 42', xs: '24 36' }} h1>
                            <String id="page.governanceToken.hero.heading" />
                        </Heading>
                        <RichContentFormat body fontSize={{ md: '16 28', xs: '14 24' }} mt={1}>
                            <String id="page.governanceToken.hero.text" variables={{ convertedValue, value }} />
                            &nbsp;
                            <TextLink
                                brandPrimary
                                href="http://docs.impactmarket.com/"
                                rel="noreferrer noopener"
                                target="_blank"
                            >
                                <String id="page.governanceToken.hero.learnMoreLabel" />
                            </TextLink>
                        </RichContentFormat>
                        <CeloDonationButton address="0xe8e42B8e996B74cEF63C8dAB95Bdca8f7b1a9E69" label="Peanuts" large mt={2} />
                    </Col>
                </Row>
            </Grid>
        </Section>
    );
};
