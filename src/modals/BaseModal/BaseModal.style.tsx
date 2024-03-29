import { colors } from '../../theme';
import { ease, mq, transitions } from 'styled-gen';
import { position, size } from 'polished';
import styled, { css } from 'styled-components';

type ModalProps = {
    isActive?: boolean;
    size?: any;
};

const ModalBackdrop = styled.div<ModalProps>`
    ${position('fixed', 0)};
    ${size('100%')};
    ${transitions(['opacity', 'visibility'], 250, ease.inOutSine)};

    background-color: ${colors.white};
    opacity: 0;
    pointer-events: none;
    visibility: hidden;
    z-index: 0;

    ${({ isActive }) =>
        isActive &&
        css`
            opacity: 1;
            visibility: visible;
        `}

    ${mq.tablet(
        css`
            background-color: rgba(23, 32, 50, 0.2);
        `
    )}
`;

const ModalContent = styled.div<ModalProps>`
    ${size('100%')}
    ${transitions(
        ['height', 'opacity', 'transform', 'visibility'],
        500,
        ease.inOutCubic
    )};

    background-color: transparent;
    margin: auto 0;
    opacity: 0;
    overflow-y: auto;
    position: relative;
    transform: translate3d(0, 48px, 0);
    visibility: hidden;
    z-index: 1;

    ${({ isActive }) =>
        isActive &&
        css`
            opacity: 1;
            transform: none;
            visibility: visible;
        `}

    ${mq.tablet(
        css`
            ${size('unset')};

            background-color: ${colors.white};
            border-radius: 12px;
            overflow: hidden;
            width: ${({ size }: any) => size || 0}px;
        `
    )}
`;

const ModalHeading = styled.div`
    align-items: center;
    display: flex;
    justify-content: space-between;
    padding: 1.5rem 1.5rem 0;
`;

const ModalInnerContent = styled.div``;

const ModalWrapper = styled.div`
    ${position('fixed', 0)};
    ${size('100%')};

    align-items: flex-start;
    justify-content: center;
    overflow-x: hidden;
    overflow-y: auto;
    z-index: 1000;

    -webkit-overflow-scrolling: touch;

    ${mq.tablet(css`
        display: flex;
        overflow-y: auto;
    `)}
`;

export {
    ModalBackdrop,
    ModalContent,
    ModalHeading,
    ModalInnerContent,
    ModalWrapper
};
