import {
    ButtonAppstore,
    ButtonPlaystore,
    Col,
    Grid,
    Heading,
    Img,
    ItemsRow,
    Row,
    Section,
    Text
} from '../../theme/components';
import { String } from '../String/String';
import { useData } from '../DataProvider/DataProvider';
import { usePrismicData } from '../../lib/Prismic/components/PrismicDataProvider';
import React from 'react';

const stores = [
    { StoreButton: ButtonPlaystore, urlKey: 'playStoreUrl' },
    { StoreButton: ButtonAppstore, urlKey: 'appStoreUrl' }
];

export const Cta = () => {
    const { config } = useData();
    const { extractFromConfig } = usePrismicData();
    const storeLinks = extractFromConfig('stores') as any;

    const cta: any = config?.cta;

    return (
        <Section id="cta" sBackground="backgroundBlack">
            <Grid>
                <Row middle="xs">
                    <Col lg={5} md={6} pt={{ sm: 0, xs: 2 }} sm={5} xs={12}>
                        <Heading fontSize={{ md: '48 64', xs: '32 42' }} h2 white>
                            <String id="cta.heading" />
                        </Heading>
                        <Text mt={1} small style={{ lineHeight: '24px' }} white>
                            <String id="cta.text" />
                        </Text>
                        <ItemsRow distribute mt={{ sm: 3, xs: 2 }} sMaxWidth={{ sm: 18 }} spacing={12}>
                            {stores.map(({ StoreButton, urlKey }, index) => (
                                <StoreButton href={storeLinks[urlKey]} key={index} />
                            ))}
                        </ItemsRow>
                    </Col>
                    <Col md={6} sm={7} xs={12}>
                        <Img alt="Impact market mockup" src={cta?.image} />
                    </Col>
                </Row>
            </Grid>
        </Section>
    );
};
