import {
    ArticleCard,
    Col,
    Div,
    FeatureChip,
    Grid,
    Heading,
    Icon,
    Img,
    RichContentFormat,
    Row,
    Section,
    Text,
    TextLink
} from '../../theme/components';
import { GeneratedPropsTypes, IconType } from '../../theme/Types';
import { String } from '../../components';
import { useData } from '../../components/DataProvider/DataProvider';
import React from 'react';

type GovernanceArticleType = {
    icon?: string;
    image?: string;
    url?: string;
    urlLabelKey?: string;
};

export const GovernanceArticles = (props: GeneratedPropsTypes) => {
    const { config } = useData();
    const articles = config?.governanceArticles as GovernanceArticleType[];

    return (
        <Section {...props}>
            <Grid>
                <Row>
                    {articles.map(({ icon, image, url, urlLabelKey }, index) => (
                        <Col
                            key={index}
                            md={12 / articles.length}
                            mt={{
                                md: index > 12 / articles.length ? 2 : 0,
                                sm: index > 1 ? 2 : 0,
                                xs: index ? 2 : 0
                            }}
                            sm={6}
                            xs={12}
                        >
                            <ArticleCard>
                                <Div>
                                    {!!icon && <Icon brandPrimary icon={icon as IconType} sHeight={2.65} />}
                                    {!!image && <Img sHeight={2.65} sWidth={2.65} src={image} />}
                                </Div>
                                <Heading h4 mt={1}>
                                    <String id={`governanceArticle.${index}.heading`} />
                                </Heading>
                                <RichContentFormat>
                                    <Text mt={0.5} textSecondary>
                                        <String id={`governanceArticle.${index}.text`} />
                                    </Text>
                                </RichContentFormat>
                                <Div mt="auto" pt={1}>
                                    {!!url ? (
                                        <TextLink brandPrimary href={url} rel="noopener noreferrer" target="_blank">
                                            {!!urlLabelKey && (
                                                <Text bold>
                                                    <String id={urlLabelKey} />
                                                </Text>
                                            )}
                                            <Icon
                                                icon="arrowRight"
                                                ml={urlLabelKey && 0.5}
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
                    ))}
                </Row>
            </Grid>
        </Section>
    );
};
