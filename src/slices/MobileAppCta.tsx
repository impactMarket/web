import { ButtonAppstore, ButtonPlaystore, Col, Grid, Heading, ItemsRow, Row, Section } from '../theme/components';
import { PrismicImageType, PrismicRichTextType } from '../lib/Prismic/types';
import { usePrismicData } from '../lib/Prismic/components/PrismicDataProvider';
import Image from '../lib/Prismic/components/Image';
import React from 'react';
import RichText from '../lib/Prismic/components/RichText';

type MobileAppCtaSliceType = {
    primary: {
        content?: PrismicRichTextType;
        heading?: string;
        image?: PrismicImageType;
    };
};

const stores = [
    { StoreButton: ButtonPlaystore, urlKey: 'playStoreUrl' },
    { StoreButton: ButtonAppstore, urlKey: 'appStoreUrl' }
];

const MobileAppCta = (props: MobileAppCtaSliceType) => {
    const { primary } = props;
    const { content, heading, image } = primary;
    const { extractFromConfig } = usePrismicData();

    const storeLinks = extractFromConfig('stores') as any;

    return (
        <Section id="cta" sBackground="backgroundBlack">
            <Grid>
                <Row middle="xs">
                    <Col lg={5} md={6} pt={{ sm: 0, xs: 2 }} sm={5} xs={12}>
                        {!!heading && (
                            <Heading fontSize={{ md: '48 64', xs: '32 42' }} h2 white>
                                {heading}
                            </Heading>
                        )}
                        {!!content?.length && <RichText content={content} mt={1} small white />}
                        <ItemsRow distribute mt={{ sm: 3, xs: 2 }} sMaxWidth={{ sm: 18 }} spacing={12}>
                            {stores.map(({ StoreButton, urlKey }, index) => (
                                <StoreButton href={storeLinks[urlKey]} key={index} />
                            ))}
                        </ItemsRow>
                    </Col>
                    <Col md={6} sm={7} xs={12}>
                        <Image {...image} />
                    </Col>
                </Row>
            </Grid>
        </Section>
    );
};

export default MobileAppCta;
