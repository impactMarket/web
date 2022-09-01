import { Button, Col, Div, Grid, Section, Text, TextLink } from '../theme/components';
import { PrismicSlice } from '../lib/Prismic/types';
import { colors, fonts } from '../theme';
import { modal } from 'react-modal-handler';
import { mq } from 'styled-gen';
import { position } from 'polished';
import { useRouter } from 'next/router';
import React from 'react';
import RichText from '../lib/Prismic/components/RichText';
import styled, { css } from 'styled-components';

const Wrapper = styled.div`
    display: flex;
    flex-direction: column;
    padding: 6rem 1rem;
    position: relative;
    width: 100%;

    ${mq.upTo(
        'sm',
        css`
            font-size: 2.5rem;
            line-height: 3rem;
            padding: 3rem 0;
        `
    )}

    > div .heading {
        letter-spacing: -0.02em;
        line-height: 5.15rem;

        ${mq.phone(css`
            font-size: 2rem;
            line-height: 2.5rem;
        `)}
    }

    .text {
        color: ${colors.white};
    }

    span {
        color: ${colors.white};
        font-weight: ${fonts.weights.bold};
    }
`;

const BackgroundImage = styled.div`
    ${position('absolute', 0)};

    background-position: top center;
    background-size: cover;
    z-index: -1;
`;

const Heading = styled.h1`
    color: ${colors.white};
    font-family: ${fonts.families.bevan};
    font-weight: ${fonts.weights.regular};
    font-size: 4.7rem;
`;

const Hero = (props: PrismicSlice) => {
    const { items, primary } = props;
    const { buttonSecondaryLabel, buttonPrimaryUrl, buttonPrimaryLabel, text, heading, heroBackground } = primary;
    const { asPath, push } = useRouter();
    const services = Object.keys(items).map(key => items[key as any].service);

    return (
        <Section flex mb={{ xs: 2.5 }} relative sPadding={{ sm: '0 1', xs: 0 }} style={{ overflow: 'hidden' }}>
            <Grid sPadding="2">
                <Wrapper>
                    <Col lg={6} md={12}>
                        <Div flex sFlexDirection="column" sMaxWidth="43rem">
                            <Heading className="heading">{heading}</Heading>
                        </Div>

                        <Text className="text" sMaxWidth="33.25rem" sPadding="1.5 0 0">
                            <RichText
                                content={text}
                                label1
                                variables={{
                                    services: `<span>${services.join(', ')}</span>`
                                }}
                            />
                        </Text>
                        <Div flex sPadding="1.5 0 0" style={{ flexWrap: 'wrap' }}>
                            <TextLink
                                brandPrimary
                                href={`http://${buttonPrimaryUrl}`}
                                pb="1rem"
                                rel="noopener noreferrer"
                                target="_blank"
                            >
                                <Button mr={{ sm: 1, xs: 0 }} sHeight="3rem" sPadding="12px 20px" smaller>
                                    <Text bold sFontSize="16px" sFontWeight={500}>
                                        {buttonPrimaryLabel}
                                    </Text>
                                </Button>
                            </TextLink>

                            <Button
                                mr={{ sm: 1, xs: 0 }}
                                onClick={() => {
                                    return modal.open('governanceContribute', {
                                        onSuccess: () => asPath !== '/governance' && push('/governance')
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
                </Wrapper>
            </Grid>
            <BackgroundImage style={{ backgroundImage: `url(${heroBackground.url})` }} />
        </Section>
    );
};

export default Hero;
