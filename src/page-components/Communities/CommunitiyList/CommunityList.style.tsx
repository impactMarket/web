import { colors } from '../../../theme';
import { ease, mq, transitions } from 'styled-gen';
import { rgba } from 'polished';
import styled, { css } from 'styled-components';

const span = 1.375;

export const CommunityListChipSeparator = styled.div`
    border-left: 1px solid ${colors.brandSecondaryLight};
    margin-right: 1rem;
`;

export const CommunityListItem = styled.li`
    ${transitions(['box-shadow', 'z-index'], 250, ease.outSine)};

    background-color: ${colors.white};
    border-radius: 1.25rem;
    display: inline-block;
    overflow: hidden;
    padding: 1rem ${span / 2}rem;
    position: relative;
    width: 100%;

    ${mq.tablet(css`
        width: 33.33%;
    `)}

    ${mq.tabletLandscape(css`
        width: 20%;

        &:hover {
            box-shadow: 0 0 2rem ${rgba(colors.brandBlack, 0.16)};
            z-index: 1;
        }
    `)}
`;

export const CommunityListItemImage = styled.div<{ image?: string }>`
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

export const CommunityListLoading = styled.div`
    position: relative;
    height: 7rem;
    margin: 3rem 0;
`;

export const CommunityListWrapper = styled.ul`
    display: flex;
    flex-wrap: wrap;
    margin: -1rem -${span / 2}rem;
    min-width: 100%;
`;
