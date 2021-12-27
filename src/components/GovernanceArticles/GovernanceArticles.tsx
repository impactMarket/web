import { Col, Div, Grid, Heading, Icon, Img, Row, Section, Text } from '../../theme/components';
import { GeneratedPropsTypes, IconType } from '../../theme/Types';
import { String } from '../../components';
import { colors } from '../../theme';
import { useData } from '../../components/DataProvider/DataProvider';
import React from 'react';
import styled from 'styled-components';

const Card = styled.div`
    padding: 2rem;
    height: 100%;
    display: flex;
    flex-direction: column;
    background-color: ${colors.white};
    border-radius: 0.5rem;
    box-shadow: 0 0.25rem 1.5rem ${colors.backgroundShadow};
`;

type GovernanceArticleType = {
    icon?: string;
    image?: string;
    url?: string;
};

export const GovernanceArticles = (props: GeneratedPropsTypes) => {
    const { config } = useData();
    const articles = config?.governanceArticles as GovernanceArticleType[];

    return (
        <Section {...props}>
            <Grid>
                <Row>
                    {articles.map(({ icon, image, url }, index) => (
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
                            <Card>
                                <Div>
                                    {!!icon && <Icon brandPrimary icon={icon as IconType} sHeight={2.65} />}
                                    {!!image && <Img sHeight={2.65} sWidth={2.65} src={image} />}
                                </Div>
                                <Heading h4 mt={1}>
                                    <String id={`governanceArticle.${index}.heading`} />
                                </Heading>
                                <Text mt={0.5} textSecondary>
                                    <String id={`governanceArticle.${index}.text`} />
                                </Text>
                                {!!url && (
                                    <Div mt="auto" pt={1}>
                                        <a href={url} rel="noopener noreferrer" target="_blank">
                                            <Icon brandPrimary icon="arrowRight" sHeight={1} sWidth={1.375} />
                                        </a>
                                    </Div>
                                )}
                            </Card>
                        </Col>
                    ))}
                </Row>
            </Grid>
        </Section>
    );
};
