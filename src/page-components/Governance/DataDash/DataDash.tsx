import { Col, Grid, Row, Section, Text } from '../../../theme/components';
import { String } from '../../../components';
import { mq } from 'styled-gen';
import { pact } from '../../../apis/pact';
import React from 'react';
import styled, { css } from 'styled-components';

const List = styled.ul`
    display: flex;
    flex-direction: column;
    flex-wrap: wrap;
    justify-content: flex-start;
    padding: 2rem 0;

    ${mq.tablet(css`
        flex-direction: row;
    `)}

    ${mq.tabletLandscape(css`
        justify-content: space-between;
    `)}
`;

const Item = styled.li`
    :not(:first-of-type) {
        margin-top: 1.5rem;
    }

    ${mq.tablet(css`
        width: 33.33%;

        :not(:first-of-type) {
            margin-top: unset;
        }

        :nth-of-type(n + 4) {
            margin-top: 1.5rem;
        }
    `)}

    ${mq.tabletLandscape(css`
        width: unset;

        :nth-of-type(n + 4) {
            margin-top: unset;
        }
    `)}
`;

type DataDashProps = {
    items: {
        name: string;
    }[];
};

export const DataDash = (props: DataDashProps) => {
    const { items } = props;

    return (
        <Section>
            <Grid>
                <Row>
                    <Col xs={12}>
                        <List>
                            {items.map(({ name }, index) => (
                                <Item key={index}>
                                    <Text small textSecondary>
                                        <String id={name} />
                                    </Text>
                                    <Text body medium textPrimary>
                                        {pact[name]()}
                                    </Text>
                                </Item>
                            ))}
                        </List>
                    </Col>
                </Row>
            </Grid>
        </Section>
    );
};
