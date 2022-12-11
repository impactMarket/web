import { colors } from '../../theme';
import { ease, mq, transitions } from 'styled-gen';
import { position, size } from 'polished';
import styled, { css } from 'styled-components';

export const HeaderWrapper = styled.div<{ direction?: string; topbarHeight?: number }>`
    ${position('sticky', 0, 0, null, 0)};

    width: 100%;
    z-index: 99;

    transition-property: all;
    transition-timing-function: cubic-bezier(0.4, 0, 0.2, 1);
    transition-duration: 500ms;

    ${props =>
        mq.upTo(
            'tablet',
            css`
                ${position('sticky', props.direction === 'up' ? 0 : -props.topbarHeight, 0, null, 0)};
            `
        )}
`;

export const HeaderContent = styled.div`
    background-color: ${colors.white};
    position: relative;
    z-index: 2;
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

export const HeaderMainBar = styled.div`
    background-color: ${colors.white};
    padding: 1.5rem 0;
    position: relative;

    ${mq.upTo(
        'tablet',
        css`
            padding: 0;
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

    ${mq.upTo(
        'tablet',
        css`
            padding: 1rem 2rem;
        `
    )}
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

export const MobileContent = styled.div``;

export const HeaderMobileContent = styled.div<{
    direction?: string;
    isActive?: boolean;
    headerHeight?: number;
    topbarHeight: number;
}>`
    ${transitions(['transform'], 500, ease.inOutCirc)};

    transition-property: all;
    transition-timing-function: cubic-bezier(0.4, 0, 0.2, 1);
    transition-duration: 500ms;

    ${position('fixed', 0)};

    background-color: ${colors.white};
    border-top: 1px solid #e7e7e7;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    overflow: auto;
    padding: 1rem 2rem;
    top: ${props =>
        props.direction === 'up' ? `${props.topbarHeight + props.headerHeight}px` : `${props.headerHeight}px`};
    transform: ${({ isActive }) => `translateX(${isActive ? 0 : '100%'})`};
    width: 100%;
    z-index: 1;

    ${mq.tablet(css`
        display: none;
    `)}
`;

export const MobileMenuButtons = styled.div`
    display: flex;
    flex-direction: column;
    gap: 1rem;
    margin-bottom: 2rem;
    margin-top: 1rem;
`;
