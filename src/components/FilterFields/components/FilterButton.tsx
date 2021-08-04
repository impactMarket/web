import { BoolProps, GeneratedPropsTypes } from '../../../theme/Types';
import { colors } from '../../../theme';
import { ease, generateProps, mq, transitions, variations } from 'styled-gen';
import { position, rgba } from 'polished';
import { useClickOutside } from '../../../hooks/useClickOutside';
import React, { MouseEvent, useEffect, useRef, useState } from 'react';
import styled, { css } from 'styled-components';

const flyoutSizeVariations = {
    default: mq.tablet(css`
        width: 25rem;
    `),

    small: mq.tablet(css`
        width: 18rem;
    `)
};

const FilterButtonElement = styled.button<any>`
    background-color: transparent;
    border-color: ${colors.borderLight};
    border-radius: ${2.25 / 2}rem;
    border-style: solid;
    border-width: 1px;
    cursor: pointer;
    height: 2.25rem;
    outline: 0;
    padding: 0 0.75rem;
    width: 100%;

    ${({ isFlyoutActive }: { isFlyoutActive?: boolean }) =>
        isFlyoutActive &&
        css`
            background-color: ${colors.backgroundLight};
        `}
`;

type FilterButtonFlyoutProps = GeneratedPropsTypes &
    BoolProps<typeof flyoutSizeVariations> & {
        isActive: boolean;
    };

const FilterButtonFlyout = styled.div<FilterButtonFlyoutProps>`
    ${position('fixed', 'unset', 0, 0, 0)};
    ${transitions(['transform', 'opacity', 'visibility'], 500, ease.outCubic)};

    background-color: ${colors.white};
    box-shadow: 0 0.25rem 3.25rem ${rgba(colors.brandBlack, 0.24)};
    opacity: 0;
    transform: translateY(100%);
    visibility: hidden;
    z-index: 5;

    ${({ isActive }) =>
        isActive &&
        css`
            opacity: 1;
            transform: translateY(0);
            visibility: visible;
        `}

    ${mq.tablet(css`
        ${position('absolute', '100%', 'unset', 'unset', 0)};

        border-radius: 0.75rem;
        transform: translateY(2rem);

        ${({ isActive }: { isActive?: boolean }) =>
            isActive &&
            css`
                opacity: 1;
                transform: translateY(0.5rem);
                visibility: visible;
            `}
    `)}

    ${variations(flyoutSizeVariations)};
    ${generateProps};
`;

const FilterButtonWrapper = styled.div<GeneratedPropsTypes>`
    display: inline-block;
    position: relative;
    width: 100%;

    ${mq.tablet(css`
        width: unset;
    `)}

    ${generateProps};
`;

type FilterButtonProps = GeneratedPropsTypes & {
    children?: any;
    label?: any;
    flyoutProps?: any;
    isActive?: boolean;
    onClick?: Function;
    onFlyoutActive?: Function;
};

export const FilterButton = (props: FilterButtonProps) => {
    const { children, label, flyoutProps, isActive, onClick, onFlyoutActive, ...forwardProps } = props;
    const [flyoutActive, setFlyoutActive] = useState(false);
    const ref = useRef();

    useEffect(() => {
        if (typeof onFlyoutActive === 'function') {
            onFlyoutActive(flyoutActive);
        }
    }, [flyoutActive]);

    const handleButtonClick = (event: MouseEvent<HTMLButtonElement>) => {
        event.preventDefault();
        setFlyoutActive(!flyoutActive);

        if (typeof onClick === 'function') {
            onClick();
        }
    };

    const handleClickOutside = () => setFlyoutActive(false);

    useClickOutside(ref?.current, handleClickOutside);

    return (
        <FilterButtonWrapper {...forwardProps} ref={ref}>
            <FilterButtonElement isActive={isActive} isFlyoutActive={flyoutActive} onClick={handleButtonClick}>
                {label}
            </FilterButtonElement>
            {children && (
                <FilterButtonFlyout isActive={flyoutActive} {...flyoutProps}>
                    {children}
                </FilterButtonFlyout>
            )}
        </FilterButtonWrapper>
    );
};
