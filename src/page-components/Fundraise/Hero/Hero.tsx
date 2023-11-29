import { Address, Countdown, ShareThis, String } from '../../../components';
import {
    Card,
    CardContent,
    Col,
    Div,
    Grid,
    Heading,
    Icon,
    RichContentFormat,
    Row,
    Section,
    Text
} from '../../../theme/components';
import { colors } from '../../../theme';
import { useTranslation } from '../../../components/TranslationProvider/TranslationProvider';
import React, { useState } from 'react';
import styled from 'styled-components';

type HeroProps = {
    addresses?: { address: string; name: string }[];
    esolidarCampaignUrl?: string;
    cover?: string;
    endDate?: string;
    learnMoreUrl?: string;
};

const HeroImage = styled.div<{ image?: string }>`
    background-image: url('${({ image }) => image}');
    background-position: center;
    background-repeat: no-repeat;
    background-size: cover;
    height: 11rem;
    width: 100%;
`;

const HeroCardRow = styled.div`
    & + & {
        margin-top: 1rem;
    }

    &:not(:last-of-type) {
        border-bottom: 1px solid ${colors.backgroundSecondary};
        padding-bottom: 1rem;
    }
`;

export const Hero = (props: HeroProps) => {
    const { addresses, esolidarCampaignUrl, cover, endDate } = props;
    const { t } = useTranslation();

    const [ended, setEnded] = useState(false);

    return (
        <Section>
            <Grid pl={{ xs: 0 }} pr={{ xs: 0 }}>
                <Row ml={{ xs: 0 }} mr={{ xs: 0 }}>
                    <Col pl={{ xs: 0 }} pr={{ xs: 0 }} xs={12}>
                        <HeroImage image={cover} />
                    </Col>
                </Row>
            </Grid>
            <Grid mt={2}>
                <Row center="xs" middle="xs">
                    <Col md={5} sm={8} xs={12}>
                        <Heading h1>
                            <String id="page.fundraise.hero.heading" />
                        </Heading>
                        {!ended && (
                            <>
                                <Text mt={1} small textSecondary>
                                    <String id="page.fundraise.hero.countdown.label" />
                                </Text>
                                <Heading brandPrimary h4 manrope mt={0.25}>
                                    <Countdown
                                        date={endDate}
                                        onEnd={() => setEnded(true)}
                                    />
                                </Heading>
                            </>
                        )}
                        <RichContentFormat mt={1}>
                            {/* @ts-ignore */}
                            <Text div small>
                                <String id="page.fundraise.hero.text" />
                            </Text>
                        </RichContentFormat>

                        <Div mt={2}>
                            <ShareThis />
                        </Div>
                    </Col>
                    <Col
                        md={6}
                        mdOffset={1}
                        mt={{ md: 0, xs: 2 }}
                        sm={8}
                        xs={12}
                    >
                        <Card>
                            <CardContent sPadding={2}>
                                <HeroCardRow>
                                    <Heading h4>
                                        <String id="page.fundraise.hero.addresses.heading" />
                                    </Heading>
                                </HeroCardRow>

                                {addresses.map(
                                    ({ address, name: currency }, index) => (
                                        <HeroCardRow key={index}>
                                            {/* {currency === 'celo' && (
                                            <Text mb={0.5}  sFontWeight={600} small>
                                                <String id="page.fundraise.hero.addresses.text" />
                                                {!!learnMoreUrl && (
                                                    <>
                                                        &nbsp;
                                                        <TextLink
                                                            brandPrimary
                                                            href={learnMoreUrl}
                                                            rel="noreferrer noopener"
                                                            sDisplay="inline-block"
                                                            target="_blank"
                                                        >
                                                            <String id="learnAllAboutIt" />
                                                        </TextLink>
                                                        .
                                                    </>
                                                )}
                                            </Text>
                                        )} */}
                                            <Address
                                                address={address}
                                                currency={currency}
                                                forceEllipsis
                                                renderLabel={() => (
                                                    <Text brandPrimary small>
                                                        <String
                                                            id="copyWalletAddress"
                                                            variables={{
                                                                currency:
                                                                    t(currency)
                                                            }}
                                                        />
                                                    </Text>
                                                )}
                                                small
                                            />
                                        </HeroCardRow>
                                    )
                                )}
                                <HeroCardRow>
                                    <Div inlineFlex sAlignItems="center">
                                        <Icon
                                            esolidar
                                            icon="esolidar"
                                            sHeight={2.375}
                                        />
                                        <RichContentFormat ml={0.5}>
                                            <Text small>
                                                <String
                                                    id="page.fundraise.hero.addresses.esolidar.label"
                                                    variables={{
                                                        url: esolidarCampaignUrl
                                                    }}
                                                />
                                            </Text>
                                        </RichContentFormat>
                                    </Div>
                                </HeroCardRow>
                            </CardContent>
                        </Card>
                    </Col>
                </Row>
            </Grid>
        </Section>
    );
};
