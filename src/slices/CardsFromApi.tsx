import { Box, Display, Icon, Text } from '@impact-market/ui';
import { Card, Div, Grid, Row, Section } from '../theme/components';
import { PrismicRichTextType } from '../lib/Prismic/types';
import { colors } from '../theme';
import { mq } from 'styled-gen';
import React, { useEffect } from 'react';
import RichText from '../lib/Prismic/components/RichText';
import styled, { css } from 'styled-components';

import { useData } from '../components/MicrocreditDashboardProvider/MicrocreditDashboardProvider';

type NumbersFromApiSliceType = {
    items: {
        approximately?: boolean;
        helperName?: string;
        label?: string;
        icon?: string | any;
        type?: string;
    }[];
    primary: {
        description?: PrismicRichTextType;
        heading?: string;
        id?: string;
    };
};

const CardsRow = styled(Row)`
    display: grid;
    gap: 1rem 2rem;
    grid-template-columns: repeat(4, 1fr);
    margin: 0;
    width: 100%;
    margin-top: 1rem;

    ${mq.upTo(
        'lg',
        css`
            grid-template-columns: repeat(3, 1fr);
        `
    )}

    ${mq.upTo(
        'md',
        css`
            grid-template-columns: repeat(2, 1fr);
        `
    )}

    ${mq.upTo(
        'sm',
        css`
            grid-template-columns: 1fr;
        `
    )}
`;

const IconWrapper = styled(Div)`
    border: 1px solid ${colors.g200};
    box-shadow: 0px 1px 2px rgba(16, 24, 40, 0.05);
    border-radius: 12px;
    padding: 1rem;
`;

export const CardsFromApi = (props: NumbersFromApiSliceType) => {
    const { items, primary } = props;
    const { description, heading, id } = primary;
    const data = useData();

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
            flex
            id={id?.substring(1)}
            relative
            sPadding={{ sm: '0 1', xs: '0 0 2 0' }}
            style={{
                overflow: 'hidden'
            }}
        >
            <Grid sPadding="3rem 2rem">
                {(heading || description) && (
                    <Box>
                        {heading && (
                            <Display g900 semibold small>
                                {heading}
                            </Display>
                        )}
                        {description && (
                            <RichText
                                content={description}
                                sColor={colors.g500}
                                sFontSize={1.25}
                            />
                        )}
                    </Box>
                )}
                <CardsRow>
                    {items.map(
                        (
                            { approximately, helperName, label, icon, type },
                            key
                        ) => (
                            <Card key={key}>
                                <Row
                                    style={{
                                        alignItems: 'center',
                                        margin: 0,
                                        padding: '1rem'
                                    }}
                                >
                                    {icon && (
                                        <IconWrapper>
                                            <Icon
                                                icon={icon}
                                                sColor={colors.brandPrimary}
                                                size={[1.5, 1.5]}
                                            />
                                        </IconWrapper>
                                    )}
                                    <Div ml={1} sFlexDirection="column">
                                        <Text
                                            g500
                                            mb={0.5}
                                            sFontWeight={500}
                                            small
                                        >
                                            {label}
                                        </Text>

                                        <Div flex sAlignItems="flex-end">
                                            {approximately && (
                                                <Text
                                                    semibold
                                                    style={{
                                                        fontSize: '1.5rem'
                                                    }}
                                                >
                                                    ~
                                                </Text>
                                            )}
                                            <Text
                                                semibold
                                                style={{ fontSize: '1.5rem' }}
                                            >
                                                {Math.floor(
                                                    data?.[helperName] * 100
                                                ) / 100 || 0}
                                            </Text>
                                            {type && (
                                                <Text extrasmall g600 ml={0.5}>
                                                    {type}
                                                </Text>
                                            )}
                                        </Div>
                                    </Div>
                                </Row>
                            </Card>
                        )
                    )}
                </CardsRow>
            </Grid>
        </Section>
    );
};

export default CardsFromApi;
