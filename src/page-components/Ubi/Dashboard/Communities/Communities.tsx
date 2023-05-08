import { Col, DashboardCard, Div, Grid, Heading, Row, Section, Select, Text } from '../../../../theme/components';
import { CommunitiesTable } from './CommunitiesTable';
import { ICommunity, IGlobalDashboard } from '../../../../apis/types';
import { String } from '../../../../components';
import { communitiesTable } from '../../../../apis/communitiesTable';
import { useTranslation } from '../../../../components/TranslationProvider/TranslationProvider';
import Api from '../../../../apis/api';
import React, { useEffect, useState } from 'react';

type CommunitiesProps = {
    data: IGlobalDashboard;
    filterOptions: {
        labelKey: string;
        value: string;
    }[];
    table: {
        header: {
            labelAppend?: string;
            name: string;
        }[];
        initialRows: number;
    };
};

export const Communities = (props: CommunitiesProps) => {
    const { filterOptions, table } = props;
    const { t } = useTranslation();
    const initialSelectedFilter = filterOptions.find(({ value }) => value === 'bigger')?.value || 'bigger';
    const [communities, setCommunities] = useState<ICommunity[] | undefined>();
    const [totalCommunities, setTotalCommunities] = useState(0);
    const [communitiesFilter, setCommunitiesFilter] = useState(initialSelectedFilter);
    const [data, setData] = useState<{ [key: string]: any }[]>();

    useEffect(() => {
        const getCommunities = async () => {
            const result = await Api.getCommunities({ limit: 300, orderBy: communitiesFilter });

            const communities = result?.items;

            setCommunities(communities);
            setTotalCommunities(result.count);
        };

        getCommunities();
    }, [communitiesFilter]);

    useEffect(() => {
        const data = communitiesTable.getRows(communities || [], t);

        setData(data);
    }, [communities]);

    const columns = React.useMemo(
        () =>
            table.header.map(({ labelAppend, name: accessor }) => ({
                Header: `${t(accessor)}${labelAppend || ''}`,
                accessor
            })),
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
                            <String
                                id="page.globalDashboard.communities.heading"
                                variables={{ communitiesCount: `${totalCommunities || t('many') || ''}` }}
                            />
                        </Heading>
                        <Text mt={0.5} small>
                            <String id="page.globalDashboard.communities.text" />
                        </Text>
                    </Col>
                </Row>
                <Row mt={1}>
                    <Col xs={12}>
                        <DashboardCard sPadding="0">
                            <Div sJustifyContent="end" sPadding="1">
                                <Select
                                    anchor="right"
                                    initialSelected={initialSelectedFilter}
                                    onChange={(value: string) => setCommunitiesFilter(value)}
                                    options={filterOptions.map(({ labelKey, ...filter }) => ({
                                        ...filter,
                                        label: t(labelKey)
                                    }))}
                                    type="grow"
                                />
                            </Div>
                            {communities && (
                                <CommunitiesTable
                                    columns={columns}
                                    count={totalCommunities}
                                    data={data}
                                    pageSize={table?.initialRows || 10}
                                />
                            )}
                        </DashboardCard>
                    </Col>
                </Row>
            </Grid>
        </Section>
    );
};
