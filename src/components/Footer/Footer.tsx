import { Col, Grid, Row, Section, Text, TextLink } from '../../theme/components';
import { Img, LinksColumn, LinksWrapper } from './Footer.style';
import { SocialMenu } from '../SocialMenu/SocialMenu';
import { colors } from '../../theme';
import { usePrismicData } from '../../lib/Prismic/components/PrismicDataProvider';
import Link from 'next/link';
import React from 'react';
import RichText from '../../lib/Prismic/components/RichText';

type FooterLinksSlice = {
    primary?: {
        groupTitle?: string;
        groupTitleUrl?: string;
    };
    items?: {
        title?: string;
        url?: string;
    }[];
};

export const Footer = () => {
    const { config: prismicConfig } = usePrismicData();

    const { footerCopyright, footerDescription, footerLogo } = prismicConfig?.data;
    const footerLinks = prismicConfig?.data?.footerLinks as FooterLinksSlice[];

    return (
        <Section
            flex
            relative
            sPadding={{ sm: '4 1', xs: '2 0' }}
            sWidth="100%"
            style={{
                background: colors.brandPrimary,
                overflow: 'hidden',
                zIndex: 0
            }}
        >
            <Grid>
                <Row mb={5}>
                    <Col md={3} sWidth="100%" sm={12}>
                        {footerLogo && (
                            <Link href="/">
                                <a
                                    style={{
                                        cursor: 'pointer',
                                        fontSize: 0
                                    }}
                                >
                                    <Img inlineFlex sHeight={2.813} sWidth="auto" src={footerLogo.url} />
                                </a>
                            </Link>
                        )}
                        {footerDescription && (
                            <Text className="text" mt={2} sMaxWidth="400px">
                                <RichText content={footerDescription} sColor={colors.p200} />
                            </Text>
                        )}
                    </Col>
                    <LinksColumn>
                        {footerLinks?.map((content, contentKey) => (
                            <LinksWrapper key={contentKey}>
                                {content?.primary?.groupTitle && (
                                    <Text mb={0.125} sColor={colors.p400} sFontSize={0.875} sFontWeight={600}>
                                        {content?.primary?.groupTitle}
                                    </Text>
                                )}
                                {content?.items &&
                                    content.items.map(
                                        (link, linkKey) =>
                                            link?.url && (
                                                <TextLink
                                                    href={link.url}
                                                    key={linkKey}
                                                    sColor={colors.p200}
                                                    sFontWeight={500}
                                                >
                                                    {link?.title}
                                                </TextLink>
                                            )
                                    )}
                            </LinksWrapper>
                        ))}
                    </LinksColumn>
                </Row>

                <Row>
                    <Col
                        flex
                        sAlignItems="center"
                        sJustifyContent="space-between"
                        sWidth="100%"
                        style={{ flexWrap: 'wrap', gap: '1rem 2rem' }}
                    >
                        {footerCopyright && <Text sColor={colors.white}>{footerCopyright}</Text>}
                        <SocialMenu color={colors.g25} />
                    </Col>
                </Row>
            </Grid>
        </Section>
    );
};
