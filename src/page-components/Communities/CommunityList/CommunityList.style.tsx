import { colors } from '../../../theme';
import { ease, mq, transitions } from 'styled-gen';
import { rgba, size } from 'polished';
import styled, { css } from 'styled-components';

const span = 1.375;

export const CommunityEmptyListMessageWrapper = styled.div`
    ${size('100%')};

    align-items: center;
    background-color: ${colors.white};
    display: flex;
    justify-content: center;
    z-index: 1;
    padding: 6rem 0;
`;

type CommunityListItemProps = {
    withLink?: boolean;
};

export const CommunityListItem = styled.li<CommunityListItemProps>`
    ${transitions(['box-shadow', 'z-index'], 250, ease.outSine)};

    background-color: ${colors.white};
    border-radius: 1.25rem;
    display: inline-block;
    overflow: hidden;
    padding: 1rem 0;
    position: relative;
    width: 100%;

    ${mq.tablet(css`
        padding: 1rem ${span / 2}rem;
        width: 33.33%;
    `)}

    ${mq.tabletLandscape(css`
        width: 20%;

        ${({ withLink }: any) =>
            withLink &&
            css`
                &:hover {
                    box-shadow: 0 0 2rem ${rgba(colors.brandBlack, 0.16)};
                    z-index: 1;
                }
            `}
    `)}
`;

export const CommunityListItemImage = styled.div<{ image?: string }>`
    background-color: ${colors.backgroundSecondary};
    background-image: ${({ image }) => `url("${image}")`};
    background-position: center;
    background-repeat: no-repeat;
    background-size: cover;
    border-radius: 0.75rem;
    overflow: hidden;
    padding-top: 100%;
    width: 100%;
`;

export const CommunityListItemLink = styled.a`
    display: flex;
    flex-direction: column;
`;

export const CommunityListWrapper = styled.ul`
    display: flex;
    flex-wrap: wrap;
    margin: -1rem 0;
    min-width: 100%;
    position: relative;

    ${mq.tablet(css`
        margin: -1rem -${span / 2}rem;
    `)}
`;
