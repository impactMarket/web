import { Button } from '../../theme/components';
import { String } from '../String/String';
import { colors, fonts } from '../../theme';
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
    page?: number | string;
    type?: string;
};

const buttonItemRender = (buttonRenderProps: ButtonRenderProps) => {
    const { current, element, page, type } = buttonRenderProps;
    const isActive = current == page;

    if (type === 'prev') {
        return (
            <Button pagination regular small>
                <String id="prev" />
            </Button>
        );
    }

    if (type === 'next') {
        return (
            <Button pagination regular small>
                <String id="next" />
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
        <Button className={isActive ? 'is-active' : ''} pagination regular small>
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

            button.is-active {
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

    if (count < limit) {
        return null;
    }

    const PaginationTypes: any = PaginationComp;

    return (
        <PaginationWrapper>
            <PaginationTypes
                current={page}
                itemRender={(current: any, type: any, element: any) =>
                    buttonItemRender({ current, element, page, type })
                }
                onChange={(pageNumber: number) => onPageChange(pageNumber)}
                pageSize={limit}
                showTitle={false}
                simple={isPhone}
                total={count}
            />
        </PaginationWrapper>
    );
};
