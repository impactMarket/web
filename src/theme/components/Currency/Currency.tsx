import { GeneratedPropsTypes } from '../../Types';
import { generateProps } from 'styled-gen';
import React from 'react';
import styled from 'styled-components';

const CurrencyWrapper = styled.div`
    display: flex;

    ${generateProps}
`;

type CurrencyProps = {
    currency: 'btc' | 'celo' | 'eth';
};

const SVG = styled.svg.attrs({
    xmlns: 'http://www.w3.org/2000/svg'
})``;

export const Currency = (props: CurrencyProps & GeneratedPropsTypes) => {
    const { currency, ...forwardProps } = props;

    return (
        <CurrencyWrapper {...forwardProps}>
            {currency === 'btc' && (
                <SVG height="28" width="27">
                    <path
                        d="M13.5 27.197c7.456 0 13.5-6.044 13.5-13.5S20.956.197 13.5.197 0 6.241 0 13.697s6.044 13.5 13.5 13.5z"
                        fill="#F7931A"
                    />
                    <path
                        d="M19.566 12.026c.265-1.768-1.082-2.719-2.924-3.354l.598-2.396-1.458-.363-.582 2.333c-.383-.096-.777-.185-1.169-.275l.586-2.348-1.458-.363-.597 2.395c-.317-.073-.63-.144-.931-.22l.001-.007-2.011-.502-.388 1.557s1.082.249 1.06.264c.59.147.696.538.679.849l-.68 2.73c.04.01.092.024.151.047l-.154-.038-.953 3.824c-.073.179-.256.448-.67.346.016.021-1.06-.264-1.06-.264l-.723 1.669 1.898.473c.353.089.699.182 1.039.268l-.603 2.424 1.457.363.597-2.397c.398.107.785.207 1.163.302l-.596 2.386 1.458.363.603-2.419c2.488.471 4.358.281 5.145-1.968.634-1.81-.031-2.856-1.34-3.537.953-.22 1.67-.846 1.862-2.142zM16.233 16.7c-.45 1.812-3.5.832-4.489.586l.802-3.21c.989.247 4.159.736 3.687 2.624zM16.685 12c-.411 1.648-2.95.81-3.772.605l.726-2.91c.822.204 3.474.586 3.046 2.305z"
                        fill="#fff"
                    />
                </SVG>
            )}

            {currency === 'celo' && (
                <SVG height="28" width="27">
                    <g clipPath="url(#currencyclip0)">
                        <path
                            d="M13.5 27.197c7.456 0 13.5-6.044 13.5-13.5S20.956.197 13.5.197 0 6.241 0 13.697s6.044 13.5 13.5 13.5z"
                            fill="#F2F3F6"
                        />
                        <g clipPath="url(#currencyclip1)">
                            <path
                                d="M11.546 21.024a5.373 5.373 0 100-10.746 5.373 5.373 0 100 10.746zm0 1.954a7.327 7.327 0 110-14.655 7.327 7.327 0 010 14.655z"
                                fill="#FBCC5C"
                            />
                            <path
                                d="M15.454 17.116a5.373 5.373 0 100-10.746 5.373 5.373 0 100 10.746zm0 1.954a7.327 7.327 0 110-14.655 7.327 7.327 0 010 14.655z"
                                fill="#35D07F"
                            />
                            <path
                                d="M15.697 19.07a5.348 5.348 0 001.064-2.112 5.376 5.376 0 002.113-1.065 7.273 7.273 0 01-.57 2.609 7.292 7.292 0 01-2.607.568zm-5.458-8.634A5.377 5.377 0 008.127 11.5c.027-.897.22-1.78.57-2.607a7.347 7.347 0 012.607-.57 5.348 5.348 0 00-1.065 2.112z"
                                fill="#5EA33B"
                            />
                        </g>
                    </g>
                    <defs>
                        <clipPath id="currencyclip0">
                            <path d="M0 0h27v27H0z" fill="#fff" transform="translate(0 .197)" />
                        </clipPath>
                        <clipPath id="currencyclip1">
                            <path d="M0 0h18.563v18.563H0z" fill="#fff" transform="translate(4.219 4.416)" />
                        </clipPath>
                    </defs>
                </SVG>
            )}

            {currency === 'eth' && (
                <SVG height="28" width="27">
                    <path
                        d="M13.5 27.197c7.456 0 13.5-6.044 13.5-13.5S20.956.197 13.5.197 0 6.241 0 13.697s6.044 13.5 13.5 13.5z"
                        fill="#627EEA"
                    />
                    <path d="M13.92 3.572v7.484l6.325 2.827L13.92 3.572z" fill="#fff" fillOpacity=".602" />
                    <path d="M13.92 3.572l-6.326 10.31 6.326-2.826V3.572z" fill="#fff" />
                    <path d="M13.92 18.732v5.086l6.33-8.758-6.33 3.672z" fill="#fff" fillOpacity=".602" />
                    <path d="M13.92 23.818V18.73l-6.326-3.67 6.326 8.757z" fill="#fff" />
                    <path d="M13.92 17.556l6.325-3.673-6.325-2.825v6.498z" fill="#fff" fillOpacity=".2" />
                    <path d="M7.594 13.883l6.326 3.673v-6.498l-6.326 2.825z" fill="#fff" fillOpacity=".602" />
                </SVG>
            )}
        </CurrencyWrapper>
    );
};
