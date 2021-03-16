import { colors, fonts } from '../../theme';
import { ease, mq, transitions } from 'styled-gen';
import styled, { css } from 'styled-components';

type HeaderLinkProps = {
    isActive?: boolean;
};

export const HeaderContent = styled.div`
    align-items: center;
    display: flex;
    justify-content: space-between;
`;

export const HeaderLink = styled.a<HeaderLinkProps>`
    ${transitions(['text-shadow'], 250, ease.outSine)};

    color: ${({ isActive }) => (isActive ? colors.primary : colors.body)};
    cursor: ${({ isActive }) => (isActive ? 'default !important' : 'pointer')};
    display: block;
    font-size: 1rem;
    font-weight: ${fonts.weights.medium};

    ${({ isActive }) =>
        !isActive &&
        css`
            &:hover {
                text-shadow: 0 0.5rem 1rem rgba(0, 0, 0, 0.24);
            }
        `}
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
`;
