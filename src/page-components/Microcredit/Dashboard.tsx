import { Div, Row, Text } from '../../theme/components';
import { MicrocreditDashboardProvider } from '../../components/MicrocreditDashboardProvider/MicrocreditDashboardProvider';
import { colors } from '../../theme';
import { usePrismicData } from '../../lib/Prismic/components/PrismicDataProvider';
import Api from '../../apis/api';
import React, { useEffect, useState } from 'react';
import Slices from '../../lib/Prismic/components/Slices';
import styled from 'styled-components';

const HeadingRow = styled(Row)`
    align-items: center;
    flex-direction: column;
    max-width: 800px;
    text-align: center;
    margin: 2rem auto 0 auto;
`;

export const MicrocreditDashboard = () => {
    const { page } = usePrismicData();
    const slices = page?.data?.body;
    const { heading, smallHeading } = page?.data;
    const [microcreditData, setMicrocreditData] = useState() as any;
    const [microcreditDemographics, setMicrocreditDemographics] =
        useState() as any;

    useEffect(() => {
        const getMicrocredit = async () => {
            const microcreditData = await Api.getMicrocreditData();
            const microcreditDemographics =
                await Api.getMicrocreditDemographics();

            setMicrocreditData(microcreditData);
            setMicrocreditDemographics(microcreditDemographics);
        };

        getMicrocredit();
    }, []);

    return (
        <MicrocreditDashboardProvider
            data={microcreditData?.data}
            demographics={microcreditDemographics?.data}
        >
            <Div
                sFlexDirection="column"
                style={{ backgroundColor: colors.p25 }}
            >
                <HeadingRow>
                    {smallHeading && (
                        <Text sColor={colors.p700} sFontWeight={600}>
                            {smallHeading}
                        </Text>
                    )}
                    {heading && (
                        <Text
                            mt={0.75}
                            sColor={colors.g900}
                            sFontSize={{
                                md: 3,
                                xs: 2
                            }}
                            sFontWeight={600}
                            sLineHeight={{
                                md: 2.75,
                                xs: 2.5
                            }}
                        >
                            {heading}
                        </Text>
                    )}
                </HeadingRow>
                <Slices slices={slices} />
            </Div>
        </MicrocreditDashboardProvider>
    );
};
