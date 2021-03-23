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
import { useData } from '../DataProvider/DataProvider';
import React from 'react';

const stores = [
    { StoreButton: ButtonPlaystore, name: 'playstore' },
    { StoreButton: ButtonAppstore, name: 'applestore' }
];

export const Cta = () => {
    const { config } = useData();

    const cta: any = config?.cta;
    const storeLinks: any = config?.storeLinks;

    return (
        <Section id="cta" sBackground="backgroundBlack">
            <Grid>
                <Row middle="xs">
                    <Col lg={4} lgOffset={1} pt={{ sm: 0, xs: 2 }} sm={5} xs={12}>
                        <Heading fontSize={{ md: '48 64', xs: '32 42' }} h2 white>
                            {cta?.heading}
                        </Heading>
                        <Text mt={1} small style={{ lineHeight: '24px' }} white>
                            {cta?.text}
                        </Text>
                        <ItemsRow distribute mt={{ sm: 3, xs: 2 }} sMaxWidth={{ sm: 18 }} spacing={12}>
                            {stores.map(({ name, StoreButton }) => (
                                <StoreButton href={storeLinks[name]} key={name} />
                            ))}
                        </ItemsRow>
                    </Col>
                    <Col sm={7} xs={12}>
                        <Img
                            alt="Impact market mockup"
                            ml={{ xs: -1.5 }}
                            mt={1}
                            sDisplay={{ sm: 'none', xs: 'block' }}
                            src={`${cta?.image}-mobile.png`}
                            style={{ width: 'calc(100% + 3rem)' }}
                        />
                        <Img
                            alt="Impact market mockup"
                            sDisplay={{ md: 'none', sm: 'block', xs: 'none' }}
                            src={`${cta?.image}-tablet.png`}
                        />
                        <Img
                            alt="Impact market mockup"
                            mt={0}
                            sDisplay={{ md: 'block', xs: 'none' }}
                            src={`${cta?.image}-desktop.png`}
                            style={{ maxHeight: 660, maxWidth: '100%', width: 'auto' }}
                        />
                    </Col>
                </Row>
            </Grid>
        </Section>
    );
};
