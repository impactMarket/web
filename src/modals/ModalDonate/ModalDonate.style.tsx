import { Alert, Box, Button, colors } from '@impact-market/ui';
import { mq } from 'styled-gen';
import styled, { css } from 'styled-components';

export const ModalWrapper = styled.div`
    padding: 1rem 1.5rem 1.5rem;
`;

export const ButtonsWrapper = styled(Box)`
    display: grid;
    grid-template-columns: repeat(2, 1fr);
    gap: 1rem;

    ${mq.phone(css`
        grid-template-columns: 1fr;
    `)}

    .button-content {
        padding: 1rem;
    }
`;

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

export const AmountStyled = styled.div`
    p {
        text-align: right;
    }

    div div p {
        color: ${colors.g900};
    }
`;

export const ButtonsStyled = styled.div<{ state: string }>`
    display: grid;
    grid-template-columns: ${(props) =>
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
            gap: 0.5rem;

            svg:nth-child(2) {
                transform: rotate(90deg);
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

export const OptionsStyled = styled(Box)`
    display: grid;
    grid-template-columns: repeat(2, 1fr);
    gap: 1rem;

    a {
        margin-top: 0 !important;
    }
`;

export const EmailStyled = styled(Box)`
    display: flex;
    flex-direction: column-reverse;

    p {
        font-weight: 500;
        color: ${colors.g700};
        padding: 0 0 0.375rem 0;
    }
`;

export const CancelButtonStyled = styled(Button)`
    background-color: ${colors.e50};
    color: ${colors.e700};
    border: none;

    &:hover {
        background-color: ${colors.e700} !important;
        color: ${colors.e50} !important;
        border: none !important;
    }
`;
