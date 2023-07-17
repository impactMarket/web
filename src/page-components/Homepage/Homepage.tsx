import { usePrismicData } from '../../lib/Prismic/components/PrismicDataProvider';
import PromotionalBanner from './PromotionalBanner/PromotionBanner';
import React, { useEffect, useState } from 'react';
import Slices from '../../lib/Prismic/components/Slices';
import { formatData } from '../../helpers/formatData';

import { CommunityMetricsProvider } from '../../components/CommunityMetricsProvider/CommunityMetricsProvider';
import Api from '../../apis/api';

export const Homepage = () => {
    const { page } = usePrismicData();
    const slices = page?.data?.body;

    const [numbers, setNumbers] = useState<any>();

    useEffect(() => {
        const getNumbers = async () => {
            try {
                const numbers = (await Api.getGlobalNumbers()) as any;
                const microcredit = (await Api.getMicrocreditData()) as any;
                const global = (await Api.getGlobalValues()) as any;

                const mergedData = {
                    ...global?.general,
                    ...microcredit?.data,
                    ...numbers
                };

                const numbersFromAPI = slices.find((item: any) =>
                    item.sliceType.includes('numbers_from_api')
                );
                const formatNumbers = numbersFromAPI?.primary?.formatNumbers;

                const format = formatData(mergedData, formatNumbers);

                setNumbers(format);
            } catch (error) {
                console.log(error);
            }
        };

        getNumbers();
    }, [slices]);

    return (
        <CommunityMetricsProvider metrics={numbers}>
            <PromotionalBanner />
            <Slices slices={slices} />
        </CommunityMetricsProvider>
    );
};
