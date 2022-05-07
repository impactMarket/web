import { Div, IconButton, Select, Text } from '../../../theme/components';
import { String } from '../../../components';
import { mq } from 'styled-gen';
import React from 'react';
import styled, { css } from 'styled-components';

const PaginationWrapper = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    padding: 1rem;
    width: 100%;

    ${mq.tablet(css`
        flex-direction: row;
    `)}
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
    const first = pageIndex * pageSize + 1;
    const last = pageIndex * pageSize + pageSize;

    return (
        <PaginationWrapper>
            <Div sAlignItems="center" sDisplay="flex">
                <Text XXSmall>
                    <String id="rowsPerPage" />:
                </Text>
                <Select
                    initialSelected={pageSize}
                    ml={0.5}
                    onChange={(size: any) => setPageSize(size === 'all' ? count : size)}
                    options={selectOptions}
                    renderSelected={SelectedRows}
                />
            </Div>
            <Div ml={{ sm: 'auto' }} mt={{ sm: 0, xs: 0.5 }} sAlignItems="center">
                <Text XXSmall sDisplay="inline-flex">
                    <String id="communitiesPagination" variables={{ first, last, total: count }} />
                </Text>
                <Div ml={{ sm: 1.5, xs: 'auto' }}>
                    <IconButton disabled={!canPreviousPage} icon="left" onClick={previousPage} />
                    <IconButton disabled={!canNextPage} icon="right" onClick={nextPage} />
                </Div>
            </Div>
        </PaginationWrapper>
    );
};
