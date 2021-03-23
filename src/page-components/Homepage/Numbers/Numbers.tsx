import { Button, Col, Div, Grid, Heading, Row, Section, Text } from '../../../theme/components';
import { mq } from 'styled-gen';
import { useData } from '../../../components/DataProvider/DataProvider';
import { useRouter } from 'next/router';
import React, { useCallback } from 'react';
import styled, { css } from 'styled-components';

type NumbersPropTypes = {
    buttonLabel: string;
    heading: string;
    items: {
        heading: string;
        name: string;
        text: string;
    }[];
    text: string;
};

const NumbersWrapper = styled.div`
    display: flex;
    justify-content: center;
    margin: 2rem auto 0;
    width: 100%;
    flex-wrap: wrap;

    & > div {
        width: 50%;
    }

    ${mq.tablet(css`
        justify-content: space-between;

        & > div {
            width: unset;
        }
    `)}

    ${mq.tabletLandscape(css`
        max-width: 46.25rem;
    `)}

    ${mq.desktop(css`
        max-width: unset;
    `)}
`;

export const Numbers = () => {
    const { page } = useData();
    const { push } = useRouter();

    const numbers: NumbersPropTypes = page?.numbers;

    const handleDashboardButtonClick = useCallback(() => push('/global-dashboard'), []);

    return (
        <Section sBackground="brandPrimary">
            <Grid sPadding="4 null">
                <Row>
                    <Col center xs={12}>
                        <Heading h2 white>
                            {numbers?.heading}
                        </Heading>
                        <Text body mt={1} white>
                            {numbers?.text}
                        </Text>
                        <NumbersWrapper>
                            {numbers?.items.map(({ heading, text }, index) => (
                                <Div center column key={index} mt={{ sm: 0, xs: index > 1 ? 1 : 0 }}>
                                    <Heading h2 white>
                                        {heading}
                                    </Heading>
                                    <Text body white>
                                        {text}
                                    </Text>
                                </Div>
                            ))}
                        </NumbersWrapper>
                        <Button
                            large
                            medium
                            mt={{ md: 3.125, xs: 2 }}
                            onClick={handleDashboardButtonClick}
                            sWidth={{ sm: 'unset', xs: '100%' }}
                            whitePrimary
                        >
                            {numbers?.buttonLabel}
                        </Button>
                    </Col>
                </Row>
            </Grid>
        </Section>
    );
};
