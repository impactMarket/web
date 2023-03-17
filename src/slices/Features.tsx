import { Col, Grid, Row, Section, Text } from '../theme/components';
import { PrismicSlice } from '../lib/Prismic/types';
import { colors } from '../theme';
import React, { useEffect } from 'react';
import RichText from '../lib/Prismic/components/RichText';
import styled from 'styled-components';

const Image = styled.img`
    height: 100%;
    width: auto;
`;

const Icon = styled.div`
    height: 3rem;
`;

const Content = styled.div`
    align-items: center;
    display: flex;
    flex-direction: column;
    height: 100%;
    text-align: center;
    gap: 0.7rem;
`;

const Heading = styled(Row)`
    align-items: center;
    flex-direction: column;
    margin: 0 auto 4rem auto;
    text-align: center;
`;

const Features = (props: PrismicSlice) => {
    const { items, primary } = props;
    const { heading, id } = primary;

    // Send to component X if url has hash
    useEffect(() => {
        if (document.getElementById(location.hash.slice(1))) {
            document.getElementById(location.hash.slice(1)).scrollIntoView({ block: 'center' });
        }
    }, [location.hash]);

    return (
        <Section
            flex
            id={id?.substring(1)}
            relative
            sPadding={{ sm: '0 1', xs: '0 0 2 0' }}
            style={{
                overflow: 'hidden'
            }}
        >
            <Grid sPadding={{ md: '6rem 0', xs: '3rem 2rem' }}>
                {heading && (
                    <Heading>
                        <Text sColor={colors.g900} sFontSize={{ md: 2.25, xs: 2 }} sFontWeight={600} sLineHeight={2.75}>
                            {heading}
                        </Text>
                    </Heading>
                )}
                <Row style={{ justifyContent: 'center' }}>
                    {items?.map(({ icon, title, description }, index) => (
                        <Col
                            key={index}
                            md={4}
                            mt={{
                                md: index > 2 ? 5 : 0,
                                sm: index > 1 ? 2 : 0,
                                xs: index ? 2 : 0
                            }}
                            sm={6}
                            style={{
                                flexGrow: 1,
                                maxWidth: 'unset'
                            }}
                            xs={12}
                        >
                            <Content>
                                {!!icon?.url && (
                                    <Icon>
                                        <Image src={icon?.url} />
                                    </Icon>
                                )}
                                {!!title && (
                                    <Text sColor={colors.g900} sFontSize={1.25} sFontWeight={500}>
                                        {title}
                                    </Text>
                                )}
                                {!!description && <RichText content={description} sColor={colors.g500} textSecondary />}
                            </Content>
                        </Col>
                    ))}
                </Row>
            </Grid>
        </Section>
    );
};

export default Features;
