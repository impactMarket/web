import { String } from '../../../components';
import { Text, TextLink } from '../../../theme/components';
import { colors } from '../../../theme';
import { useData } from '../../../components/DataProvider/DataProvider';
import React from 'react';
import styled from 'styled-components';

type PromotionBannerType = {
    isActive?: boolean;
    url?: string;
};

const PromotionBannerWrapper = styled.div`
    display: flex;
    justify-content: center;
    margin-bottom: 2rem;
    background-color: ${colors.backgroundSecondary};
    padding: 0.625rem 2rem;
`;

export const PromotionBanner = () => {
    const { page } = useData();

    const promotionBanner: PromotionBannerType = page?.promotionBanner;

    const { isActive, url } = promotionBanner;

    if (!isActive) {
        return null;
    }

    return (
        <PromotionBannerWrapper>
            <Text bold center>
                <String id="promotionBanner" />
                &nbsp;
                <TextLink
                    bold
                    brandPrimary
                    href={url}
                    rel="noopener noreferrer"
                    style={{ display: 'inline' }}
                    target="_blank"
                >
                    <String id="promotionBannerLinkLabel" />
                </TextLink>
            </Text>
        </PromotionBannerWrapper>
    );
};
