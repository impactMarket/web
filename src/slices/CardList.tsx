import { Button, Col, Div, Grid, Row, Section, TLink, Text, TextLink } from '../theme/components';
import { PrismicSlice } from '../lib/Prismic/types';
import { colors } from '../theme/variables/colors';
import { modal } from 'react-modal-handler';
import React from 'react';
import RichText from '../lib/Prismic/components/RichText';
import styled from 'styled-components';

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

const CardList = (props: PrismicSlice) => {
    const { items, primary } = props;
    const { heading, subtitle, text } = primary;

    const ButtonStyle = ({ buttonUrl, buttonLabel }: any) => (
        <Button disabled={!buttonUrl} linedSecondary={!buttonUrl && true} linedSecondaryDark={buttonUrl && true}>
            <Text sFontSize={1} sFontWeight={500}>
                {buttonLabel}
            </Text>
        </Button>
    );

    const ButtonLink = ({ buttonUrl, buttonLabel }: any) => {
        if (buttonUrl?.includes('modal:')) {
            const modalName = buttonUrl?.substring(buttonUrl.indexOf(':') + 1);

            return (
                <TextLink
                    onClick={() => {
                        return modal.open(modalName);
                    }}
                >
                    <ButtonStyle buttonLabel={buttonLabel} buttonUrl={buttonUrl} />
                </TextLink>
            );
        }

        return (
            <TLink href={!!buttonUrl && buttonUrl}>
                <ButtonStyle buttonLabel={buttonLabel} buttonUrl={buttonUrl} />
            </TLink>
        );
    };

    return (
        <Section {...props}>
            <Grid pb={3} pt={3}>
                {(heading || subtitle || !!text.length) && (
                    <HeadingRow>
                        {heading && (
                            <Text mt={1} sColor={colors.p700} sFontSize={1} sFontWeight={600}>
                                {heading}
                            </Text>
                        )}
                        {subtitle && (
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
                                {subtitle}
                            </Text>
                        )}
                        {!!text.length && <RichText content={text} mb={2} sColor={colors.g500} textSecondary />}
                    </HeadingRow>
                )}
                {items && (
                    <Row style={{ justifyContent: 'center' }}>
                        {items.map(
                            ({ content, ctaLabel, ctaUrl, heading, icon, isActive }, index) =>
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
                                                    textSecondary
                                                />
                                                <Div mt="auto">
                                                    <ButtonLink buttonLabel={ctaLabel} buttonUrl={ctaUrl} />
                                                </Div>
                                            </TestimonialWrapper>
                                        </TestimonialCard>
                                    </Col>
                                )
                        )}
                    </Row>
                )}
            </Grid>
        </Section>
    );
};

export default CardList;
