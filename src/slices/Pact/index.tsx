import {
    Button,
    Col,
    Grid,
    Icon,
    Row,
    Section,
    TLink,
    Text,
    TextLink
} from '../../theme/components';
import { DepositWrapper } from './Deposit';
import { Donate } from './Donate';
import { PrismicSlice } from '../../lib/Prismic/types';
import { Stake } from './Stake';
import { colors } from '../../theme';
import { usePrismicData } from '../../lib/Prismic/components/PrismicDataProvider';
import React, { useEffect } from 'react';
import RichText from '../../lib/Prismic/components/RichText';
import useFilters from 'src/hooks/useFilters';

const Pact = (props: PrismicSlice) => {
    const { primary } = props;
    const { page } = usePrismicData();
    const {
        backgroundColor,
        buttonPrimaryLabel,
        buttonPrimaryUrl,
        buttonPrimaryColor,
        buttonSecondaryLabel,
        buttonSecondaryUrl,
        buttonSecondaryColor,
        heading,
        id,
        subtitle,
        text,
        pactCard
    } = primary;
    const { update } = useFilters();

    // Send to component X if url has hash
    useEffect(() => {
        if (document.getElementById(location.hash.slice(1))) {
            document
                .getElementById(location.hash.slice(1))
                .scrollIntoView({ block: 'center' });
        }
    }, [location.hash]);

    const ButtonStyle = ({ buttonColor, buttonLabel }: any) => (
        <Button
            rebranded
            sHeight="3rem"
            sWidth="100%"
            secondaryDefault={buttonColor === 'secondary' && true}
        >
            <Text medium>{buttonLabel}</Text>
            <Icon
                icon="right"
                ml={1}
                sColor={buttonColor === 'secondary' && colors.p700}
                sHeight={0.8}
            />
        </Button>
    );

    const ButtonLink = ({ buttonUrl, buttonLabel, buttonColor }: any) => {
        const isModal = buttonUrl?.startsWith('modal:');

        if (isModal) {
            return (
                <TextLink
                    onClick={() =>
                        update('modal', buttonUrl?.replace(/^modal:/, ''))
                    }
                >
                    <ButtonStyle
                        buttonColor={buttonColor}
                        buttonLabel={buttonLabel}
                    />
                </TextLink>
            );
        }

        return (
            <TLink href={!!buttonUrl && buttonUrl}>
                <ButtonStyle
                    buttonColor={buttonColor}
                    buttonLabel={buttonLabel}
                />
            </TLink>
        );
    };

    return (
        <Section
            id={id?.substring(1)}
            relative
            sBackground={backgroundColor || colors.white}
        >
            <Grid pb={4} pt={4} relative>
                <Row>
                    <Col md={6} pr={{ md: '5vw', xs: 0 }} xs={12}>
                        {heading && (
                            <Text
                                mb={1}
                                sColor={colors.p700}
                                sFontSize={1}
                                sFontWeight={600}
                            >
                                {heading}
                            </Text>
                        )}

                        {subtitle && (
                            <Text
                                mb={1}
                                sFontSize={2.25}
                                sFontWeight={600}
                                sLineHeight={2.75}
                            >
                                {subtitle}
                            </Text>
                        )}

                        {!!text && (
                            <Text mb={2} sColor={colors.g500} sFontSize={1.25}>
                                <RichText content={text} />
                            </Text>
                        )}

                        {buttonPrimaryLabel && (
                            <Row pl="1rem" style={{ width: '100%' }}>
                                <ButtonLink
                                    buttonColor={buttonPrimaryColor}
                                    buttonLabel={buttonPrimaryLabel}
                                    buttonUrl={buttonPrimaryUrl}
                                />
                            </Row>
                        )}

                        {buttonSecondaryLabel && (
                            <Row mt={1} pl="1rem" style={{ width: '100%' }}>
                                <ButtonLink
                                    buttonColor={buttonSecondaryColor}
                                    buttonLabel={buttonSecondaryLabel}
                                    buttonUrl={buttonSecondaryUrl}
                                />
                            </Row>
                        )}
                    </Col>

                    {pactCard === 'donate' && (
                        <Col
                            flex
                            md={6}
                            mt={{ md: 0, xs: 2.5 }}
                            relative
                            sAlignItems="center"
                            xs={12}
                        >
                            <Donate translations={page?.data} />
                        </Col>
                    )}
                    {pactCard === 'stake' && (
                        <Col
                            flex
                            md={6}
                            mt={{ md: 0, xs: 2.5 }}
                            relative
                            sAlignItems="center"
                            xs={12}
                        >
                            <Stake translations={page?.data} />
                        </Col>
                    )}
                    {pactCard === 'deposit' && (
                        <Col
                            flex
                            md={6}
                            mt={{ md: 0, xs: 2.5 }}
                            relative
                            sAlignItems="center"
                            xs={12}
                        >
                            <DepositWrapper translations={page?.data} />
                        </Col>
                    )}
                </Row>
            </Grid>
        </Section>
    );
};

export default Pact;
