import { Checkbox, Div, Icon, Input, Text } from '../../../theme/components';
import { String } from '../../String/String';
import { colors, fonts } from '../../../theme';
import { mq } from 'styled-gen';
import { remove } from 'lodash';
import { rgba } from 'polished';
import React, { ChangeEvent, useEffect, useState } from 'react';
import styled, { css } from 'styled-components';

type FilterListProps = {
    defaultSearchValue?: string;
    defaultValue?: string[];
    isResetable?: boolean;
    isSelectable?: boolean;
    items?: {
        count?: string | number;
        description?: string;
        flag?: string;
        label: string;
        value: string;
    }[];
    handleChange?: Function;
    handleSearch?: Function;
    searchPlaceholder?: string;
    withCounter?: boolean;
};

const List = styled.ul`
    overflow: auto;
    max-height: 30vh;

    ${mq.tablet(css`
        max-height: 20rem;
    `)}
`;

const ListFooter = styled.div`
    padding: 1rem;
`;

const ListItem = styled.li`
    align-items: center;
    cursor: default;
    display: flex;
    flex-shrink: 0;
    justify-content: space-between;
    padding: 0.75rem 1rem;

    &:hover {
        background-color: ${colors.backgroundLight};
    }
`;

const ListItemCol = styled.div`
    display: flex;

    &:first-of-type {
        padding-right: 0.75rem;
    }
`;

const ListItemCounter = styled.div`
    align-items: center;
    background-color: ${rgba(colors.borderLight, 0.3)};
    border-radius: 0.5rem;
    color: ${colors.brandBlack};
    display: flex;
    font-family: ${fonts.families.inter};
    font-size: 13px;
    height: 1.75rem;
    justify-content: center;
    line-height: 1;
    padding: 0 0.5rem;
`;

const ListResetButton = styled.a`
    color: ${colors.brandPrimary};
    font-family: ${fonts.families.inter}
    font-size: 1rem;
`;

const ListSearchInput = styled.input<any>`
    background-color: transparent;
    border: 0;
    font-family: ${fonts.families.inter};
    font-size: 16px;
    height: 100%;
    margin-left: 0.5rem;
    outline: 0;
    width: 100%;

    ::placeholder,
    ::-webkit-input-placeholder {
        color: ${colors.textSecondary};
    }
`;

const ListSearchInputWrapper = styled(Input).attrs({
    as: 'div',
    md: true,
    withLightBackground: true
})`
    display: flex;
    align-items: center;
`;

const ListWrapper = styled.div``;

export const FilterList = (props: FilterListProps) => {
    const {
        defaultSearchValue,
        defaultValue,
        handleChange,
        handleSearch,
        isResetable,
        isSelectable,
        items,
        searchPlaceholder,
        withCounter
    } = props;
    const [selected, setSelected] = useState(defaultValue || []);
    const [searchInputValue, setSearchInputValue] = useState(defaultSearchValue || '');

    useEffect(() => {
        if (typeof handleChange === 'function' && isSelectable) {
            handleChange(selected);
        }
    }, [selected]);

    useEffect(() => {
        if (typeof handleSearch === 'function') {
            handleSearch(searchInputValue);
        }
    }, [searchInputValue]);

    const checkIfIsSelected = (value?: string) => {
        if (!isSelectable) {
            return;
        }

        return !!selected?.find(val => val === value);
    };

    const handleReset = () => {
        if (!!selected?.length) {
            setSelected([]);
        }

        if (searchInputValue) {
            setSearchInputValue('');
        }
    };

    const handleToggle = (value?: string) => {
        const selectedItems = [...selected];

        if (typeof handleChange !== 'function' || !isSelectable) {
            return;
        }

        const withValue = selectedItems.find(val => val === value);

        withValue ? remove(selectedItems, val => val === value) : selectedItems.push(value);

        setSelected(selectedItems);
    };

    const handleSearchChange = (event: ChangeEvent<HTMLInputElement>) => {
        setSearchInputValue(event?.target?.value);
    };

    return (
        <ListWrapper>
            {typeof handleSearch === 'function' && (
                <Div sPadding={1}>
                    <ListSearchInputWrapper>
                        <Icon brandSecondaryLight icon="magnifier" sHeight={1} />
                        <ListSearchInput
                            onChange={handleSearchChange}
                            placeholder={searchPlaceholder}
                            type="text"
                            value={searchInputValue || ''}
                        />
                    </ListSearchInputWrapper>
                </Div>
            )}
            <List>
                {!!items?.length &&
                    items.map(({ count, description, label, value }, index) => (
                        <ListItem key={index} onClick={() => handleToggle(value)}>
                            <ListItemCol>
                                {label && <Text medium>{label}</Text>}
                                {description && (
                                    <Text XSmall brandSecondary>
                                        {description}
                                    </Text>
                                )}
                            </ListItemCol>
                            {(isSelectable || withCounter) && (
                                <ListItemCol>
                                    {withCounter && <ListItemCounter>{count || 0}</ListItemCounter>}
                                    {isSelectable && (
                                        <Div ml={withCounter ? 0.75 : 0}>
                                            <Checkbox isChecked={checkIfIsSelected(value)} />
                                        </Div>
                                    )}
                                </ListItemCol>
                            )}
                        </ListItem>
                    ))}

                {!items.length && !!handleSearch && (
                    <Text brandSecondary sPadding={1}>
                        <String id="noOptions" />
                    </Text>
                )}
            </List>
            {isResetable && isSelectable && (
                <ListFooter>
                    <ListResetButton onClick={handleReset}>
                        <String id="clear" />
                    </ListResetButton>
                </ListFooter>
            )}
        </ListWrapper>
    );
};
