import { GeneratedPropsTypes } from '../../Types';
import { OptionListProps } from './Select';
import { colors } from '../../variables/colors';
import { ease, generateProps, mq, transitions } from 'styled-gen';
import { fonts } from '../../variables/fonts';
import { rgba } from 'polished';
import styled, { css } from 'styled-components';

export const OptionItem = styled.a<{ isActive?: boolean }>`
    padding: 0.75rem 0.75rem;
    white-space: nowrap;

    ${({ isActive }) =>
        isActive
            ? css`
                  background-color: ${colors.backgroundSecondary};
                  cursor: default !important;
                  font-weight: ${fonts.weights.medium};
              `
            : css`
                  &:hover {
                      background-color: ${colors.backgroundLight};
                  }
              `}
`;

export const OptionList = styled.div<{ isVisible?: boolean } & OptionListProps>`
    ${transitions(['opacity', 'transform', 'visibility'], 250, ease.inOutCubic)};

    background-color: ${colors.white};
    display: flex;
    flex-direction: column;
    min-width: 100%;
    opacity: 0;
    overflow: hidden;
    position: absolute;
    visibility: hidden;
    z-index: 999;

    ${({ anchor }) =>
        anchor === 'right' &&
        css`
            right: 0;
        `};

    ${({ anchor }) =>
        anchor === 'left' &&
        css`
            left: 0;
        `};

    ${({ isVisible, type }) =>
        type === 'grow' &&
        css`
            border-radius: 0.25rem;
            transform: scale(0.5);
            box-shadow: 0 0 1rem ${rgba(colors.textPrimary, 0.16)};

            ${
                isVisible &&
                css`
                    transform: scale(1);
                `
            }}
        `}

    ${({ isVisible, type }) =>
        type === 'slide' &&
        css`
            border-radius: 0.375rem;
            border: 1px solid ${colors.borderLight};
            padding: 0.5rem;
            top: calc(100% + 0.5rem);
            transform: translateY(1rem);
            width: 100%;

            ${mq.tablet(css`
                min-width: 8.25rem;
                width: unset;

                a {
                    border-radius: 0.25rem;
                }
            `)}

            ${
                isVisible &&
                css`
                    transform: translateY(0);
                `
            }}
        `}

    ${({ isVisible }) =>
        isVisible &&
        css`
            opacity: 1;
            visibility: visible;
        `}
`;

export const OptionSelected = styled.a`
    align-items: center;
    display: inline-flex;
    height: 100%;
    white-space: nowrap;
`;

export const SelectWrapper = styled.div<GeneratedPropsTypes>`
    align-items: center;
    display: flex;
    position: relative;

    ${generateProps};
`;
