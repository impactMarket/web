import { Button, Col, Div, Grid, Row, Section, TLink, Text } from '../../theme/components';
import { GeneratedPropsTypes } from '../../theme/Types';
import { PrismicImageType, PrismicRichTextType } from '../../lib/Prismic/types';
import { String } from '..';
import { colors } from '../../theme/variables/colors';
import React from 'react';
import RichText from '../../lib/Prismic/components/RichText';
import styled from 'styled-components';

type testimonialCards = {
    content?: PrismicRichTextType;
    ctaLabel?: string;
    ctaUrl?: string;
    heading?: string;
    icon: PrismicImageType;
    isActive: boolean;
};

const Image = styled.img`
    height: 100%;
    width: auto;
`;

const TestimonialCard = styled.div`
    position: relative;
    height: 100%;
`;

const TestimonialIcon = styled.div`
    height: 3.5rem;
    left: 50%;
    position: absolute;
    top: -1.5rem;
    transform: translateX(-50%);
`;

const TestimonialWrapper = styled.div`
    align-items: center;
    background-color: ${colors.g50};
    border-radius: 1rem;
    display: flex;
    flex-direction: column;
    height: 100%;
    padding: 2rem;
    text-align: center;
`;

const HeadingRow = styled(Row)`
    align-items: center;
    flex-direction: column;
    margin: 0 auto 3rem auto;
    max-width: 800px;
    text-align: center;
`;

type TestimonialProps = {
    data?: any;
    testimonialCards?: testimonialCards[];
} & GeneratedPropsTypes;

export const Testimonial = (props: TestimonialProps) => {
    const { data, testimonialCards } = props;

    const visibleContent = (testimonialCards || []).reduce(
        (result, content) => (content?.isActive ? [...result, content] : result),
        []
    );

    if (!visibleContent?.length) {
        return null;
    }

    return (
        <Section {...props}>
            <Grid>
                <HeadingRow>
                    {data?.heading && (
                        <Text mt={1} sColor={colors.p700} sFontSize={1} sFontWeight={600}>
                            {data?.heading}
                        </Text>
                    )}
                    {data?.subtitle && (
                        <Text
                            mb={1}
                            mt={1}
                            sColor={colors.g900}
                            sFontSize={{
                                md: 3,
                                xs: 2
                            }}
                            sFontWeight={600}
                            sLineHeight={{
                                md: 3.5,
                                xs: 2.5
                            }}
                        >
                            {data?.subtitle}
                        </Text>
                    )}
                    {data?.text && <RichText content={data?.text} mb={2} sColor={colors.g500} textSecondary />}
                </HeadingRow>
                <Row style={{ justifyContent: 'center' }}>
                    {visibleContent.map(
                        ({ content, ctaUrl, heading, icon, isActive }, index) =>
                            !!isActive && (
                                <Col
                                    key={index}
                                    md={4}
                                    mt={{
                                        md: index > 2 ? 4 : 0,
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
                                    <TestimonialCard>
                                        {!!icon?.url && (
                                            <TestimonialIcon>
                                                <Image src={icon?.url} />
                                            </TestimonialIcon>
                                        )}
                                        <TestimonialWrapper>
                                            <Text mt={1} sColor={colors.g900} sFontSize={1.25} sFontWeight={500}>
                                                {heading}
                                            </Text>
                                            <RichText
                                                content={content}
                                                mb={2}
                                                mt={1}
                                                sColor={colors.g500}
                                                sMaxWidth="350px"
                                                textSecondary
                                            />
                                            <Div mt="auto">
                                                <TLink
                                                    href={!!ctaUrl && ctaUrl}
                                                    rel="noopener noreferrer"
                                                    target="_blank"
                                                >
                                                    <Button disabled={!ctaUrl} whitePrimary>
                                                        <Text
                                                            sColor={!!ctaUrl ? colors.g700 : colors.g300}
                                                            sFontSize={1}
                                                            sFontWeight={500}
                                                        >
                                                            {!!ctaUrl ? (
                                                                <String id="learnmore" />
                                                            ) : (
                                                                <String id="availableSoon" />
                                                            )}
                                                        </Text>
                                                    </Button>
                                                </TLink>
                                            </Div>
                                        </TestimonialWrapper>
                                    </TestimonialCard>
                                </Col>
                            )
                    )}
                </Row>
            </Grid>
        </Section>
    );
};
