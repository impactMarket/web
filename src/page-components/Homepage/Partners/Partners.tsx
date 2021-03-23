import { ATag, Col, Div, Grid, Heading, Img, Row, Section as SectionBase } from '../../../theme/components';
import { colors } from '../../../theme';
import { rgba } from 'polished';
import { useData } from '../../../components/DataProvider/DataProvider';
import React from 'react';
import styled from 'styled-components';

const Section = styled(SectionBase)`
    background-color: ${rgba(colors.light, 0.31)};
`;

type PartnersType = {
    heading: string;
    items: {
        image: string;
        name: string;
        url: string;
    }[];
}[];

export const Partners = () => {
    const { page } = useData();

    const partners: PartnersType = page?.partners;

    return (
        <Section>
            <Grid>
                <Row>
                    <Col center sPadding={{ sm: '2.5 null', xs: '2 null' }} xs={12}>
                        <Div inlineFlex sAlignItems="center" sFlexDirection={{ md: 'row', xs: 'column' }}>
                            {partners.map(({ heading, items }, itemsIndex) => (
                                <Div
                                    inlineFlex
                                    key={itemsIndex}
                                    ml={{ md: itemsIndex ? 5.625 : 0 }}
                                    mt={{ md: 0, xs: itemsIndex ? 2 : 0 }}
                                    sAlignItems="center"
                                    sFlexDirection={{ sm: 'row', xs: 'column' }}
                                >
                                    <Heading h6>{heading}</Heading>
                                    <Div mt={{ sm: 0, xs: 1 }}>
                                        {items.map(({ image, name, url }) => (
                                            <ATag
                                                href={url}
                                                key={name}
                                                ml={3}
                                                rel="noopener noreferrer"
                                                target="_blank"
                                            >
                                                <Img alt={`${name} logo`} sHeight={2.25} sWidth="auto" src={image} />
                                            </ATag>
                                        ))}
                                    </Div>
                                </Div>
                            ))}
                        </Div>
                    </Col>
                </Row>
            </Grid>
        </Section>
    );
};
