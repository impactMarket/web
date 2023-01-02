import { Button, Col, Div, Grid, Row, Section, Text } from '../theme/components';
import { PrismicRichTextType } from '../lib/Prismic/types';
import { colors } from '../theme';
import { mq } from 'styled-gen';
import React from 'react';
import RichText from '../lib/Prismic/components/RichText';
import styled, { css } from 'styled-components';

import { useData } from '../components/CommunityMetricsProvider/CommunityMetricsProvider';

type NumbersFromApiSliceType = {
    items: {
        helperName?: string;
        label?: string;
    }[];
    primary: {
        content?: PrismicRichTextType;
        ctaLabel?: string;
        ctaUrl?: string;
        heading?: string;
    };
};

const Heading = styled(Row)`
    align-items: center;
    flex-direction: column;
    margin: 0 auto;
    max-width: 800px;
    text-align: center;
`;

const Box = styled(Row)<{ columns: number }>`
    display: grid;
    grid-template-columns: ${props => `repeat(${props.columns}, auto)`};
    gap: 2rem 0;

    ${mq.upTo(
        'md',
        css`
            grid-template-columns: repeat(2, auto);
        `
    )}
`;

const Content = styled(Div)`
    border-left: 1px solid ${colors.g200};
    padding: 0 2.5rem;

    &:first-child {
        border-left: none;
    }

    ${mq.upTo(
        'md',
        css`
            padding: 0;

            &:nth-child(odd) {
                border-left: none;
            }
        `
    )}
`;

export const NumbersFromApi = (props: NumbersFromApiSliceType) => {
    const { items, primary } = props;
    const { content, ctaLabel, ctaUrl, heading } = primary;
    const metrics = useData();
    const metricsLength = metrics ? Object.keys(metrics).length : 0;

    return (
        <Section
            flex
            relative
            sPadding={{ sm: '0 1', xs: '0 0 2 0' }}
            style={{
                overflow: 'hidden'
            }}
        >
            <Grid sPadding={{ md: '6rem 2rem', xs: '3rem 2rem' }}>
                {(heading || content) && (
                    <Heading>
                        {heading && (
                            <Text
                                mb={1}
                                sColor={colors.g900}
                                sFontSize={{ md: 2.25, xs: 2 }}
                                sFontWeight={600}
                                sLineHeight={2.75}
                            >
                                {heading}
                            </Text>
                        )}
                        {content && (
                            <RichText
                                content={content}
                                sColor={colors.g500}
                                sFontSize={1.25}
                                sFontWeight={400}
                                textSecondary
                            />
                        )}
                    </Heading>
                )}
                <Row>
                    <Col center mt={{ md: 4, xs: 3 }} xs={12}>
                        <Box columns={metricsLength}>
                            {items.map(({ helperName, label }, index) => (
                                <Content center column key={index}>
                                    <Text
                                        sColor={colors.brandPrimary}
                                        sFontSize={{ sm: 3.75, xs: 2.75 }}
                                        sFontWeight={600}
                                        sLineHeight={4.5}
                                    >
                                        {metrics?.[helperName] || '--'}
                                    </Text>
                                    <Text
                                        sColor={colors.g900}
                                        sFontSize={1.125}
                                        sFontWeight={500}
                                        sLineHeight={1.75}
                                        style={{ textTransform: 'capitalize' }}
                                    >
                                        {label}
                                    </Text>
                                </Content>
                            ))}
                        </Box>
                        {!!ctaUrl && (
                            <Button
                                href={ctaUrl}
                                large
                                linedSecondaryDark
                                medium
                                mt={{ md: 4, xs: 3 }}
                                sWidth={{ sm: 'unset', xs: '100%' }}
                            >
                                {ctaLabel}
                            </Button>
                        )}
                    </Col>
                </Row>
            </Grid>
        </Section>
    );
};

export default NumbersFromApi;
