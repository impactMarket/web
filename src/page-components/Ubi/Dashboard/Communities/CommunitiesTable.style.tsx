import { colors } from '../../../../theme';
import { mq } from 'styled-gen';
import styled, { css } from 'styled-components';

export const TablePagination = styled.div`
    border-top: 1px solid ${colors.border};
    display: flex;
    justify-content: space-between;
    padding: 1rem;
    width: 100%;
`;

export const TableWrapper = styled.div`
    overflow-x: auto;
    overflow-y: hidden;

    ${mq.tabletLandscape(css`
        min-width: 60rem;
    `)}

    table {
        border-bottom: 1px solid ${colors.border};
        border-top: 1px solid ${colors.border};
        max-width: 100%;
        display: table;
    }

    thead {
        th {
            color: ${colors.textSecondary};
            font-size: 10px;
            padding: 0.75rem 1rem;
            vertical-align: middle;

            &:first-of-type {
                text-align: left;
                width: 14rem;
            }

            &:last-of-type {
                text-align: right;
            }
        }

        tr {
            border-bottom: 1px solid ${colors.border};
        }
    }

    tbody {
        td {
            padding: 0.75rem 1rem;
            vertical-align: middle;

            &:not(:first-of-type) {
                text-align: center;
            }

            &:last-of-type {
                text-align: right;
            }
        }

        tr {
            &:not(:last-of-type) {
                border-bottom: 1px solid ${colors.border};
            }
        }
    }
`;
