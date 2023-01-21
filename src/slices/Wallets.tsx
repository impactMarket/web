import { Col, Grid, Row, Section, Text } from '../theme/components';
import { Copied } from '../components/Copied/Copied';
import { PrismicSlice } from '../lib/Prismic/types';
import { colors } from '../theme';
import CopyToClipboard from 'react-copy-to-clipboard';
import React, { useState } from 'react';
import RichText from '../lib/Prismic/components/RichText';
import styled from 'styled-components';

const Wrapper = styled.div`
    align-items: center;
    display: flex;
    flex-direction: column;
    height: 100%;
    padding: 2rem;
    text-align: center;
    gap: 1.25rem;
`;

const WalletIcon = styled.div`
    height: 3.5rem;
`;

const Image = styled.img`
    height: 100%;
    width: auto;
`;

const Wallets = (props: PrismicSlice) => {
    const { items, primary } = props;
    const { heading, subtitle, text } = primary;
    const [copied, setCopied] = useState<any>();

    return (
        <Section sBackground={colors.g50}>
            <Grid pb={4} pt={4}>
                <Row>
                    <Col sWidth="100%">
                        {heading && (
                            <Text mb={1} sColor={colors.p700} sFontSize={1} sFontWeight={600}>
                                {heading}
                            </Text>
                        )}

                        {subtitle && (
                            <Text mb={1} sFontSize={2.25} sFontWeight={600} sLineHeight={2.75}>
                                {subtitle}
                            </Text>
                        )}

                        {!!text && (
                            <Text mb={2} sColor={colors.g500} sFontSize={1.25}>
                                <RichText content={text} />
                            </Text>
                        )}
                    </Col>
                </Row>

                <Row style={{ justifyContent: 'center' }}>
                    {items.map(
                        ({ copyWallet, icon, isActive, text, wallet, walletAddress }, index) =>
                            !!isActive && (
                                <Col
                                    key={index}
                                    md={4}
                                    mt={{
                                        md: index > 2 ? 4 : 0,
                                        sm: index > 1 ? 2 : 0,
                                        xs: index ? 2 : 0
                                    }}
                                    sm={6}
                                    style={{
                                        flexGrow: 1,
                                        maxWidth: 'unset'
                                    }}
                                    xs={12}
                                >
                                    <Wrapper>
                                        {!!icon?.url && (
                                            <WalletIcon>
                                                <Image src={icon?.url} />
                                            </WalletIcon>
                                        )}
                                        {wallet && (
                                            <Text sColor={colors.g900} sFontSize={1.5} sFontWeight={600}>
                                                {wallet}
                                            </Text>
                                        )}
                                        {copyWallet && (
                                            <>
                                                {copied === walletAddress && <Copied trigger={copied} />}
                                                <CopyToClipboard
                                                    onCopy={() => setCopied(walletAddress)}
                                                    text={walletAddress}
                                                >
                                                    <Text
                                                        sColor={colors.p700}
                                                        sFontSize={1.125}
                                                        sFontWeight={500}
                                                        style={{ cursor: 'pointer' }}
                                                    >
                                                        {copyWallet}
                                                    </Text>
                                                </CopyToClipboard>
                                            </>
                                        )}
                                        {!!text && (
                                            <RichText
                                                content={text}
                                                sColor={colors.g500}
                                                sFontSize={0.75}
                                                sMaxWidth="350px"
                                                textSecondary
                                            />
                                        )}
                                    </Wrapper>
                                </Col>
                            )
                    )}
                </Row>
            </Grid>
        </Section>
    );
};

export default Wallets;
