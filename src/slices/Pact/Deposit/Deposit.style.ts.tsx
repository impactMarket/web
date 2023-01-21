/* eslint-disable no-nested-ternary */
import { Alert, Box, Button } from '@impact-market/ui';
import { colors } from '../../../theme';
import { mq } from 'styled-gen';
import styled, { css } from 'styled-components';

export const FlexWrapperStyled = styled(Box)`
    display: flex;
    align-items: center;
    gap: 1rem;
    justify-content: space-between;
    width: 100%;
    flex-wrap: wrap;
`;

export const AlertStyled = styled(Alert)`
    p {
        margin-top: 0.2rem;
    }

    div > div > div {
        padding-bottom: 0;
    }
`;

export const LabelStyled = styled.div`
    cursor: pointer;
`;

export const AmountStyled = styled.div`
    p {
        text-align: right;
    }

    div div p {
        color: ${colors.g900};
    }
`;

export const EmailStyled = styled.div`
    display: flex;
    flex-direction: column-reverse;

    p {
        font-weight: 500;
        color: ${colors.g700};
        padding: 0 0 0.375rem 0;
    }
`;

export const PrivacyPolicyStyled = styled.div<{ checked: boolean }>`
    label {
        position: relative;
        display: flex;
        align-items: center;
    }

    input {
        position: absolute;
        opacity: 0;
        height: 0;
        width: 0;
    }

    span {
        position: absolute;
        height: 15px;
        width: 15px;
        background-color: #dfe7f8;
        border: 1px solid #2362fb;
        border-radius: 4px;
        cursor: pointer;

        :after {
            content: '';
            position: absolute;
            left: 4px;
            display: ${props => (props.checked ? 'block' : 'none')};
            width: 4px;
            height: 7px;
            border: solid #2362fb;
            border-width: 0 2px 2px 0;
            -webkit-transform: rotate(45deg);
            -ms-transform: rotate(45deg);
            transform: rotate(45deg);
        }
    }
`;

export const ButtonsStyled = styled.div<{ state: string }>`
    display: grid;
    grid-template-columns: ${props =>
        props.state === 'approve'
            ? '1fr 0.1fr 0.50fr'
            : props.state === 'deposit'
            ? '0.40fr 0.1fr 1fr'
            : '1fr 0.1fr 1fr'};
    align-items: center;

    button:disabled {
        background-color: #aec1ef;
        border: 1px solid #aec1ef;
        opacity: 1;
    }

    svg:nth-child(2) {
        margin: 0 auto;
    }

    ${mq.upTo(
        'sm',
        css`
            grid-template-columns: 1fr;
            gap: 1rem;

            svg:nth-child(2) {
                display: none;
            }
        `
    )}
`;

export const WithdrawLabelStyled = styled.div`
    cursor: pointer;
`;

export const WithdrawAmountStyled = styled.div`
    p {
        text-align: right;
    }

    div div p {
        color: ${colors.g900};
    }
`;

export const ButtonStyled = styled(Button)`
    :disabled {
        background-color: #aec1ef;
        border: 1px solid #aec1ef;
        opacity: 1;
    }
`;
