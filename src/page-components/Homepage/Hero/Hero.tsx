import { Button, Col, Div, Grid, Heading, Icon, Img, ItemsRow, Row, Section, Text } from '../../../theme/components';
import { DonateButton } from '../../../components';
import { colors } from '../../../theme';
import { scroller } from 'react-scroll';
import { useData } from '../../../components/DataProvider/DataProvider';
import React, { useCallback } from 'react';
import parse from 'html-react-parser';
import styled from 'styled-components';

const scrollOptions = {
    delay: 10,
    duration: 600,
    offset: -100,
    smooth: 'easeInOutCubic'
};

const TextLink = styled.a`
    color: ${colors.brandPrimary};
`;

export const Hero = () => {
    const { page, getString } = useData();

    const handleDlownloadButtonClick = useCallback(() => scroller.scrollTo('cta', scrollOptions), []);

    return (
        <Section pb={{ sm: 4, xs: 2 }}>
            <Grid>
                <Row middle="xs" reverse>
                    {/* eslint-disable-next-line react/jsx-sort-props */}
                    <Col xs={12} sm={5} md={6}>
                        <Div sAlignItems="start">
                            <Img src={page?.hero?.image} />
                        </Div>
                    </Col>
                    {/* eslint-disable-next-line react/jsx-sort-props */}
                    <Col mt={{ lg: 3, xs: 2 }} xs={12} sm={7} md={6}>
                        <Div column sMaxWidth={{ md: 33.75 }}>
                            <Heading fontSize={{ md: '48 54', sm: '32 42', xs: '24 36' }} h1>
                                {parse(page?.hero?.heading)}
                            </Heading>
                            <Text body fontSize={{ md: '16 32', xs: '14 24' }} mt={1}>
                                {page?.hero?.text}&nbsp;
                                <TextLink
                                    href="http://docs.impactmarket.com/"
                                    rel="noreferrer noopener"
                                    target="_blank"
                                >
                                    {getString('learnMoreAboutUs')}
                                </TextLink>
                                .
                            </Text>
                            <ItemsRow distribute="tabletLandscape" mt={2}>
                                <Button fluid large medium onClick={handleDlownloadButtonClick}>
                                    <Icon icon="download" mr={0.625} sHeight={1.375} />
                                    {getString('downloadApp')}
                                </Button>
                                <DonateButton mt={{ md: 0, xs: 1 }} />
                            </ItemsRow>
                        </Div>
                    </Col>
                </Row>
            </Grid>
        </Section>
    );
};
