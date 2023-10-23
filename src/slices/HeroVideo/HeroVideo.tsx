/* eslint-disable no-nested-ternary */
import { Wrapper } from './HeroVideo.style.ts';
import {
    Button,
    Col,
    Grid,
    Icon,
    Row,
    Section,
    Text,
    TextLink
} from '../../theme/components';
import { PrismicSlice } from '../../lib/Prismic/types';
import { colors } from '../../theme';
import React, { useEffect } from 'react';
import RichText from '../../lib/Prismic/components/RichText';
import { Box } from '@impact-market/ui';

const Hero = (props: PrismicSlice) => {
    const { items: buttons, primary } = props;
    const {
        backgroundColor,
        bannerPosition: backgroundPosition,
        buttonSecondaryColor,
        heading,
        id,
        smallHeading,
        subText,
        subtextColor,
        text,
        textColor,
        textSize
    } = primary;

    console.log('Items: ', buttons);
    console.log('Primary: ', primary);

    // Send to component X if url has hash
    useEffect(() => {
        if (document.getElementById(location.hash.slice(1))) {
            document
                .getElementById(location.hash.slice(1))
                .scrollIntoView({ block: 'center' });
        }
    }, [location.hash]);

    const ButtonLink = ({ buttonUrl, buttonLabel, buttonColor }: any) => {
        const isModal = buttonUrl?.startsWith('modal:');

        return (
            <TextLink
                href={!isModal && buttonUrl}
                // onClick={() =>
                //     isModal && update('modal', buttonUrl?.replace(/^modal:/, ''))
                // }
                rel="noopener noreferrer"
                target="_blank"
            >
                <Button
                    default={buttonColor && true}
                    linedSecondaryDark={!buttonColor && true}
                    rebranded
                    sHeight="3rem"
                    sWidth="100%"
                >
                    <Text medium>{buttonLabel}</Text>
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
                xs:
                    backgroundPosition === 'right' ||
                    backgroundPosition === 'bottom'
                        ? 0
                        : '0 0 2 0'
            }}
            style={{
                background: backgroundColor,
                overflow: 'hidden'
            }}
        >
            <Grid
                sPadding={{
                    md: '0 2',
                    sm: '0 2 2 0',
                    xs: backgroundPosition === 'right' ? '0 0 0 2' : '0 2'
                }}
            >
                <Wrapper
                    backgroundColor={backgroundColor}
                    backgroundPosition={backgroundPosition}
                    buttonSecondaryColor={buttonSecondaryColor}
                    textColor={textColor}
                    textSize={textSize}
                >
                    <Col className="text-wrapper" md={6} xs={12}>
                        {smallHeading && (
                            <RichText
                                content={smallHeading}
                                sColor={colors.brandPrimary}
                                sFontSize={1.125}
                                sFontWeight={600}
                                sLineHeight="normal"
                            />
                        )}

                        {heading && (
                            // <HeadingText
                            //     headingColor={headingColor}
                            //     headingFont={headingFont}
                            //     headingFontSize={headingFontSize}
                            //     sFontSize={
                            //         headingFontSize === 'small'
                            //             ? 3
                            //             : headingFontSize === 'medium'
                            //             ? 3.75
                            //             : headingFontSize === 'large' && 3.903
                            //     }
                            // >
                            //     {heading}
                            // </HeadingText>
                            <RichText
                                content={heading}
                                sColor={colors.brandPrimary}
                                sFontSize={1.125}
                                sFontWeight={600}
                                sLineHeight="normal"
                            />
                        )}

                        {!!text?.length && !!text[0].text && (
                            <Text className="text">
                                <RichText content={text} />
                            </Text>
                        )}

                        {!!subText?.length && !!subText[0].text && (
                            <Text className="text">
                                <RichText
                                    content={subText}
                                    sColor={subtextColor}
                                    sFontWeight={700}
                                />
                            </Text>
                        )}

                        {buttons && (
                            <Box
                                inlineFlex
                                style={{ gap: '2rem' }}
                                sJustifyContent="center"
                            >
                                {buttons?.map((button, key) => (
                                    <Row pl="1rem" key={key}>
                                        <ButtonLink
                                            buttonColor={button.buttonColor}
                                            buttonLabel={button.buttonLabel}
                                            buttonUrl={button.buttonUrl}
                                        />
                                    </Row>
                                ))}
                            </Box>
                        )}

                        {/* {buttonPrimaryLabel && (
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

                        */}
                    </Col>

                    {/* <Col
                        flex
                        md={6}
                        sJustifyContent="center"
                        sPadding={0}
                        xs={12}
                    >
                        <BackgroundImage
                            backgroundPosition={backgroundPosition}
                            src={heroBanner.url}
                        />
                    </Col> */}
                </Wrapper>
            </Grid>
        </Section>
    );
};

export default Hero;
