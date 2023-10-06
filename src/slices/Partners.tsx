import {
    Button,
    Grid,
    Row,
    Section,
    Text,
    TextLink
} from '../theme/components';
import { GeneratedPropsTypes } from '../theme/Types';
import { PrismicSlice } from '../lib/Prismic/types';
import { colors } from '../theme/variables/colors';
import { generateProps, mq } from 'styled-gen';
import React, { useEffect } from 'react';
import RichText from '../lib/Prismic/components/RichText';
import styled, { css } from 'styled-components';

const HeadingRow = styled(Row)`
    align-items: center;
    flex-direction: column;
    margin: 0 auto;
    max-width: 800px;
    text-align: center;
`;

const LogoWrapper = styled(Row)`
    align-items: center;
    display: flex;
    gap: 2rem;
    justify-content: center;
    margin: 4rem 0;

    ${mq.upTo(
        'sm',
        css`
            gap: 1.5rem;
        `
    )}
`;

const ButtonWrapper = styled.div`
    display: flex;
    justify-content: center;
`;

const Img = styled.img<GeneratedPropsTypes>`
    ${generateProps};

    max-width: 300px;
    object-fit: contain;
`;

const Partners = (props: PrismicSlice) => {
    const { items, primary } = props;
    const { buttonText, buttonUrl, heading, id, smallHeading, text } = primary;

    // Send to component X if url has hash
    useEffect(() => {
        if (document.getElementById(location.hash.slice(1))) {
            document
                .getElementById(location.hash.slice(1))
                .scrollIntoView({ block: 'center' });
        }
    }, [location.hash]);

    return (
        <Section
            {...props}
            id={id?.substring(1)}
            sPadding={{ sm: '6 1 6 1', xs: '3 0 3 0' }}
            style={{ backgroundColor: colors.g50 }}
        >
            <Grid>
                <HeadingRow>
                    {smallHeading && (
                        <Text sColor={colors.p700} sFontWeight={600}>
                            {smallHeading}
                        </Text>
                    )}
                    {heading && (
                        <Text
                            mb={1.25}
                            mt={0.75}
                            sColor={colors.g900}
                            sFontSize={{
                                md: 2.25,
                                xs: 2
                            }}
                            sFontWeight={600}
                            sLineHeight={{
                                md: 2.75,
                                xs: 2.5
                            }}
                        >
                            {heading}
                        </Text>
                    )}
                    {text && (
                        <RichText
                            content={text}
                            sColor={colors.g500}
                            sFontSize={{ sm: 1.25, xs: 1.125 }}
                            textSecondary
                        />
                    )}
                </HeadingRow>
                <LogoWrapper>
                    {items?.map((item, key) => (
                        <>
                            {item?.url ? (
                                <a
                                    href={item?.url || ''}
                                    key={key}
                                    rel="noopener noreferrer"
                                    target="_blank"
                                >
                                    <Img
                                        sHeight={3}
                                        sWidth="auto"
                                        src={item.logo.url}
                                    />
                                </a>
                            ) : (
                                <Img
                                    key={key}
                                    sHeight={3}
                                    sWidth="auto"
                                    src={item.logo.url}
                                />
                            )}
                        </>
                    ))}
                </LogoWrapper>
                {buttonUrl && (
                    <ButtonWrapper>
                        <TextLink
                            href={!!buttonUrl && buttonUrl}
                            rel="noopener noreferrer"
                            target="_blank"
                        >
                            <Button linedSecondaryDark>
                                <Text sFontSize={1} sFontWeight={500}>
                                    {buttonText}
                                </Text>
                            </Button>
                        </TextLink>
                    </ButtonWrapper>
                )}
            </Grid>
        </Section>
    );
};

export default Partners;
