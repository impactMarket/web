/* eslint-disable react-hooks/rules-of-hooks */
import { Button, Card, CountryFlag, Div, Grid, Row, Section, Text, TextLink } from '../../theme/components';
import { GeneratedPropsTypes } from '../../theme/Types';
import { IStories } from '../../apis/types';
import { PrismicRichTextType } from '../../lib/Prismic/types';
import { colors } from '../../theme/variables/colors';
import { getCountryNameFromInitials } from '../../../utils/countries';
import { mq } from 'styled-gen';
import Api from '../../apis/api';
import Image from '../Image/Image';
import React, { useEffect, useState } from 'react';
import RichText from '../../lib/Prismic/components/RichText';
import styled, { css } from 'styled-components';

type StoriesPrismic = {
    isActive: boolean;
    stories: {
        allStories?: string;
        button?: string;
        buttonUrl?: string;
        heading?: string;
        seeMore?: string;
        smallHeading?: string;
        text?: PrismicRichTextType;
    };
} & GeneratedPropsTypes;

const HeadingRow = styled(Row)`
    align-items: center;
    flex-direction: column;
    margin: 0 auto 6.313rem auto;
    max-width: 800px;
    text-align: center;
`;

const StoriesRow = styled(Row)`
    display: grid;
    gap: 2rem;
    grid-template-columns: repeat(3, 1fr);
    margin: 0;
    width: 100%;

    ${mq.upTo(
        'md',
        css`
            grid-template-columns: 1fr;
        `
    )}
`;

const ImageWrapper = styled(TextLink)`
    position: relative;

    span {
        border-top-left-radius: 0.5rem;
        border-top-right-radius: 0.5rem;
    }
`;

const UserIcon = styled(TextLink)`
    position: relative;

    span {
        border-radius: 50%;
    }
`;

export const Stories = (props: StoriesPrismic) => {
    const { isActive, stories: storiesPrismicData } = props;

    if (!Object.keys(storiesPrismicData).length || !isActive) {
        return null;
    }

    const [stories, setStories] = useState<IStories | any>();

    useEffect(() => {
        const getStories = async () => {
            const stories = await Api.getStories();

            setStories(stories);
        };

        getStories();
    }, []);

    return (
        <Section {...props} sPadding={{ sm: '6 1 6 1', xs: '3 0 3 0' }}>
            <Grid>
                <HeadingRow>
                    {storiesPrismicData?.smallHeading && (
                        <Text sColor={colors.p700} sFontWeight={600}>
                            {storiesPrismicData?.smallHeading}
                        </Text>
                    )}
                    {storiesPrismicData?.heading && (
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
                            {storiesPrismicData?.heading}
                        </Text>
                    )}
                    {storiesPrismicData?.text && (
                        <RichText
                            content={storiesPrismicData?.text}
                            sColor={colors.g500}
                            sFontSize={{ sm: 1.25, xs: 1.125 }}
                            textSecondary
                        />
                    )}
                </HeadingRow>

                <StoriesRow>
                    {stories?.data?.map((story: any, key: React.Key) => (
                        <Card
                            key={key}
                            style={{
                                border: 'none',
                                boxShadow: '0px 1px 3px rgb(16 24 40 / 10%), 0px 1px 2px rgb(16 24 40 / 6%)'
                            }}
                        >
                            {story?.storyMedia && (
                                <ImageWrapper
                                    href={`https://app.impactmarket.com/stories?id=${story?.id}`}
                                    rel="noopener noreferrer"
                                    sHeight={{ md: '230px', sm: '450px', xs: '250px' }}
                                    target="_blank"
                                >
                                    <Image alt="" src={story?.storyMedia[0]} />
                                </ImageWrapper>
                            )}
                            <Row style={{ alignItems: 'center', margin: 0, padding: '1.875rem 1rem 1rem 1rem' }}>
                                <Div>
                                    <UserIcon
                                        href={`https://app.impactmarket.com/communities/${story?.community?.id}`}
                                        rel="noopener noreferrer"
                                        sHeight={3}
                                        sWidth={3}
                                        target="_blank"
                                    >
                                        <Image alt={story?.community?.name} src={story?.community?.coverMediaPath} />
                                    </UserIcon>
                                </Div>
                                <Div ml={1} sFlexDirection="column">
                                    <TextLink
                                        g700
                                        href={`https://app.impactmarket.com/communities/${story?.community?.id}`}
                                        rel="noopener noreferrer"
                                        semibold
                                        target="_blank"
                                    >
                                        {story?.community?.name}
                                    </TextLink>
                                    <Div flex sAlignItems="center">
                                        <CountryFlag countryCode={story?.community?.country} height={1.2} mr={0.5} />
                                        <Text g500 sFontSize={0.875}>
                                            {story?.community?.city},{' '}
                                            {getCountryNameFromInitials(story?.community?.country)}
                                        </Text>
                                    </Div>
                                </Div>
                            </Row>
                            {story?.message && (
                                <Div sFlexDirection="column" sPadding={1}>
                                    <Text g800>{story?.message}</Text>
                                    <TextLink
                                        brandPrimary
                                        href={`https://app.impactmarket.com/stories?id=${story?.id}`}
                                        mt={0.5}
                                        rel="noopener noreferrer"
                                        sFontSize={0.875}
                                        target="_blank"
                                    >
                                        {storiesPrismicData?.seeMore}
                                    </TextLink>
                                </Div>
                            )}
                        </Card>
                    ))}
                </StoriesRow>

                <Div mt={3.125} sJustifyContent="center">
                    <TextLink href="https://app.impactmarket.com/stories" rel="noopener noreferrer" target="_blank">
                        <Button linedSecondaryDark medium sFontSize={1}>
                            {storiesPrismicData?.allStories}
                        </Button>
                    </TextLink>
                </Div>
            </Grid>
        </Section>
    );
};
