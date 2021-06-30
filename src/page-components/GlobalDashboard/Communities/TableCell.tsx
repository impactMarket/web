import { Text } from '../../../theme/components';
import Link from 'next/link';
import React from 'react';

type TableCellProps = {
    value?: any;
};

export const TableCell = (props: TableCellProps) => {
    const { value } = props;

    if (!value) {
        return (
            <Text XSmall medium>
                --
            </Text>
        );
    }

    if (value?.href && value?.label) {
        return (
            <Text XSmall brandPrimary medium>
                <a href={value.href} rel="noopener noreferrer" style={{ color: 'inherit' }} target="_blank">
                    {value.label}
                </a>
            </Text>
        );
    }

    if (Array.isArray(value)) {
        return (
            <>
                <Text bold brandPrimary={!!value[0]?.href} small>
                    {value[0]?.href ? (
                        <Link href={value[0].href}>
                            <a style={{ color: 'inherit' }}>{value[0].label}</a>
                        </Link>
                    ) : (
                        value[0]
                    )}
                </Text>
                <Text XSmall ellipsis medium textSecondary>
                    {value[1]}
                </Text>
            </>
        );
    }

    if (typeof value === 'string' || typeof value === 'number') {
        return (
            <Text XSmall ellipsis medium>
                {value}
            </Text>
        );
    }

    console.log('Invalid value for cell render', value);

    return (
        <Text XSmall error medium>
            !err
        </Text>
    );
};
