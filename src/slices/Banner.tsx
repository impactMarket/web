import { PrismicSlice } from '../lib/Prismic/types';
import { colors } from '../theme/variables/colors';
import { mq } from 'styled-gen';
import React from 'react';
import RichText from '../lib/Prismic/components/RichText';
import styled, { css } from 'styled-components';

const BannerWrapper = styled.div<{
    tall?: boolean;
}>`
    align-items: center;
    display: flex;
    justify-content: center;
    min-height: ${props => (props.tall ? '70vh' : '215px')};
    overflow: hidden;
    position: relative;

    ${mq.upTo(
        'md',
        css<{
            tall?: boolean;
        }>`
            min-height: ${props => props.tall && '35vh'};
        `
    )}

    ${mq.upTo(
        'sm',
        css<{
            tall?: boolean;
        }>`
            min-height: ${props => (props.tall ? '35vh' : '120px')};
        `
    )}
`;

const Image = styled.img`
    height: 100%;
    left: 0;
    object-fit: cover;
    position: absolute;
    top: 0;
    width: 100%;
`;

const Text = styled(RichText)`
    max-width: 800px;
    position: relative;
    text-align: center;
    z-index: 1;
`;

const Banner = (props: PrismicSlice) => {
    const { primary } = props;
    const { image, text, size: tall } = primary;

    return (
        <BannerWrapper tall={tall}>
            {text && (
                <Text
                    content={text}
                    sColor={colors.white}
                    sFontSize={{ sm: 2.25, xs: 1.5 }}
                    sFontWeight={600}
                    sLineHeight={{ sm: 2.75, xs: 1.75 }}
                    sPadding={{ sm: '6rem 0', xs: '2rem 2rem' }}
                />
            )}
            <Image alt={text} src={image?.url} />
        </BannerWrapper>
    );
};

export default Banner;
