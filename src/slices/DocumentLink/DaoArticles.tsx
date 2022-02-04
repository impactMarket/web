import {
    ArticleCard,
    Col,
    Div,
    FeatureChip,
    Grid,
    Heading,
    Icon,
    Row,
    Section,
    Text,
    TextLink
} from '../../theme/components';
import { PrismicImageType, PrismicRichTextType } from '../../lib/Prismic/types';
import { String } from '../../components';
import React from 'react';
import RichText from '../../lib/Prismic/components/RichText';
import prismicT from '@prismicio/types';
import styled from 'styled-components';

type Article = {
    content?: PrismicRichTextType;
    ctaLabel?: string;
    ctaUrl?: string;
    heading?: string;
    icon: PrismicImageType;
    isActive: boolean;
};

type DataType = {
    articles: Article[];
};

const Image = styled.img`
    height: 100%;
    width: auto;
`;

const DaoArticles = (props: prismicT.PrismicDocument) => {
    const { data } = props;
    const { articles } = (data || {}) as DataType;

    const visibleArticles = (articles || []).reduce(
        (result, article) => (article?.isActive ? [...result, article] : result),
        []
    );

    if (!visibleArticles?.length) {
        return null;
    }

    return (
        <Section sPadding="1 0">
            <Grid>
                <Row>
                    {visibleArticles.map(
                        ({ content, ctaLabel, ctaUrl, heading, icon, isActive }, index) =>
                            !!isActive && (
                                <Col
                                    key={index}
                                    md={12 / visibleArticles.length}
                                    mt={{
                                        md: index > 12 / visibleArticles.length ? 2 : 0,
                                        sm: index > 1 ? 2 : 0,
                                        xs: index ? 2 : 0
                                    }}
                                    sm={6}
                                    xs={12}
                                >
                                    <ArticleCard>
                                        {!!icon?.url && (
                                            <Div sHeight={2.65}>
                                                <Image src={icon?.url} />
                                            </Div>
                                        )}
                                        <Heading h4 mt={1}>
                                            {heading}
                                        </Heading>
                                        <RichText content={content} mt={0.5} textSecondary />
                                        <Div mt="auto" pt={1}>
                                            {!!ctaUrl ? (
                                                <TextLink
                                                    brandPrimary
                                                    href={ctaUrl}
                                                    rel="noopener noreferrer"
                                                    target="_blank"
                                                >
                                                    {!!ctaLabel && <Text bold>{ctaLabel || ''}</Text>}
                                                    <Icon
                                                        icon="arrowRight"
                                                        ml={!!ctaLabel && 0.5}
                                                        sHeight={1}
                                                        sWidth={1.375}
                                                    />
                                                </TextLink>
                                            ) : (
                                                <FeatureChip>
                                                    <Text XSmall bold>
                                                        <String id="availableSoon" />
                                                    </Text>
                                                </FeatureChip>
                                            )}
                                        </Div>
                                    </ArticleCard>
                                </Col>
                            )
                    )}
                </Row>
            </Grid>
        </Section>
    );
};

DaoArticles.propTypes = {};

export default DaoArticles;
