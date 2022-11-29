import { colors } from '../../theme';
import { ease, mq, transitions } from 'styled-gen';
import { position, size } from 'polished';
import styled, { css } from 'styled-components';

export const TopbarStyle = styled.div`
    background-color: ${colors.g700};
    padding: 1rem 0;
`;

export const TopbarContent = styled.div`
    align-items: center;
    display: flex;
    gap: 3rem;
    justify-content: center;
    margin: auto;
    max-width: 84rem;
    padding: 0 2rem;

    ${mq.upTo(
        'tablet',
        css`
            flex-wrap: wrap;
            gap: 1rem;
        `
    )}
`;

export const TopbarLeft = styled.div`
    color: ${colors.white};
    display: flex;
    flex-wrap: wrap;
    gap: 1vw;
    justify-content: center;
`;

export const TopbarColumn = styled.div`
    align-items: center;
    display: flex;
    flex-wrap: wrap;
    gap: 0.3rem;
    justify-content: center;
`;

export const TopbarWallet = styled.div`
    align-items: center;
    display: flex;
    height: 1.5rem;
`;

export const HeaderLanguage = styled.div`
    align-items: center;
    display: flex;
    height: 1.5rem;

    ${mq.upTo(
        'tablet',
        css`
            display: none;
        `
    )}
`;

export const HeaderBarContent = styled.div`
    align-items: center;
    display: flex;
    justify-content: space-between;
    max-width: 84rem;
    margin: auto;
    padding: 0 2rem;
`;

export const HeaderContent = styled.div`
    background-color: ${colors.white};
    position: relative;
    z-index: 2;
`;

export const HeaderMainBar = styled.div`
    background-color: ${colors.white};
    padding: 1.5rem 0;
`;

export const HeaderMainBarLeftCol = styled.div`
    line-height: 1;
`;

export const HeaderMainBarMenu = styled.div`
    display: none;

    ${mq.tablet(css`
        display: flex;

        & > a + a {
            margin-left: 2rem;
        }
    `)}
`;

export const HeaderMainBarMobileMenuButton = styled.a`
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

export const HeaderMainBarRightCol = styled.div``;

export const HeaderMobileContent = styled.div<{ isActive?: boolean }>`
    ${position('fixed', 0)};
    ${transitions(['transform'], 500, ease.inOutCirc)};

    background-color: ${colors.white};
    display: flex;
    flex-direction: column;
    overflow: auto;
    padding: 11rem 2rem 2rem;
    transform: ${({ isActive }) => `translateX(${isActive ? 0 : '100%'})`};
    z-index: 1;

    ${mq.tablet(css`
        display: none;
    `)}
`;

export const HeaderWrapper = styled.div`
    ${position('fixed', 0, 0, null, 0)};

    z-index: 99;
`;
