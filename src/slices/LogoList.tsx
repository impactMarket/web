import { ATag, Col, Div, Grid, Heading, Row, Section } from '../theme/components';
import { PrismicImageType } from '../lib/Prismic/types';
import Image from '../lib/Prismic/components/Image';
import React, { useEffect } from 'react';

type LogoListSliceType = {
    items: {
        labelIndex: number;
        logo: PrismicImageType;
        url: string;
    }[];
    primary: {
        labels?: string;
        id?: string;
    };
};

type ItemType = {
    items: {
        logo: PrismicImageType;
        url: string;
    }[];
    label: string;
};

const LogoList = (props: LogoListSliceType) => {
    const labels = (props?.primary?.labels || '').split(',').map(string => string.trim());
    const items = labels.map((label, index) => ({
        items: props.items
            .filter(({ labelIndex }) => labelIndex.toString() === index.toString())
            .map(({ labelIndex, ...other }) => other),
        label
    })) as ItemType[];

    // Send to component X if url has hash
    useEffect(() => {
        if (document.getElementById(location.hash.slice(1))) {
            document.getElementById(location.hash.slice(1)).scrollIntoView();
        }
    }, [location.hash]);

    return (
        <Section id={props?.primary?.id?.substring(1)} sPadding={{ sm: '3 null', xs: '2 null' }}>
            <Grid>
                <Row>
                    <Col center xs={12}>
                        <Div inlineFlex sAlignItems="center" sFlexDirection={{ md: 'row', xs: 'column' }}>
                            {items.map(({ items, label }, itemsIndex) => (
                                <Div
                                    inlineFlex
                                    key={itemsIndex}
                                    ml={{ md: itemsIndex ? 5.625 : 0 }}
                                    mt={{ md: 0, xs: itemsIndex ? 2 : 0 }}
                                    sAlignItems="center"
                                    sFlexDirection={{ sm: 'row', xs: 'column' }}
                                >
                                    <Heading h6>{label}</Heading>
                                    <Div
                                        mt={{ sm: 0, xs: 1 }}
                                        sAlignItems="center"
                                        sFlexDirection={{ sm: 'row', xs: 'column' }}
                                    >
                                        {items.map(({ logo, url }, indexImage) => (
                                            <ATag
                                                href={url}
                                                key={indexImage}
                                                ml={{ sm: 3 }}
                                                mt={{ sm: 0, xs: indexImage ? 1.5 : 0 }}
                                                rel="noopener noreferrer"
                                                target="_blank"
                                            >
                                                <Div sWidth={7}>
                                                    <Image {...logo} />
                                                </Div>
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

export default LogoList;
