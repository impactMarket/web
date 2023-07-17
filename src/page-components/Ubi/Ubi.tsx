import { usePrismicData } from '../../lib/Prismic/components/PrismicDataProvider';
import React, { useEffect, useState } from 'react';
import Slices from '../../lib/Prismic/components/Slices';

import { CommunityMetricsProvider } from '../../components/CommunityMetricsProvider/CommunityMetricsProvider';
import Api from '../../apis/api';
import { formatData } from '../../helpers/formatData';

export const Ubi = () => {
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
            <Slices slices={slices} />
        </CommunityMetricsProvider>
    );
};
