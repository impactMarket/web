import { Col, Grid, Section, Text } from '../theme/components';
import { GeneratedPropsTypes } from '../theme/Types';
import { PrismicSlice } from '../lib/Prismic/types';
import { colors } from '../theme';
import { generateProps, mq } from 'styled-gen';
import React from 'react';
import RichText from '../lib/Prismic/components/RichText';
import styled, { css } from 'styled-components';

const Wrapper = styled.div`
    display: flex;
    flex-direction: row;
    flex-wrap: wrap;
    padding: 6rem 0;

    ${mq.upTo(
        'md',
        css`
            padding: 0;
        `
    )}

    .description {
        p {
            margin-bottom: 1.5rem;

            &:last-child {
                margin-bottom: 0;
            }
        }
    }
`;

const Img = styled.img<GeneratedPropsTypes>`
    ${generateProps};
`;

const Info = (props: PrismicSlice) => {
    const { primary } = props;
    const { title, icon, description, text } = primary;

    return (
        <Section
            flex
            relative
            sPadding={{ sm: '0 1', xs: '0 0 2 0' }}
            style={{
                background: colors.g100,
                overflow: 'hidden'
            }}
        >
            <Grid>
                <Wrapper>
                    <Col
                        flex
                        md={6}
                        sFlexDirection="column"
                        sPadding={{ md: '0 3rem 0 0', xs: '2rem 0 2rem' }}
                        style={{ gap: '1rem' }}
                        xs={12}
                    >
                        {icon && <Img sMaxWidth="50px" sWidth="100%" src={icon.url} />}
                        {title && (
                            <Text
                                sColor={colors.g900}
                                sFontSize={{ md: 2.25, xs: 2 }}
                                sFontWeight={600}
                                sLineHeight={2.75}
                            >
                                {title}
                            </Text>
                        )}
                        {!!description.length && (
                            <RichText
                                content={description}
                                sColor={colors.g500}
                                sFontSize={1.25}
                                sFontWeight={400}
                                sLineHeight={1.875}
                            />
                        )}
                    </Col>
                    <Col className="description" md={6} sPadding={0} xs={12}>
                        {!!text.length && (
                            <RichText
                                content={text}
                                sColor={colors.g500}
                                sFontSize={1.125}
                                sFontWeight={400}
                                sLineHeight={1.75}
                            />
                        )}
                    </Col>
                </Wrapper>
            </Grid>
        </Section>
    );
};

export default Info;
