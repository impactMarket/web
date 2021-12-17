import { ATag, Col, Div, Grid, Heading, Img, Row, Section } from '../../../theme/components';
import { String } from '../../../components';
import { useData } from '../../../components/DataProvider/DataProvider';
import React from 'react';

type PartnersType = {
    items: {
        image: string;
        name: string;
        url: string;
    }[];
    keyLabel: string;
}[];

export const Partners = () => {
    const { page } = useData();

    const partners: PartnersType = page?.partners;

    return (
        <Section>
            <Grid>
                <Row>
                    <Col center sPadding={{ sm: '3 null', xs: '2 null' }} xs={12}>
                        <Div inlineFlex sAlignItems="center" sFlexDirection={{ md: 'row', xs: 'column' }}>
                            {partners.map(({ items, keyLabel }, itemsIndex) => (
                                <Div
                                    inlineFlex
                                    key={itemsIndex}
                                    ml={{ md: itemsIndex ? 5.625 : 0 }}
                                    mt={{ md: 0, xs: itemsIndex ? 2 : 0 }}
                                    sAlignItems="center"
                                    sFlexDirection={{ sm: 'row', xs: 'column' }}
                                >
                                    <Heading h6>
                                        <String id={keyLabel} />
                                    </Heading>
                                    <Div
                                        mt={{ sm: 0, xs: 1 }}
                                        sAlignItems="center"
                                        sFlexDirection={{ sm: 'row', xs: 'column' }}
                                    >
                                        {items.map(({ image, name, url }, indexImage) => (
                                            <ATag
                                                href={url}
                                                key={name}
                                                ml={{ sm: 3 }}
                                                mt={{ sm: 0, xs: indexImage ? 1.5 : 0 }}
                                                rel="noopener noreferrer"
                                                target="_blank"
                                            >
                                                <Img alt={`${name} logo`} sMaxWidth="100%" sWidth={7} src={image} />
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
