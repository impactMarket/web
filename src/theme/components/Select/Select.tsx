import { GeneratedPropsTypes } from '../../Types';
import { Icon } from '../Icon/Icon';
import {
    OptionItem,
    OptionList,
    OptionSelected,
    SelectWrapper
} from './Select.style';
import { Text } from '../Typography/Typography';
import { useClickOutside } from '../../../hooks/useClickOutside';
import React, { useEffect, useRef, useState } from 'react';

type OptionType = {
    label?: string;
    value: any;
};

export type OptionListProps = {
    anchor: 'left' | 'right';
    type: 'slide' | 'grow';
} & typeof optionListDefaultProps;

const optionListDefaultProps = {
    anchor: 'left',
    type: 'slide'
};

type SelectProps = {
    asActionList?: boolean;
    name?: string;
    noCaret?: boolean;
    onChange: Function;
    options: OptionType[];
    placeholder?: string;
    renderSelected?: Function;
    initialSelected?: any;
} & OptionListProps &
    GeneratedPropsTypes;

const getSelectedLabel = (
    selected: OptionType | undefined,
    placeholder: string | undefined
) => {
    if (!selected?.value) {
        return placeholder || '';
    }

    if (selected?.label) {
        return selected?.value?.slice(0, 2).toUpperCase();
    }

    return typeof selected?.value === 'string' ||
        typeof selected?.value === 'number'
        ? selected?.value
        : '';
};

const getSelectedOption = (initialSelected: any, options: OptionType[]) => {
    if (!initialSelected) {
        return;
    }

    return options.find(({ value }) => value === initialSelected);
};

export const Select = (props: SelectProps) => {
    const {
        anchor,
        asActionList,
        initialSelected,
        name,
        noCaret,
        onChange,
        options,
        placeholder,
        renderSelected,
        type,
        ...forwardProps
    } = props;
    const [selected, setSelected] = useState<OptionType | undefined>(
        getSelectedOption(initialSelected, options)
    );
    const [optionsVisible, setOptionsVisible] = useState<boolean>(false);
    const selectRef = useRef<any>();

    useEffect(() => {
        onChange(selected?.value);
    }, [selected]);

    const handleSelectClick = () => {
        setOptionsVisible(!optionsVisible);
    };

    const handleOptionClick = (selecting: OptionType) => {
        if (selecting?.value !== selected?.value) {
            return setSelected(selecting);
        }
    };

    const handleClickOutside = () => {
        if (optionsVisible) {
            return setOptionsVisible(false);
        }
    };

    useClickOutside(selectRef?.current, handleClickOutside);

    return (
        <SelectWrapper {...forwardProps}>
            <input name={name} type="hidden" value={selected?.value || ''} />
            <OptionSelected onClick={handleSelectClick} ref={selectRef}>
                {!!renderSelected ? (
                    renderSelected(
                        getSelectedLabel(selected, placeholder),
                        !!selected?.value
                    )
                ) : (
                    <Text small>{getSelectedLabel(selected, placeholder)}</Text>
                )}
                {!noCaret && (
                    <Icon
                        icon="caret"
                        ml={0.5}
                        sHeight={0.75}
                        sWidth={0.75}
                        textSecondary
                    />
                )}
            </OptionSelected>
            <OptionList anchor={anchor} isVisible={optionsVisible} type={type}>
                {options.map(({ label, value }) => (
                    <OptionItem
                        isActive={!asActionList && selected?.value === value}
                        key={value}
                        onClick={() => handleOptionClick({ label, value })}
                    >
                        <Text small>{label}</Text>
                    </OptionItem>
                ))}
            </OptionList>
        </SelectWrapper>
    );
};

Select.defaultProps = { ...optionListDefaultProps };
