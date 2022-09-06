import {
    Button,
    Col,
    Div,
    Grid,
    Section,
    Text,
    TextLink
} from '../theme/components';
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
    const { buttonSecondaryLabel, buttonPrimaryUrl, buttonPrimaryLabel, text, heading, heroBanner } = primary;
    const { asPath, push } = useRouter();
    const services = Object.keys(items).map((key) => items[key as any].service);

    return (
        <Section
            flex
            mb={{ xs: 2.5 }}
            relative
            sPadding={{ sm: '0 1', xs: 0 }}
            style={{
                overflow: 'hidden',
                background:
                    'linear-gradient(34.33deg, #00D9D9 -6.01%, #2362FB 48.02%)'
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
                                    services: `<span>${services.join(
                                        ', '
                                    )}</span>`
                                }}
                            />
                        </Text>
                        <Div
                            flex
                            sPadding="1.5 0 0"
                            style={{ flexWrap: 'wrap' }}
                        >
                            <TextLink
                                brandPrimary
                                href={`http://${buttonPrimaryUrl}`}
                                pb="1rem"
                                rel="noopener noreferrer"
                                target="_blank"
                            >
                                <Button
                                    linedSecondary
                                    sColor={colors.white}
                                    mr={{ xs: 1 }}
                                    sHeight="3rem"
                                    sPadding="12px 20px"
                                    smaller
                                >
                                    <Text
                                        bold
                                        sFontSize="16px"
                                        sFontWeight={500}
                                    >
                                        {buttonPrimaryLabel}
                                    </Text>
                                </Button>
                            </TextLink>

                            <Button
                                mr={{ sm: 1, xs: 0 }}
                                onClick={() => {
                                    return modal.open('governanceContribute', {
                                        onSuccess: () =>
                                            asPath !== '/governance' &&
                                            push('/governance')
                                    });
                                }}
                                rebranded
                                sHeight="3rem"
                                secondaryWhite
                            >
                                <Text g700 regular>
                                    {buttonSecondaryLabel}
                                </Text>
                            </Button>
                        </Div>
                    </Col>
                    <Col
                        md={6}
                        xs={12}
                        flex
                        sAlignItems="end"
                        sJustifyContent="center"
                    >
                        <Image src={heroBanner.url} />
                    </Col>
                </Wrapper>
            </Grid>
        </Section>
    );
};

export default Hero;
