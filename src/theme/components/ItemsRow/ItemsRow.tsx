import { GeneratedPropsTypes } from '../../Types';
import { generateProps } from 'styled-gen';
import React from 'react';
import styled from 'styled-components';

type ItemsRowProps = {
    children?: any;
    distribute?: boolean;
    spacing?: number;
};

const ItemsCol = styled.div<ItemsRowProps>`
    display: flex;
    padding: 0 ${({ spacing }) => (spacing || 0) / 2}px;
    width: ${({ distribute }) => (distribute ? '100%' : null)};
`;

const ItemsRowWrapper = styled.div<ItemsRowProps>`
    display: flex;
    justify-content: ${({ distribute }) => (distribute ? 'space-between' : 'flex-start')};
    margin: 0 -${({ spacing }) => (spacing || 0) / 2}px;

    ${generateProps};
`;

export const ItemsRow = (props: ItemsRowProps & GeneratedPropsTypes) => {
    const { children, distribute, spacing = 16, ...forwardProps } = props;

    return (
        <ItemsRowWrapper distribute={distribute} {...forwardProps} spacing={spacing}>
            {React.Children.map(children, (child, index) => (
                <ItemsCol distribute={distribute} key={index} spacing={spacing}>
                    {React.cloneElement(child, { ...child.props, fluid: true })}
                </ItemsCol>
            ))}
        </ItemsRowWrapper>
    );
};
