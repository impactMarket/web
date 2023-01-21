import { colors, fonts } from '../../theme';
import { mq } from 'styled-gen';
import { rgba } from 'polished';
import React from 'react';
import styled, { css } from 'styled-components';

type BoldInputProps = {
    asStaticValue?: boolean;
    children: any;
    inputPrefix?: string;
    label: any;
} & any;

const Content = styled.div`
    padding: 0 1rem 1rem;
    display: flex;
    width: 100%;
    align-items: center;
    flex-direction: column;

    ${mq.tablet(css`
        flex-direction: row;
    `)}
`;

const Input = styled.input`
    border: 0;
    font-family: inherit;
    font-size: 1.5rem;
    font-weight: inherit;
    font-weight: inherit;
    outline: 0;
    width: 100%;
    color: ${colors.g800};

    -moz-appearance: textfield;

    ::-webkit-inner-spin-button,
    ::-webkit-outer-spin-button {
        appearance: none !important;
    }

    ::placeholder,
    ::-webkit-input-placeholder {
        color: ${rgba(colors.textPrimary, 0.31)};
    }
`;

const InputWrapper = styled.div`
    align-items: center;
    display: flex;
    font-family: ${fonts.families.inter};
    font-size: 20px;
    font-weight: ${fonts.weights.semibold};
    padding-bottom: 1rem;
    width: 100%;

    ${mq.tablet(css`
        padding-bottom: unset;
        padding-right: 1rem;
        font-weight: ${fonts.weights.bold};
        font-size: 27px;
    `)}
`;

const Label = styled.div`
    padding: 1rem;
    width: 100%;
`;

const Wrapper = styled.div`
    border: 1px solid ${colors.backgroundSecondary};
    border-radius: 0.5rem;
    width: 100%;
`;

export const BoldInput = (props: BoldInputProps) => {
    const { asStaticValue, children, inputPrefix, label, ...inputProps } = props as any;

    return (
        <Wrapper>
            <Label>{label}</Label>
            <Content>
                <InputWrapper>
                    {asStaticValue ? inputProps?.value || 0 : <Input type="number" {...(inputProps as any)} />}
                    {inputPrefix && <>{inputPrefix}&nbsp;</>}
                </InputWrapper>
                {children}
            </Content>
        </Wrapper>
    );
};
