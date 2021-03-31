import { CommunitiesTablePagination } from './CommunitiesTablePagination';
import { TableCell } from './TableCell';
import { TableWrapper } from './CommunitiesTable.style';
import { usePagination, useTable } from 'react-table';
import React from 'react';

type CommunitiesTableProps = {
    columns: {
        Header: string;
        accessor: string;
    }[];
    data: { [key: string]: any }[];
    pageSize: number;
};

export const CommunitiesTable = (props: CommunitiesTableProps) => {
    const { columns, data, pageSize: pageSizeFromProps } = props;

    const {
        canNextPage,
        canPreviousPage,
        getTableBodyProps,
        getTableProps,
        headerGroups,
        nextPage,
        page,
        prepareRow,
        previousPage,
        setPageSize,
        state: { pageIndex, pageSize }
    } = useTable(
        {
            columns,
            data,
            initialState: {
                pageIndex: 0,
                pageSize: pageSizeFromProps
            }
        },
        usePagination
    );

    const paginationProps = {
        canNextPage,
        canPreviousPage,
        count: data.length,
        nextPage,
        pageIndex,
        pageSize,
        previousPage,
        setPageSize
    };

    return (
        <>
            <TableWrapper>
                <table {...getTableProps()}>
                    <thead>
                        {headerGroups.map((headerGroup, index) => (
                            <tr {...headerGroup.getHeaderGroupProps()} key={index}>
                                {headerGroup.headers.map((column, cIndex) => (
                                    <th {...column.getHeaderProps()} key={cIndex}>
                                        {column.render('Header')}
                                    </th>
                                ))}
                            </tr>
                        ))}
                    </thead>
                    <tbody {...getTableBodyProps()}>
                        {page.map((row, index) => {
                            prepareRow(row);

                            return (
                                <tr {...row.getRowProps()} key={index}>
                                    {row.cells.map((cell, cellIndex) => {
                                        return (
                                            <td {...cell.getCellProps()} key={cellIndex}>
                                                <TableCell value={cell.value} />
                                            </td>
                                        );
                                    })}
                                </tr>
                            );
                        })}
                    </tbody>
                </table>
            </TableWrapper>
            <CommunitiesTablePagination {...paginationProps} />
        </>
    );
};
