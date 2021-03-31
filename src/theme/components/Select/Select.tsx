import { GeneratedPropsTypes } from '../../Types';
import { Icon } from '../Icon/Icon';
import { OptionItem, OptionList, OptionSelected, SelectWrapper } from './Select.style';
import { Text } from '../Typography/Typography';
import { useClickOutside } from '../../../hooks/useClickOutside';
import React, { useEffect, useRef, useState } from 'react';

type OptionType = {
    label?: string;
    value: any;
};

type SelectProps = {
    name?: string;
    onChange: Function;
    options: OptionType[];
    placeholder?: string;
    renderSelected?: Function;
    initialSelected?: any;
} & GeneratedPropsTypes;

const getSelectedLabel = (selected: OptionType | undefined, placeholder: string | undefined) => {
    if (!selected?.value) {
        return placeholder || '';
    }

    if (selected?.label) {
        return selected?.label;
    }

    return typeof selected?.value === 'string' || typeof selected?.value === 'number' ? selected?.value : '';
};

const getSelectedOption = (initialSelected: any, options: OptionType[]) => {
    if (!initialSelected) {
        return;
    }

    return options.find(({ value }) => value === initialSelected);
};

export const Select = (props: SelectProps) => {
    const { initialSelected, name, onChange, options, placeholder, renderSelected, ...forwardProps } = props;
    const [selected, setSelected] = useState<OptionType | undefined>(getSelectedOption(initialSelected, options));
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
                    renderSelected(getSelectedLabel(selected, placeholder), !!selected?.value)
                ) : (
                    <Text small>{getSelectedLabel(selected, placeholder)}</Text>
                )}
                <Icon icon="caret" ml={0.5} sHeight="auto" sWidth={0.75} />
            </OptionSelected>
            <OptionList isVisible={optionsVisible}>
                {options.map(({ label, value }) => (
                    <OptionItem
                        isActive={selected?.value === value}
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
