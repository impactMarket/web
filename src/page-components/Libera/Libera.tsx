import { usePrismicData } from '../../lib/Prismic/components/PrismicDataProvider';
import React, { useEffect, useState } from 'react';
import Slices from '../../lib/Prismic/components/Slices';

import { CommunityMetricsProvider } from '../../components/CommunityMetricsProvider/CommunityMetricsProvider';
import Api from '../../apis/api';

export const Libera = () => {
    const { page } = usePrismicData();
    const slices = page?.data?.body;

    const [numbers, setNumbers] = useState<any>();

    useEffect(() => {
        const getNumbers = async () => {
            try {
                const numbers = (await Api.getGlobalNumbers()) as any;

                setNumbers(numbers);
            } catch (error) {
                console.log(error);
            }
        };

        getNumbers();
    }, []);

    return (
        <CommunityMetricsProvider metrics={numbers}>
            <Slices slices={slices} />
        </CommunityMetricsProvider>
    );
};
