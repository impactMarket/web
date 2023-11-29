import { colors } from '../../variables/colors';
import { createGlobalStyle, css } from 'styled-components';
import { fonts } from '../../variables/fonts';
import { mq } from 'styled-gen';
import { rgba } from 'polished';
import reset from 'styled-reset';

export const GlobalStyle = createGlobalStyle`
  ${reset};

    html,
    body {
        min-height: 100%;
        scroll-behavior: smooth;

        -moz-osx-font-smoothing: grayscale;
        -webkit-font-smoothing: antialiased;
    }

    body {
        box-sizing: border-box;
        color: ${colors.textPrimary};
        font-family: ${fonts.families.inter};
        font-size: 1rem;
        line-height: 1.5;
        overflow-x: hidden;
        overflow-y: scroll;

        -webkit-overflow-scrolling: touch;

        * {
            box-sizing: border-box;
        }

        &.menu-open {
            ${mq.upTo(
                'sm',
                css`
                    overflow-y: hidden;
                `
            )};
        }

        &.with-modal {
            overflow-y: hidden;
        }

    }

    a {
        display: inline-block;
        outline: 0;
        text-decoration: none;
        cursor: default;

        &:active,
        &:focus,
        &:hover {
            outline: 0;
            text-decoration: none;
        }

        &:not(:disabled) {
            cursor: pointer;
        }

        &.is-disabled {
            cursor: default !important;
        }
    }

    b,
    strong {
        font-weight: ${fonts.weights.bold};
    }

    h1,
    h2,
    h3,
    h4,
    h5,
    h6 {
        font-family: ${fonts.families.manrope};
    }

    /* Toaster style */
    .Toastify__progress-bar {
        &--default {
            background-color: ${colors.backgroundShadow};
            background-image: unset;
        }

        &--error{
            background-color: ${colors.error};
        }

        &--info{
            background-color: ${colors.brandPrimary};
        }

        &--success {
            background-color: ${colors.success};
        }

        &--warning{
            background-color: ${colors.warning};
        }
    }

    .Toastify__toast {
        border-radius: 0.5rem;
        box-shadow: 0 0 1.5rem ${rgba(colors.textPrimary, 0.08)};
    }

    /* Recaptcha */
    .grecaptcha-badge {
        display:none !important;
    }

    /* React modal */
    .ReactModal__Overlay--after-open {
        z-index: 99999999999;
    }
`;
