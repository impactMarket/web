import { Icon } from '../Icon/Icon';
import { colors } from '../../variables/colors';
import { generateProps, mq } from 'styled-gen';
import { rgba, size } from 'polished';
import React from 'react';
import styled, { css } from 'styled-components';

const ButtonWrapper = styled.button`
    ${size('2em')};

    align-items: center;
    background-color: ${colors.white};
    border-radius: 0.125rem;
    border: 0;
    color: ${colors.textSecondary};
    display: inline-flex;
    justify-content: center;
    outline: 0;

    &:disabled {
        color: ${rgba(colors.textSecondary, 0.5)};
    }

    ${mq.tabletLandscape(css`
        &:not(:disabled) {
            cursor: pointer;

            &:hover {
                background-color: ${colors.backgroundLight};
            }
        }
    `)}

    svg { 
        height: 0.75rem;
    }

    & + & {
        margin-left: 0.5rem;
    }

    ${generateProps}
`;

export const IconButton: React.FC<any> = props => {
    const { icon, ...forwardProps } = props;

    return (
        <ButtonWrapper {...forwardProps}>
            <Icon icon={icon} />
        </ButtonWrapper>
    );
};
