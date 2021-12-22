import { RichContentFormat, Text } from '../../../theme/components';
import { String } from '../../../components';
import { colors } from '../../../theme';
import { useData } from '../../../components/DataProvider/DataProvider';
import React from 'react';
import styled from 'styled-components';

type PromotionBannerType = {
    isActive?: boolean;
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

    const { isActive } = promotionBanner;

    if (!isActive) {
        return null;
    }

    return (
        <PromotionBannerWrapper>
            <RichContentFormat>
                <Text bold center>
                    <String id="promotionBanner" />
                </Text>
            </RichContentFormat>
        </PromotionBannerWrapper>
    );
};
