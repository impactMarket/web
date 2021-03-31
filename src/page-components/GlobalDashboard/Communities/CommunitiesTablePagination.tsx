import { Div, IconButton, Select, Text } from '../../../theme/components';
import { useData } from '../../../components/DataProvider/DataProvider';
import React from 'react';
import styled from 'styled-components';

const PaginationWrapper = styled.div`
    display: flex;
    justify-content: space-between;
    padding: 1rem;
    width: 100%;
`;

const selectOptions = [
    { label: '3', value: 3 },
    { label: '5', value: 5 },
    { label: '10', value: 10 },
    { label: '25', value: 25 },
    { label: 'All', value: 'all' }
];

const SelectedRows = (label: string) => {
    return (
        <Text XXSmall body>
            {label}
        </Text>
    );
};

type PaginationProps = {
    canNextPage: boolean;
    canPreviousPage: boolean;
    count: number;
    nextPage: Function;
    pageIndex: number;
    pageSize: number;
    previousPage: Function;
    setPageSize: Function;
};

export const CommunitiesTablePagination = (props: PaginationProps) => {
    const { canNextPage, canPreviousPage, count, nextPage, pageIndex, pageSize, previousPage, setPageSize } = props;
    const { getString } = useData();
    const first = pageIndex * pageSize + 1;
    const last = pageIndex * pageSize + pageSize;

    return (
        <PaginationWrapper>
            <Div sAlignItems="center" sDisplay={{ md: 'flex', xs: 'none' }}>
                <Text XXSmall>{getString('rowsPerPage')}:</Text>
                <Select
                    initialSelected={pageSize}
                    ml={0.5}
                    onChange={(size: any) => setPageSize(size === 'all' ? count : size)}
                    options={selectOptions}
                    renderSelected={SelectedRows}
                />
            </Div>
            <Div ml="auto" sAlignItems="center">
                <Text XXSmall sDisplay="inline-flex">
                    {getString('communitiesPagination', { first, last, total: count })}
                </Text>
                <Div ml={1.5}>
                    <IconButton disabled={!canPreviousPage} icon="left" onClick={previousPage} />
                    <IconButton disabled={!canNextPage} icon="right" onClick={nextPage} />
                </Div>
            </Div>
        </PaginationWrapper>
    );
};
