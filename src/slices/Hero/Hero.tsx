/* eslint-disable no-nested-ternary */
import { BackgroundImage, HeadingText, Img, Wrapper } from './Hero.style.ts';
import { Button, Col, Grid, Icon, Row, Section, Text, TextLink } from '../../theme/components';
import { PrismicSlice } from '../../lib/Prismic/types';
import { colors } from '../../theme';
import { modal } from 'react-modal-handler';
import { useRouter } from 'next/router';
import React, { useEffect } from 'react';
import RichText from '../../lib/Prismic/components/RichText';

const Hero = (props: PrismicSlice) => {
    const { items, primary } = props;
    const {
        appStoreLink,
        backgroundColor,
        bannerPosition: backgroundPosition,
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
        headingFontSize,
        heroBanner,
        id,
        smallHeading,
        subText,
        subtextColor,
        text,
        textColor,
        textSize
    } = primary;
    const { asPath, push } = useRouter();
    const services = Object.keys(items).map(key => items[key as any].service);

    // Send to component X if url has hash
    useEffect(() => {
        if (document.getElementById(location.hash.slice(1))) {
            document.getElementById(location.hash.slice(1)).scrollIntoView({ block: 'center' });
        }
    }, [location.hash]);

    const ButtonLink = ({ arrowColor, buttonUrl, buttonLabel, buttonColor }: any) => {
        if (buttonUrl?.includes('modal:')) {
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
            id={id?.substring(1)}
            relative
            sPadding={{
                sm: '0 1',
                xs: backgroundPosition === 'right' || backgroundPosition === 'bottom' ? 0 : '0 0 2 0'
            }}
            style={{
                background: backgroundColor,
                overflow: 'hidden'
            }}
        >
            <Grid sPadding={{ md: '0 2', sm: '0 2 2 0', xs: backgroundPosition === 'right' ? '0 0 0 2' : '0 2' }}>
                <Wrapper
                    backgroundColor={backgroundColor}
                    backgroundPosition={backgroundPosition}
                    buttonSecondaryColor={buttonSecondaryColor}
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
                            <HeadingText
                                headingColor={headingColor}
                                headingFont={headingFont}
                                headingFontSize={headingFontSize}
                                sFontSize={
                                    headingFontSize === 'small'
                                        ? 3
                                        : headingFontSize === 'medium'
                                        ? 3.75
                                        : headingFontSize === 'large' && 3.903
                                }
                            >
                                {heading}
                            </HeadingText>
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
                        <BackgroundImage backgroundPosition={backgroundPosition} src={heroBanner.url} />
                    </Col>
                </Wrapper>
            </Grid>
        </Section>
    );
};

export default Hero;
