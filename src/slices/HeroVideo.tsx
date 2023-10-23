import {
    Button,
    Col,
    Grid,
    Row,
    Section,
    Text,
    TextLink
} from '../theme/components';

import { PrismicSlice } from '../lib/Prismic/types';
import { colors } from '../theme/index';
import React, { useEffect } from 'react';
import RichText from '../lib/Prismic/components/RichText';
import { Box } from '@impact-market/ui';
import styled from 'styled-components';
import { mq } from 'styled-gen';
import { css } from 'styled-components';

const SectionStyled = styled(Section)<{ opacity: boolean }>`
    height: 85vh;
    overflow: hidden;
    position: relative;

    ${mq.upTo(
        'sm',
        css`
            height: unset;
        `
    )}

    & video {
        position: absolute;
        min-width: 100%;
        min-height: 100%;
        width: auto;
        height: auto;
        object-fit: cover;
        z-index: -100;

        top: 50%;
        left: 50%;
        transform: translateX(-50%) translateY(-50%);
    }

    &::before {
        content: '';
        position: absolute;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        background-color: #000;
        z-index: 1;
        opacity: ${(props: any) => (props.opacity ? `${props.opacity}%` : 0)};
    }
`;

const Wrapper = styled.div`
    align-items: center;
    display: flex;
    flex-direction: row;
    flex-wrap: wrap;
    width: 100%;
    justify-content: center;
    text-align: center;

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
        display: flex;
        flex-direction: column;
        gap: 1.5rem;
    }
`;

const Hero = (props: PrismicSlice) => {
    const { items: buttons, primary } = props;
    const {
        heading,
        id,
        smallHeading,
        subText,
        text,
        videoFallbackImage,
        videoUrl,
        opacity
    } = primary;

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
                    secondaryWhite={!buttonColor && true}
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
        <SectionStyled
            flex
            id={id?.substring(1)}
            sPadding={{
                sm: '0 1',
                xs: '3rem 0'
            }}
            opacity={opacity}
        >
            <video
                poster={videoFallbackImage?.url}
                playsInline
                autoPlay
                muted
                loop
            >
                <source src={videoUrl} type="video/mp4" />
            </video>
            <Grid
                sPadding={{
                    md: '0 2',
                    sm: '0 2 2 0',
                    xs: '0 2'
                }}
                flex
            >
                <Wrapper>
                    <Col className="text-wrapper" md={8} xs={12}>
                        {!!smallHeading?.length && !!smallHeading[0].text && (
                            <RichText
                                content={smallHeading}
                                sFontSize={1.125}
                                sFontWeight={600}
                                sLineHeight="normal"
                                sColor={colors.white}
                            />
                        )}

                        {!!heading?.length && !!heading[0].text && (
                            <RichText
                                content={heading}
                                sFontSize={{
                                    md: '3.75rem',
                                    xs: '3rem'
                                }}
                                sFontWeight={600}
                                sLineHeight={{
                                    md: '4.5rem',
                                    xs: '3.5rem'
                                }}
                                sColor={colors.white}
                                mt={{
                                    md: 0,
                                    xs: 1
                                }}
                            />
                        )}

                        {!!text?.length && !!text[0].text && (
                            <RichText
                                content={text}
                                sColor={colors.white}
                                sFontSize={1.25}
                                sFontWeight={500}
                                sLineHeight={2}
                                mt={{
                                    md: 0,
                                    xs: '2rem'
                                }}
                            />
                        )}

                        {!!subText?.length && !!subText[0].text && (
                            <RichText
                                content={subText}
                                sFontWeight={400}
                                sFontSize={1.063}
                                sColor={colors.g300}
                                mt={3.5}
                                sLineHeight={1.5}
                            />
                        )}

                        {buttons && (
                            <Box
                                inlineFlex
                                style={{ gap: '3rem' }}
                                sJustifyContent="center"
                            >
                                {buttons?.map((button, key) => (
                                    <Row key={key}>
                                        <ButtonLink
                                            buttonColor={button.buttonColor}
                                            buttonLabel={button.buttonLabel}
                                            buttonUrl={button.buttonUrl}
                                        />
                                    </Row>
                                ))}
                            </Box>
                        )}
                    </Col>
                </Wrapper>
            </Grid>
        </SectionStyled>
    );
};

export default Hero;
