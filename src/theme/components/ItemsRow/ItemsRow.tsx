import { GeneratedPropsTypes } from '../../Types';
import { generateProps, mq } from 'styled-gen';
import React from 'react';
import styled, { css } from 'styled-components';

type ItemsRowProps = {
    children?: any;
    distribute?: boolean | 'xs' | 'sm' | 'md' | 'lg';
    scrollable?: boolean;
    spacing?: number;
};

const ItemsCol = styled.div<ItemsRowProps>`
    display: flex;
    padding: 0 ${({ spacing }) => (spacing || 0) / 2}px;
    width: ${({ distribute }) => (distribute ? '100%' : null)};

    ${({ distribute }) =>
        !distribute &&
        css`
            flex-shrink: 0;
        `}
`;

const ItemsRowWrapper = styled.div<ItemsRowProps>`
    display: flex;
    flex-direction: ${({ distribute }) =>
        distribute && distribute !== true ? 'column' : 'row'};
    justify-content: ${({ distribute }) =>
        distribute ? 'space-between' : 'flex-start'};
    margin: 0 -${({ spacing }) => (spacing || 0) / 2}px;

    ${({ distribute }) =>
        typeof distribute === 'string' &&
        css`
            ${mq.from(
                distribute,
                css`
                    flex-direction: row;
                `
            )}
        `}

    ${({ scrollable, spacing }) =>
        scrollable &&
        css`
            ${mq.upTo(
                'sm',
                css`
                    margin: 0 -${32}px;
                    overflow: auto;
                    padding: 0 ${32 - (spacing || 0)}px;
                `
            )}
        `}

    ${generateProps};
`;

export const ItemsRow = (props: ItemsRowProps & GeneratedPropsTypes) => {
    const { children, distribute, spacing = 16, ...forwardProps } = props;

    return (
        <ItemsRowWrapper
            distribute={distribute}
            {...forwardProps}
            spacing={spacing}
        >
            {React.Children.map(children, (child, index) => (
                <ItemsCol distribute={distribute} key={index} spacing={spacing}>
                    {React.cloneElement(child, { ...child.props, fluid: true })}
                </ItemsCol>
            ))}
        </ItemsRowWrapper>
    );
};
