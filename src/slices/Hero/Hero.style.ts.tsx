import { GeneratedPropsTypes } from '../../theme/Types';
import { Text } from '../../theme/components';
import { colors, fonts } from '../../theme';
import { generateProps, mq } from 'styled-gen';
import styled, { css } from 'styled-components';

export const Wrapper = styled.div<{
    backgroundColor: string;
    backgroundPosition: string;
    buttonSecondaryColor: string;
    textColor: boolean;
    textSize: boolean;
}>`
    align-items: center;
    display: flex;
    flex-direction: row;
    flex-wrap: wrap;
    padding: ${(props) =>
        props.backgroundPosition === 'bottom' ? '4rem 0 0 0' : '4rem 0'};
    width: 100%;

    ${mq.upTo(
        'md',
        css`
            font-size: 2.5rem;
            line-height: 3rem;
            padding: 0;
        `
    )}

    .text-wrapper {
        z-index: 1;
        padding: 0 3rem 0 0;
        display: flex;
        flex-direction: column;
        gap: 1.5rem;

        ${(props) =>
            mq.upTo(
                'md',
                css`
                    padding: ${props.backgroundPosition === 'right'
                        ? '2rem 2rem 2rem 0'
                        : '2rem 0 2rem'};
                `
            )}
    }

    .text {
        color: ${(props) => (props.textColor ? colors.white : colors.g500)};
        font-size: ${(props) => (props.textSize ? '1.125rem' : '1.25rem')};
        line-height: 1.75rem;

        p {
            ${mq.upTo(
                'sm',
                css`
                    font-size: 1.125rem;
                    line-height: 1.5rem;
                `
            )}
        }
    }

    span {
        color: ${colors.white};
        font-weight: ${fonts.weights.bold};
    }
`;

export const HeadingText = styled(Text)<{
    headingFont: boolean;
    headingFontSize: string;
    headingColor: boolean;
}>`
    color: ${(props) => props.headingColor && colors.white};
    letter-spacing: -0.02em;

    // FontSize
    ${(props) => {
        if (props.headingFontSize === 'small') {
            return css`
                font-size: 2.5rem;
                line-height: 3.75rem;

                ${mq.upTo(
                    'sm',
                    css`
                        font-size: 2rem;
                        line-height: 3rem;
                    `
                )}
            `;
        }

        if (props.headingFontSize === 'large') {
            return css`
                font-size: 3.903;
                line-height: 4.375rem;

                ${mq.upTo(
                    'desktop',
                    css`
                        font-size: 3rem;
                        line-height: 3.15rem;
                    `
                )}

                ${mq.phone(css`
                    font-size: 2rem;
                    line-height: 2.5rem;
                `)}
            `;
        }

        return css`
            font-size: 3.75rem;
            line-height: 4.5rem;

            ${mq.upTo(
                'sm',
                css`
                    font-size: 2rem;
                    line-height: 2.5rem;
                `
            )}
        `;
    }};

    // Font Family
    ${(props) => {
        // If Font is Bevan
        if (props.headingFont) {
            return css`
                font-family: ${fonts.families.bevan};
                font-weight: ${fonts.weights.regular};
                max-width: 38rem;

                ${mq.upTo(
                    'sm',
                    css`
                        max-width: 24rem;
                    `
                )}
            `;
        }

        return css`
            font-weight: ${fonts.weights.semibold};
        `;
    }};
`;

export const Img = styled.img<GeneratedPropsTypes>`
    ${generateProps};
`;

export const BackgroundImage = styled.img<{ backgroundPosition: string }>`
    max-height: 600px;
    object-fit: contain;
    object-position: right;
    width: 100%;
    height: 100%;

    ${mq.upTo(
        'md',
        css`
            object-position: center;
        `
    )};

    ${(props) => {
        if (props.backgroundPosition === 'right') {
            return css`
                position: absolute;
                right: 0;
                bottom: 0;
                top: 4rem;
                width: 50%;

                ${mq.upTo(
                    'md',
                    css`
                        position: unset;
                        width: 100%;
                        object-position: right;
                    `
                )};
            `;
        }
    }};
`;
