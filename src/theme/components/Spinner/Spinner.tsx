import { SpinnerContainer, SpinnerElement, SpinnerWrapper } from './Spinner.style';
import { colors } from '../../variables/colors';
import PropTypes from 'prop-types';
import React from 'react';

const animationAttributes = {
    attributeName: 'transform',
    dur: '0.75s',
    from: '0 18 18',
    repeatCount: 'indefinite',
    to: '360 18 18',
    type: 'rotate'
};

type SpinnerProps = {
    backgroundColor?: string;
    isLoading?: boolean;
    spinnerColor?: string;
};

export const Spinner = ({ backgroundColor = colors.n01, spinnerColor = colors.p06, isLoading }: SpinnerProps) => (
    <SpinnerWrapper>
        <SpinnerContainer backgroundColor={backgroundColor} isLoading={isLoading}>
            <SpinnerElement fill={spinnerColor} viewBox="-1 -1 40 40">
                {isLoading && (
                    <>
                        <defs>
                            <linearGradient
                                id={`${spinnerColor}${backgroundColor}`}
                                x1="8.042%"
                                x2="65.682%"
                                y1="0%"
                                y2="23.865%"
                            >
                                <stop offset="0%" stopColor={spinnerColor} stopOpacity="0" />
                                <stop offset="83.146%" stopColor={spinnerColor} stopOpacity=".631" />
                                <stop offset="100%" stopColor={spinnerColor} />
                            </linearGradient>
                        </defs>
                        <g fill="none" fillRule="evenodd" transform="translate(1 1)">
                            <path
                                d="M36 18c0-9.94-8.06-18-18-18"
                                stroke={`url(#${spinnerColor}${backgroundColor})`}
                                strokeWidth="3"
                            >
                                <animateTransform {...animationAttributes} />
                            </path>
                            <circle cx="36" cy="18" fill={spinnerColor} r="1">
                                <animateTransform {...animationAttributes} />
                            </circle>
                        </g>
                    </>
                )}
            </SpinnerElement>
        </SpinnerContainer>
    </SpinnerWrapper>
);

Spinner.propTypes = {
    backgroundColor: PropTypes.string,
    isLoading: PropTypes.bool,
    spinnerColor: PropTypes.string
};
