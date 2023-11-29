import { PrismicRichTextType } from '../../../lib/Prismic/types';
import { colors } from '../../../theme';
import { usePrismicData } from '../../../lib/Prismic/components/PrismicDataProvider';
import React from 'react';
import RichText from '../../../lib/Prismic/components/RichText';
import styled from 'styled-components';

type PromotionalBannerType = {
    content?: PrismicRichTextType;
    isActive?: boolean;
};

const PromotionalBannerWrapper = styled.div`
    display: flex;
    justify-content: center;
    background-color: ${colors.backgroundSecondary};
    padding: 0.625rem 2rem;
`;

const PromotionalBanner = () => {
    const { extractFromPage } = usePrismicData();
    const { content, isActive } = extractFromPage(
        'promotionalBanner'
    ) as PromotionalBannerType;

    if (!isActive) {
        return null;
    }

    return (
        <PromotionalBannerWrapper>
            <RichText sFontWeight={700} center content={content} />
        </PromotionalBannerWrapper>
    );
};

export default PromotionalBanner;
