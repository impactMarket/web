import { colors } from '../../theme';
import { mq } from 'styled-gen';
import styled, { css } from 'styled-components';

export const HeaderContent = styled.div`
    align-items: center;
    display: flex;
    justify-content: space-between;
`;

export const HeaderMenuWrapper = styled.div`
    display: none;

    ${mq.tablet(css`
        display: block;
    `)}
`;

export const HeaderWrapper = styled.div`
    background-color: ${colors.white};
    padding: 1.5rem 0;
    width: 100%;
`;
