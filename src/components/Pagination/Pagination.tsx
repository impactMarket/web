import { Button } from '../../theme/components';
import { colors, fonts } from '../../theme';
import { useData } from '../DataProvider/DataProvider';
import PaginationComp from 'rc-pagination';
import React from 'react';
import styled from 'styled-components';

type PaginationProps = {
    count: number;
    isPhone: boolean;
    limit: number;
    onPageChange: Function;
    page: number;
};

type ButtonRenderProps = {
    current?: number;
    element?: any;
    getString: Function;
    type?: string;
};

const buttonItemRender = (buttonRenderProps: ButtonRenderProps) => {
    const { element, getString, type } = buttonRenderProps;

    if (type === 'prev') {
        return (
            <Button pagination regular small>
                {getString('prev')}
            </Button>
        );
    }

    if (type === 'next') {
        return (
            <Button pagination regular small>
                {getString('next')}
            </Button>
        );
    }

    if (type === 'jump-next' || type === 'jump-prev') {
        return (
            <Button pagination regular small>
                ...
            </Button>
        );
    }

    return (
        <Button pagination regular small>
            {element?.props?.children}
        </Button>
    );
};

const PaginationWrapper = styled.div`
    display: flex;
    justify-content: center;
    margin-top: 2rem;
    width: 100%;

    ul {
        display: flex;

        li {
            & + li {
                margin-left: 0.5rem;
            }
        }

        li.rc-pagination-item-active {
            button {
                background-color: ${colors.brandPrimary};
                box-shadow: none !important;
                color: ${colors.white};
                cursor: default !important;
            }
        }

        li button {
            &:disabled {
                opacity: 0.5;
            }
        }

        .rc-pagination-simple-pager {
            color: ${colors.textSecondary};

            input {
                background-color: ${colors.backgroundLight};
                border-radius: 0.25rem;
                border: 0;
                font-family: ${fonts.families.inter};
                font-size: 1rem;
                height: 2.75rem;
                text-align: center;
                width: 2.75rem;

                &:focus,
                &:focus-visible {
                    outline-color: ${colors.brandSecondary};
                }
            }

            span {
                margin-left: 0.5rem;
                margin-right: 0.5rem;
            }
        }
    }
`;

export const Pagination = (props: PaginationProps) => {
    const { count, isPhone, limit, onPageChange, page } = props;
    const { getString } = useData();

    if (count < limit) {
        return null;
    }

    return (
        <PaginationWrapper>
            <PaginationComp
                current={page}
                itemRender={(current, type, element) => buttonItemRender({ current, element, getString, type })}
                onChange={(pageNumber: number) => onPageChange(pageNumber)}
                pageSize={limit}
                showTitle={false}
                simple={isPhone}
                total={count}
            />
        </PaginationWrapper>
    );
};
