/* eslint-disable no-nested-ternary */
import { Button, Col, Div, Grid, Icon, Row, Section, Text, TextLink } from '../theme/components';
import { GeneratedPropsTypes } from '../theme/Types';
import { PrismicSlice } from '../lib/Prismic/types';
import { colors, fonts } from '../theme';
import { generateProps, mq } from 'styled-gen';
import { modal } from 'react-modal-handler';
import { useRouter } from 'next/router';
import React from 'react';
import RichText from '../lib/Prismic/components/RichText';
import styled, { css } from 'styled-components';

const Wrapper = styled.div<{
    backgroundColor: string;
    buttonSecondaryColor: string;
    headingFont: boolean;
    headingColor: boolean;
    textColor: boolean;
    textSize: boolean;
}>`
    align-items: center;
    display: flex;
    flex-direction: row;
    flex-wrap: wrap;
    padding: 3rem 0;
    position: relative;
    width: 100%;

    ${mq.upTo(
        'md',
        css`
            font-size: 2.5rem;
            line-height: 3rem;
            padding: 0;
        `
    )}

    .text-wrapper {
        z-index: 1;
        padding: 0 3rem 0 0;
        display: flex;
        flex-direction: column;
        gap: 1.5rem;

        ${mq.upTo(
            'md',
            css`
                padding: 2rem 0 2rem;
            `
        )}
    }

    .heading {
        color: ${props => props.headingColor && colors.white};
        letter-spacing: -0.02em;

        ${props => {
            // If it's bevan font
            if (props.headingFont) {
                return css`
                    font-family: ${fonts.families.bevan};
                    font-size: 3.778rem;
                    font-weight: ${fonts.weights.regular};
                    line-height: 4.375rem;
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
                `;
            }

            return css`
                font-size: 3rem;
                font-weight: ${fonts.weights.semibold};

                ${mq.upTo(
                    'sm',
                    css`
                        font-size: 2rem;
                    `
                )}
            `;
        }};
    }

    .text {
        color: ${props => (props.textColor ? colors.white : colors.g500)};
        font-size: ${props => (props.textSize ? '1.125rem' : '1.25rem')};
        line-height: 1.75rem;

        p {
            ${mq.upTo(
                'sm',
                css`
                    font-size: 1.125rem;
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

const Img = styled.img<GeneratedPropsTypes>`
    ${generateProps};
`;

const BackgroundImage = styled.img`
    max-height: 576px;
    object-fit: contain;
    object-position: right;
    width: 100%;
`;

const Hero = (props: PrismicSlice) => {
    const { items, primary } = props;
    const {
        appStoreLink,
        backgroundColor,
        buttonPrimaryColor,
        buttonPrimaryLabel,
        buttonPrimaryUrl,
        buttonSecondaryColor,
        buttonSecondaryLabel,
        buttonSecondaryUrl,
        extraText,
        googlePlayLink,
        heading,
        headingColor,
        headingFont,
        heroBanner,
        smallHeading,
        subText,
        subtextColor,
        text,
        textColor,
        textSize
    } = primary;
    const { asPath, push } = useRouter();
    const services = Object.keys(items).map(key => items[key as any].service);

    const ButtonLink = ({ arrowColor, buttonUrl, buttonLabel, buttonColor }: any) => {
        if (buttonUrl.includes('modal:')) {
            const modalName = buttonUrl.substring(buttonUrl.indexOf(':') + 1);

            return (
                <TextLink
                    onClick={() => {
                        return modal.open(modalName, {
                            onSuccess: () => asPath !== '/governance' && push('/governance')
                        });
                    }}
                >
                    <Button
                        linedSecondaryWhiteText={buttonColor === 'transparent' && true}
                        rebranded
                        sHeight="3rem"
                        sWidth="100%"
                        secondaryBlue={buttonColor === 'white' && true}
                    >
                        <Text medium>{buttonLabel}</Text>
                        {arrowColor && <Icon icon="right" ml={1} sColor={arrowColor} sHeight={0.8} />}
                    </Button>
                </TextLink>
            );
        }

        return (
            <TextLink href={buttonUrl} rel="noopener noreferrer" target="_blank">
                <Button
                    linedSecondaryWhiteText={buttonColor === 'transparent' && true}
                    rebranded
                    sHeight="3rem"
                    sWidth="100%"
                    secondaryBlue={buttonColor === 'white' && true}
                >
                    <Text medium>{buttonLabel}</Text>
                    {arrowColor && <Icon icon="right" ml={1} sColor={arrowColor} sHeight={0.8} />}
                </Button>
            </TextLink>
        );
    };

    return (
        <Section
            flex
            mb={{ xs: 2.5 }}
            relative
            sPadding={{ sm: '0 1 2 1', xs: '0 0 2 0' }}
            style={{
                background: backgroundColor,
                overflow: 'hidden'
            }}
        >
            <Grid>
                <Wrapper
                    backgroundColor={backgroundColor}
                    buttonSecondaryColor={buttonSecondaryColor}
                    headingColor={headingColor}
                    headingFont={headingFont}
                    textColor={textColor}
                    textSize={textSize}
                >
                    <Col className="text-wrapper" md={6} xs={12}>
                        {smallHeading && (
                            <Text sColor={colors.brandPrimary} sFontSize={1.125} sFontWeight={600} sLineHeight="normal">
                                {smallHeading}
                            </Text>
                        )}

                        {heading && (
                            <Div flex sFlexDirection="column">
                                <h1 className="heading">{heading}</h1>
                            </Div>
                        )}

                        {!!text.length && (
                            <Text className="text">
                                <RichText
                                    content={text}
                                    variables={{
                                        services: `<span>${services.join(', ')}</span>`
                                    }}
                                />
                            </Text>
                        )}

                        {!!subText.length && (
                            <Text className="text">
                                <RichText content={subText} sColor={subtextColor} sFontWeight={700} />
                            </Text>
                        )}

                        {buttonPrimaryLabel && (
                            <Row pl="1rem">
                                <ButtonLink
                                    arrowColor="#10A2D0"
                                    buttonColor={buttonPrimaryColor}
                                    buttonLabel={buttonPrimaryLabel}
                                    buttonUrl={buttonPrimaryUrl}
                                    textColor={colors.brandPrimary}
                                />
                            </Row>
                        )}

                        {buttonSecondaryLabel && (
                            <Row className="button-secondary" pl="1rem">
                                <ButtonLink
                                    buttonColor={buttonSecondaryColor}
                                    buttonLabel={buttonSecondaryLabel}
                                    buttonUrl={buttonSecondaryUrl}
                                />
                            </Row>
                        )}

                        {(googlePlayLink || appStoreLink) && (
                            <Row sPadding="0 1">
                                {appStoreLink && (
                                    <a href={appStoreLink} rel="noreferrer noopener" target="_blank">
                                        <Img inlineFlex sHeight={2.5} sWidth="auto" src="/img/app-store.png" />
                                    </a>
                                )}
                                {googlePlayLink && (
                                    <a
                                        href={googlePlayLink}
                                        rel="noreferrer noopener"
                                        style={{ marginLeft: '1rem' }}
                                        target="_blank"
                                    >
                                        <Img inlineFlex sHeight={2.5} sWidth="auto" src="/img/google-play.png" />
                                    </a>
                                )}
                            </Row>
                        )}

                        {!!extraText.length && (
                            <Text className="text">
                                <RichText content={extraText} sFontWeight={400} />
                            </Text>
                        )}
                    </Col>

                    <Col flex md={6} sJustifyContent="center" sPadding={0} xs={12}>
                        <BackgroundImage src={heroBanner.url} />
                    </Col>
                </Wrapper>
            </Grid>
        </Section>
    );
};

export default Hero;
