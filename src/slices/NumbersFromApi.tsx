import { Button, Col, Div, Grid, Heading, Row, Section, Text } from '../theme/components';
import { PrismicRichTextType } from '../lib/Prismic/types';
import { mq } from 'styled-gen';
import Api from '../apis/api';
import React, { useEffect, useState } from 'react';
import RichText from '../lib/Prismic/components/RichText';
import styled, { css } from 'styled-components';

type NumbersFromApiSliceType = {
    items: {
        helperName?: string;
        label?: string;
    }[];
    primary: {
        content?: PrismicRichTextType;
        ctaLabel?: string;
        ctaUrl?: string;
        heading?: string;
    };
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
            width: 20%;
        }
    `)}

    ${mq.tabletLandscape(css`
        max-width: 46.25rem;
    `)}

    ${mq.desktop(css`
        max-width: 64rem;
    `)}
`;

export const NumbersFromApi = (props: NumbersFromApiSliceType) => {
    const { items, primary } = props;
    const { content, ctaLabel, ctaUrl, heading } = primary;

    const [numbers, setNumbers] = useState<any>();

    useEffect(() => {
        const getNumbers = async () => {
            try {
                const numbers = (await Api.getGlobalNumbers()) as any;

                setNumbers(numbers);
            } catch (error) {
                console.log(error);
            }
        };

        getNumbers();
    }, []);

    return (
        <Section id="numbers" sBackground="brandPrimary">
            <Grid sPadding="4 null">
                <Row>
                    <Col center xs={12}>
                        {!!heading && (
                            <Heading h2 white>
                                {heading}
                            </Heading>
                        )}
                        {!!content?.length && (
                            <RichText body content={content} ml="auto" mr="auto" mt={1} sMaxWidth={32.75} white />
                        )}
                    </Col>
                </Row>
                <Row>
                    <Col center xs={12}>
                        <NumbersWrapper>
                            {items.map(({ helperName, label }, index) => (
                                <Div center column key={index} mt={{ sm: 0, xs: index > 1 ? 1 : 0 }}>
                                    <Heading fontSize={{ md: '48 54', xs: '32 42' }} h2 white>
                                        {numbers?.[helperName] || '--'}
                                    </Heading>
                                    <Text body white>
                                        {label}
                                    </Text>
                                </Div>
                            ))}
                        </NumbersWrapper>
                        {!!ctaUrl && (
                            <Button
                                href={ctaUrl}
                                large
                                medium
                                mt={{ md: 3.125, xs: 2 }}
                                sWidth={{ sm: 'unset', xs: '100%' }}
                                whitePrimary
                            >
                                {ctaLabel}
                            </Button>
                        )}
                    </Col>
                </Row>
            </Grid>
        </Section>
    );
};

export default NumbersFromApi;
