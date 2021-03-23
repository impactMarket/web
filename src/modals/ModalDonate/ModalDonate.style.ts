import { colors } from '../../theme';
import { mq } from 'styled-gen';
import styled, { css } from 'styled-components';

export const ModalChipsWrapper = styled.div`
    margin-top: 24px;
    margin-left: -32px;
    margin-right: -32px;
    padding: 0 32px;
    overflow: auto;
`;

export const ModalCol = styled.div`
    width: 100%;

    &:last-of-type {
        margin-top: 2rem;
    }

    ${mq.tablet(css`
        &:first-of-type {
            width: 100%;
            padding-right: 24px;
        }

        &:last-of-type {
            margin-top: 0;
        }

        width: auto;
    `)}
`;

export const ModalCopyLink = styled.div`
    display: inline-block;
    cursor: pointer;
`;

export const ModalFooter = styled.div`
    padding: 2rem;
    background-color: ${colors.backgroundLight};
`;

export const ModalRow = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    overflow: hidden;

    ${mq.tablet(css`
        flex-direction: row;
    `)}
`;

export const ModalWrapper = styled.div`
    padding: 1rem 2rem 2rem;
`;
