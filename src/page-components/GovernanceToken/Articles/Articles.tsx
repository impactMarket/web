import { Col, Div, Grid, Heading, Icon, Row, Section, Text } from '../../../theme/components';
import { IconType } from '../../../theme/Types';
import { String } from '../../../components';
import { colors } from '../../../theme';
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

type ArticlesProps = {
    articles: {
        icon: IconType;
        name: string;
        url: string;
    }[];
};

export const Articles = (props: ArticlesProps) => {
    const { articles } = props;

    return (
        <Section sBackground="backgroundSecondaryDisabled" sPadding={{ md: '4 0', xs: '2 0' }}>
            <Grid>
                <Row>
                    {articles.map(({ icon, name, url }, index) => (
                        <Col
                            key={index}
                            md={3}
                            mt={{ md: index > 3 ? 2 : 0, sm: index > 1 ? 2 : 0, xs: index ? 2 : 0 }}
                            sm={6}
                            xs={12}
                        >
                            <Card>
                                <Div>
                                    <Icon brandPrimary icon={icon} sHeight={2.65} />
                                </Div>
                                <Heading h4 mt={1} sMaxWidth={{ md: 12 }}>
                                    <String id={`page.governanceToken.article.${name}.heading`} />
                                </Heading>
                                <Text mt={0.5} textSecondary>
                                    <String id={`page.governanceToken.article.${name}.text`} />
                                </Text>
                                <Div mt="auto" pt={1}>
                                    <a href={url} rel="noopener noreferrer" target="_blank">
                                        <Icon brandPrimary icon="arrowRight" sHeight={1} sWidth={1.375} />
                                    </a>
                                </Div>
                            </Card>
                        </Col>
                    ))}
                </Row>
            </Grid>
        </Section>
    );
};
