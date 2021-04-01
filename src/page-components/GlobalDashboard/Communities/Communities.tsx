import {
    Col,
    DashboardCard,
    Div,
    Grid,
    Heading,
    ItemsRow,
    Row,
    Section,
    Select,
    Text
} from '../../../theme/components';
import { CommunitiesTable } from './CommunitiesTable';
import { DashboardChart } from '../../../components';
import { ICommunity, IGlobalDashboard } from '../../../apis/types';
import { communitiesTable } from '../../../apis/communitiesTable';
import { getChartDateValueTooltip } from '../../../helpers/getChartDateValueTooltip';
import { useData } from '../../../components/DataProvider/DataProvider';
import Api from '../../../apis/api';
import React, { useEffect, useState } from 'react';

type CommunitiesProps = {
    data: IGlobalDashboard;
    heading: string;
    filterOptions: {
        label: string;
        value: string;
    }[];
    ssi: {
        heading: string;
        text: string;
    };
    table: {
        header: {
            label: string;
            name: string;
        }[];
        initialRows: number;
    };
    text: string;
};

export const Communities = (props: CommunitiesProps) => {
    const { data: globalData, filterOptions, heading, ssi, table, text } = props;
    const { getString } = useData();
    const initialSelectedFilter = filterOptions.find(({ value }) => value === 'bigger')?.value || 'bigger';
    const [communities, setCommunities] = useState<ICommunity[] | undefined>();
    const [communitiesFilter, setCommunitiesFilter] = useState(initialSelectedFilter);
    const [data, setData] = useState<{ [key: string]: any }[]>();
    const [ssiData, setSsiData] = useState<{ name: number; uv: any }[]>();

    useEffect(() => {
        const getCommunities = async () => {
            const communities = await Api.listCommunities(communitiesFilter);

            setCommunities(communities);
        };

        getCommunities();
    }, [communitiesFilter]);

    useEffect(() => {
        const data = communitiesTable.getRows(communities || [], getString);

        setData(data);
    }, [communities]);

    useEffect(() => {
        const ssiData = globalData.lastQuarterAvgSSI
            .map(({ avgMedianSSI, date }) => ({ name: new Date(date).getTime(), uv: avgMedianSSI }))
            .reverse();

        setSsiData(ssiData);
    }, [globalData.lastQuarterAvgSSI]);

    const columns = React.useMemo(
        () => table.header.map(({ label: Header, name: accessor }) => ({ Header, accessor })),
        []
    );

    if (!data) {
        return null;
    }

    return (
        <Section pt={{ sm: 4, xs: 2 }} sBackground="backgroundLight">
            <Grid>
                <Row>
                    <Col xs={12}>
                        <Heading h3>
                            {heading.replace(
                                '{{ communitiesCount }}',
                                `${communities?.length || getString('many') || ''}`
                            )}
                        </Heading>
                        <Text mt={0.5} small>
                            {text}
                        </Text>
                    </Col>
                </Row>
                <Row mt={0.5}>
                    <Col xs={12}>
                        <DashboardCard sPadding="0">
                            <Div sJustifyContent="end" sPadding="1">
                                <Select
                                    initialSelected={initialSelectedFilter}
                                    onChange={(value: string) => setCommunitiesFilter(value)}
                                    options={filterOptions}
                                    sMinWidth={12.25}
                                />
                            </Div>
                            {communities && (
                                <CommunitiesTable columns={columns} data={data} pageSize={table?.initialRows || 10} />
                            )}
                        </DashboardCard>
                    </Col>
                </Row>
                <Row mt={2.75}>
                    <Col xs={12}>
                        <DashboardCard>
                            <ItemsRow distribute="tablet">
                                <Div column>
                                    <Text small textSecondary>
                                        {ssi?.heading}
                                    </Text>
                                    <Heading h3 mt={0.25}>
                                        {globalData?.monthly[0]?.avgMedianSSI}%
                                    </Heading>
                                    <Text XXSmall mt={0.5} textSecondary>
                                        {ssi?.text}
                                    </Text>
                                </Div>
                                {ssiData && (
                                    <DashboardChart
                                        data={ssiData}
                                        tooltip={(payload: any, label: any) =>
                                            getChartDateValueTooltip(getString('averageSsiWas'), payload, label)
                                        }
                                    />
                                )}
                            </ItemsRow>
                        </DashboardCard>
                    </Col>
                </Row>
            </Grid>
        </Section>
    );
};
