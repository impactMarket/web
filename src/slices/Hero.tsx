import { Button, Col, Div, Grid, Icon, Row, Section, Text, TextLink } from '../theme/components';
import { PrismicSlice } from '../lib/Prismic/types';
import { colors, fonts } from '../theme';
import { modal } from 'react-modal-handler';
import { mq } from 'styled-gen';
import { useRouter } from 'next/router';
import React from 'react';
import RichText from '../lib/Prismic/components/RichText';
import styled, { css } from 'styled-components';

const Wrapper = styled.div`
    display: flex;
    flex-direction: row;
    flex-wrap: wrap;
    padding: 0 4rem;
    position: relative;
    width: 100%;

    ${mq.tabletLandscape(css`
        padding: 0 2rem;
    `)}

    ${mq.upTo(
        'sm',
        css`
            font-size: 2.5rem;
            line-height: 3rem;
            padding: 0;
        `
    )}

    .text-wrapper {
        padding: 6rem 0;
        z-index: 1;

        ${mq.upTo(
            'sm',
            css`
                padding: 2rem 0 4rem;
            `
        )}
    }

    > div .heading {
        letter-spacing: -0.02em;
        line-height: 5.15rem;
        max-width: 38rem;

        ${mq.upTo(
            'desktop',
            css`
                font-size: 3rem;
                line-height: 3.15rem;
            `
        )}

        ${mq.phone(css`
            font-size: 2rem;
            line-height: 2.5rem;
            max-width: 24rem;
        `)}
    }

    .text {
        color: ${colors.white};
        font-size: 1.5rem;
        line-height: 2rem;

        p {
            ${mq.upTo(
                'sm',
                css`
                    font-size: 1rem;
                    line-height: 1.5rem;
                `
            )}
        }
    }

    span {
        color: ${colors.white};
        font-weight: ${fonts.weights.bold};
    }
`;

const Image = styled.img`
    max-height: 576px;
    max-width: 100%;
`;

const Heading = styled.h1`
    color: ${colors.white};
    font-family: ${fonts.families.bevan};
    font-size: 4.7rem;
    font-weight: ${fonts.weights.regular};
`;

const Hero = (props: PrismicSlice) => {
    const { items, primary } = props;
    const { buttonSecondaryLabel, text, heading, heroBanner, launchApp } = primary;
    const { asPath, push } = useRouter();
    const services = Object.keys(items).map(key => items[key as any].service);

    return (
        <Section
            flex
            mb={{ xs: 2.5 }}
            relative
            sPadding={{ sm: '0 1', xs: 0 }}
            style={{
                background: 'linear-gradient(34.33deg, #00D9D9 -6.01%, #2362FB 48.02%)',
                overflow: 'hidden'
            }}
        >
            <Grid>
                <Wrapper>
                    <Col className="text-wrapper" md={6} xs={12}>
                        <Div flex sFlexDirection="column">
                            <Heading className="heading">{heading}</Heading>
                        </Div>

                        <Text className="text" sPadding="1.5 0 0">
                            <RichText
                                content={text}
                                label1
                                variables={{
                                    services: `<span>${services.join(', ')}</span>`
                                }}
                            />
                        </Text>

                        <Grid ml="0" sMaxWidth="fit-content" sPadding="1.5 0 0" sWidth="100%">
                            <Row pb="1rem" pl="1rem">
                                <TextLink
                                    brandPrimary
                                    href="https://app.impactmarket.com/"
                                    rel="noopener noreferrer"
                                    target="_blank"
                                >
                                    <Button rebranded sHeight="3rem" sWidth="100%" secondaryWhite>
                                        <Text medium>{launchApp}</Text>
                                        <Icon icon="right" ml={1} sColor={colors.g700} sHeight={0.8} />
                                    </Button>
                                </TextLink>
                            </Row>
                            <Row sPadding="0 1">
                                <TextLink
                                    onClick={() => {
                                        return modal.open('governanceContribute', {
                                            onSuccess: () => asPath !== '/governance' && push('/governance')
                                        });
                                    }}
                                    pt={0.5}
                                    white
                                >
                                    <Text medium sFontSize={1} sLineHeight={1.5}>
                                        {buttonSecondaryLabel}
                                    </Text>
                                    <Icon icon="right" ml={1} sColor={colors.white} sHeight={0.8} />
                                </TextLink>
                            </Row>
                        </Grid>
                    </Col>
                    <Col flex md={6} sAlignItems="end" sJustifyContent="center" xs={12}>
                        <Image src={heroBanner.url} />
                    </Col>
                </Wrapper>
            </Grid>
        </Section>
    );
};

export default Hero;
