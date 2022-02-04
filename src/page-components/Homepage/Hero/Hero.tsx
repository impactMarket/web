import {
    Button,
    Col,
    Currency,
    Div,
    Grid,
    Heading,
    Icon,
    Row,
    Section,
    Text,
    TextLink
} from '../../../theme/components';
import { DonateLink, String } from '../../../components';
import { PrismicImageType, PrismicRichTextType } from '../../../lib/Prismic/types';
import { modal } from 'react-modal-handler';
import { scroller } from 'react-scroll';
import { usePrismicData } from '../../../lib/Prismic/components/PrismicDataProvider';
import { useRouter } from 'next/router';
import Image from '../../../lib/Prismic/components/Image';
import React, { useCallback } from 'react';
import RichText from '../../../lib/Prismic/components/RichText';

const scrollOptions = {
    delay: 10,
    duration: 600,
    offset: -100,
    smooth: 'easeInOutCubic'
};

type HeroType = {
    heading?: string;
    image?: PrismicImageType;
    text?: PrismicRichTextType;
};

const Hero = () => {
    const { extractFromPage } = usePrismicData();
    const { heading, image, text } = extractFromPage('hero') as HeroType;
    const { asPath, push } = useRouter();

    const handleDownloadLinkClick = useCallback(() => scroller.scrollTo('cta', scrollOptions), []);

    const handleDonationButtonClick = () => {
        return modal.open('governanceContribute', { onSuccess: () => asPath !== '/governance' && push('/governance') });
    };

    return (
        <Section pb={{ xs: 2 }}>
            <Grid>
                <Row middle="xs" reverse>
                    {/* eslint-disable-next-line react/jsx-sort-props */}
                    <Col xs={12} sm={5} md={6}>
                        <Div sAlignItems="start">
                            <Image {...image} />
                        </Div>
                    </Col>
                    {/* eslint-disable-next-line react/jsx-sort-props */}
                    <Col mt={{ lg: 3, xs: 2 }} xs={12} sm={7} md={6}>
                        <Div column sMaxWidth={{ md: 33.75 }}>
                            <Heading fontSize={{ md: '48 54', sm: '32 42', xs: '24 36' }} h1>
                                {heading}
                            </Heading>
                            <RichText body content={text} fontSize={{ md: '16 32', xs: '14 24' }} mt={1} />

                            {/* Donate button */}
                            <Div>
                                <Button
                                    large
                                    medium
                                    mt={3}
                                    onClick={handleDonationButtonClick}
                                    sWidth={{ sm: 'unset', xs: '100%' }}
                                >
                                    <Text bold>
                                        <String id="contributeAndEarnRewards" />
                                    </Text>
                                    <Currency currency="cUSD" ml={1} />
                                </Button>
                            </Div>

                            {/* Donate without the protocol */}
                            <Div mt={0.5}>
                                <Text brandSecondary>
                                    <String
                                        components={{
                                            OpenCryptoDonateModal: props => {
                                                return <DonateLink {...props} brandPrimary underlined />;
                                            }
                                        }}
                                        id="page.homepage.hero.buttonFootnote"
                                    />
                                </Text>
                            </Div>

                            {/* Other ctas */}
                            <Div block mt={3}>
                                <TextLink brandPrimary onClick={handleDownloadLinkClick}>
                                    <Text bold inlineBlock lead1>
                                        <String id="installApps" />
                                    </Text>
                                    <Icon icon="arrowRight" ml={0.5} sHeight="auto" sWidth={1} />
                                </TextLink>
                                <TextLink
                                    brandPrimary
                                    href="https://docs.impactmarket.com"
                                    mt={0.5}
                                    rel="noopener noreferrer"
                                    target="_blank"
                                >
                                    <Text bold lead1>
                                        <String id="readTheDocumentation" />
                                    </Text>
                                    <Icon icon="arrowRight" ml={0.5} sHeight="auto" sWidth={1} />
                                </TextLink>
                            </Div>

                            {/* <DonateButton mt={{ md: 0, xs: 1 }} /> */}
                        </Div>
                    </Col>
                </Row>
            </Grid>
        </Section>
    );
};

export default Hero;
