import { colors } from '../../../theme';
import { mq } from 'styled-gen';
import styled, { css } from 'styled-components';

export const CommunityWrapper = styled.div<any>`
    display: flex;
    width: 100%;
    flex-direction: column;
    min-height: 10.5rem;

    & + & {
        margin-top: 32px;

        ${({ isLoading }) =>
            isLoading &&
            css`
                display: none;

                ${mq.tablet(css`
                    display: flex;
                `)}
            `};
    }

    ${mq.tablet(css`
        border: 1px solid ${colors.backgroundSecondary};
        border-radius: 16px;
        flex-direction: row;
        padding: 20px;
    `)}
`;
export const CommunityCover = styled.div<any>`
    ${({ image }: any) =>
        image &&
        css`
            background-image: url('${image}');
        `}

    background-color: ${colors.backgroundLight};
    background-position: center;
    background-repeat: no-repeat;
    background-size: cover;
    border-radius: 8px;
    flex-shrink: 0;
    overflow: hidden;
    padding-top: 310px;
    width: 100%;

    ${mq.tablet(css`
        padding-top: 122px;
        width: 133px;
    `)}
`;
export const CommunityContent = styled.div`
    display: flex;
    flex-direction: column;
    margin-top: 22px;
    width: 100%;

    ${mq.tablet(css`
        margin-top: 0;
        margin-left: 22px;
    `)}
`;

export const CommunityContentBottom = styled.div`
    display: flex;
    flex-direction: column;
    margin-top: auto;
    padding-top: 1.5rem;

    ${mq.tablet(css`
        flex-direction: row;
    `)}
`;

export const CommunityHeadingWrapper = styled.div``;
