import { GeneratedPropsTypes } from '../../Types';
import { colors } from '../..';
import { generateProps, mq } from 'styled-gen';
import styled, { css } from 'styled-components';

export const Highlight = styled.div<GeneratedPropsTypes>`
    align-items: center;
    background-color: ${colors.backgroundLight};
    border-radius: 0.5rem;
    border: 1px solid ${colors.backgroundSecondary};
    display: flex;
    flex-direction: column;
    justify-content: center;
    padding: 1rem;
    width: 100%;

    ${mq.tablet(css`
        justify-content: space-between;
        flex-direction: row;
        padding: 1rem 1.375rem;
    `)}

    ${generateProps};
`;
