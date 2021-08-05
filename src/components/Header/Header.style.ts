import { colors } from '../../theme';
import { ease, mq, transitions } from 'styled-gen';
import { position, size } from 'polished';
import styled, { css } from 'styled-components';

export const HeaderContent = styled.div`
    align-items: center;
    background-color: ${colors.white};
    display: flex;
    justify-content: space-between;
    margin: auto;
    max-width: 1280px;
    padding: 1rem 0;
    width: 100%;
`;

export const HeaderLanguageWrapper = styled.div`
    margin-top: 1.25rem;
    width: 100%;

    ${mq.tablet(css`
        margin-top: 0;
        align-items: center;
        display: flex;
        border-left: 1px solid ${colors.borderDarker};
        margin-left: 1rem;
        padding-left: 1rem;
        width: unset;
    `)}
`;

export const HeaderMenuItem = styled.div`
    width: 50%;

    ${mq.tablet(css`
        width: auto;

        & + & {
            margin-left: 2rem;
        }
    `)}
`;

export const HeaderMenuWrapper = styled.div<{ isActive?: boolean }>`
    transform: ${({ isActive }) => `translateX(${isActive ? 0 : '100%'})`};

    ${mq.phone(css`
        ${position('fixed', 0)};
        ${transitions(['transform'], 500, ease.inOutCirc)};

        background-color: ${colors.white};
        display: flex;
        flex-direction: column;
        padding: 9rem 2rem 2rem;
        z-index: 1;
    `)};

    ${mq.tablet(css`
        display: flex;
        transform: translateX(0);
    `)}
`;

export const HeaderMobileMenuButton = styled.a`
    ${size('2.625rem')};

    align-items: center;
    background-color: ${colors.backgroundSecondary};
    border-radius: 0.75rem;
    color: ${colors.brandPrimary};
    display: inline-flex;
    justify-content: center;
    z-index: 100;

    ${mq.tablet(css`
        display: none;
    `)}
`;

export const HeaderMobileMenuFooter = styled.div`
    display: block;
    margin-top: 4rem;

    ${mq.tablet(css`
        display: none;
    `)}
`;

export const HeaderWrapper = styled.div`
    ${position('fixed', 0, 0, null, 0)};

    background-color: ${colors.white};
    width: 100%;
    z-index: 10;
`;
