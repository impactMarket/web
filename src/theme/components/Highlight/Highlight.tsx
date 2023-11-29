import { GeneratedPropsTypes } from '../../Types';
import { colors } from '../..';
import { generateProps, mq } from 'styled-gen';
import styled, { css } from 'styled-components';

export const Highlight = styled.div<GeneratedPropsTypes>`
    background-color: ${colors.backgroundLight};
    border-radius: 0.5rem;
    border: 1px solid ${colors.backgroundSecondary};
    display: flex;
    padding: 1rem;
    width: 100%;
    flex-direction: column;

    ${mq.from(
        'md',
        css`
            padding: 1rem 1.375rem;
        `
    )}

    ${generateProps};
`;

export const HighlightRow = styled.div`
    align-items: center;
    display: flex;
    flex-direction: column;
    justify-content: center;
    width: 100%;

    & + & {
        margin-top: 0.625rem;
    }

    ${mq.from(
        'md',
        css`
            flex-direction: row;
            justify-content: space-between;
        `
    )}
`;
