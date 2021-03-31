import { GeneratedPropsTypes } from '../../Types';
import { colors } from '../../variables/colors';
import { ease, generateProps, transitions } from 'styled-gen';
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

export const OptionList = styled.div<{ isVisible?: boolean }>`
    ${transitions(['opacity', 'transform', 'visibility'], 250, ease.inOutCubic)};

    background-color: ${colors.white};
    border-radius: 0.25rem;
    box-shadow: 0 0 1rem ${rgba(colors.textPrimary, 0.16)};
    display: flex;
    flex-direction: column;
    min-width: 100%;
    opacity: 0;
    overflow: hidden;
    position: absolute;
    transform: scale(0.5);
    visibility: hidden;
    z-index: 999;

    ${({ isVisible }) =>
        isVisible &&
        css`
            opacity: 1;
            transform: scale(1);
            visibility: visible;
        `}
`;

export const OptionSelected = styled.a`
    display: inline-flex;
    margin-left: auto;
    white-space: nowrap;
`;

export const SelectWrapper = styled.div<GeneratedPropsTypes>`
    display: flex;
    align-items: center;
    justify-content: center;
    position: relative;

    ${generateProps};
`;
