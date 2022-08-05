import { Button, Div, DotBackground, Section, Text, TextLink } from '../theme/components';
import { PrismicSlice } from '../lib/Prismic/types';
import { colors, fonts } from '../theme';
import { modal } from 'react-modal-handler';
import { mq } from 'styled-gen';
import { useData } from '../components/CommunityMetricsProvider/CommunityMetricsProvider';
import { useRouter } from 'next/router';
import React from 'react';
import RichText from '../lib/Prismic/components/RichText';
import VideoSection from './VideoSection';
import styled, { css } from 'styled-components';

const Wrapper = styled.div`
    align-items: center;
    display: flex;
    flex-direction: column;
    max-width: 61rem;
    position: relative;
    text-align: center;
    width: 100%;

    > div .heading {
        letter-spacing: -0.02em;
        line-height: 4.2rem;

        ${mq.phone(css`
            font-size: 3rem;
            line-height: 3.5rem;
        `)}
    }

    span {
        color: ${colors.brandPrimary};
        font-weight: ${fonts.weights.bold};
    }
`;

const BackgroundWrapper = styled.div`
    bottom: 4.5rem;
    height: 20rem;
    position: absolute;
    width: 100vw;
    z-index: -1;
`;

const Hero = (props: PrismicSlice) => {
    const { items, primary } = props;
    const { buttonSecondaryLabel, buttonPrimaryUrl, buttonPrimaryLabel, text, subtitle, heading } = primary;
    const { beneficiaries = '', communities = 0, countries = 0 } = useData() || {};
    const { asPath, push } = useRouter();
    const services = Object.keys(items).map(key => items[key as any].service);

    return (
        <Section flex pb={{ xs: 2 }} sJustifyContent="center" sPadding="0 1rem">
            <Wrapper>
                <Div flex sFlexDirection="column" sJustifyContent="center" sMaxWidth="43rem">
                    <Text className="heading" fontSize="3.5rem" lead1 sFontWeight="600">
                        {heading}
                    </Text>
                </Div>
                <RichText
                    content={subtitle}
                    label1
                    pb="2rem"
                    pt="1.5rem"
                    sFontWeight="600"
                    variables={{
                        totalBeneficiaries: `<span>${beneficiaries}</span>`,
                        totalCommunities: `<span>${communities}</span>`,
                        totalCountries: `<span>${countries}</span>`
                    }}
                />
                <Text sMaxWidth="90%">
                    <RichText
                        content={text}
                        label1
                        variables={{
                            services: `<span>${services.join(', ')}</span>`
                        }}
                    />
                </Text>
                <Div flex sJustifyContent="center" sPadding="2rem 1rem 0" style={{ flexWrap: 'wrap' }}>
                    <TextLink
                        brandPrimary
                        href={`http://${buttonPrimaryUrl}`}
                        pb="1rem"
                        pr="1rem"
                        rel="noopener noreferrer"
                        target="_blank"
                    >
                        <Button mr={{ sm: 2, xs: 0 }} sHeight="3rem" smaller>
                            <Text bold>{buttonPrimaryLabel}</Text>
                        </Button>
                    </TextLink>

                    <Button
                        linedSecondary
                        mr={{ sm: 2, xs: 0 }}
                        onClick={() => {
                            return modal.open('governanceContribute', {
                                onSuccess: () => asPath !== '/governance' && push('/governance')
                            });
                        }}
                        sHeight="3rem"
                    >
                        <Text regular>{buttonSecondaryLabel}</Text>
                    </Button>
                </Div>

                <Div pb="7rem" sWidth="100%">
                    <VideoSection onlyVideo primary={primary} />
                </Div>
                <BackgroundWrapper>
                    <DotBackground />
                </BackgroundWrapper>
            </Wrapper>
        </Section>
    );
};

export default Hero;
