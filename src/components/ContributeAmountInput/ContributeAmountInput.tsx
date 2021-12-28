import { Button, Currency, Div, Text } from '../../theme/components';
import { GeneratedPropsTypes } from '../../theme/Types';
import { String } from '..';
import { colors } from '../../theme';
import { currencyValue } from '../../helpers/currencyValues';
import { generateProps } from 'styled-gen';
import { useBalance } from '@impact-market/utils';
import { useTranslation } from '../TranslationProvider/TranslationProvider';
import React, { useCallback, useEffect, useRef, useState } from 'react';
import styled from 'styled-components';

const Input = styled.input.attrs({
    type: 'number'
})`
    font-size: 28px;
    width: 100%;
    border: 0;
    outline: 0;
    -moz-appearance: textfield;

    ::-webkit-inner-spin-button,
    ::-webkit-outer-spin-button {
        appearance: none !important;
    }

    ::placeholder {
        opacity: 0.4;
    }
`;

const Row = styled.div`
    align-items: center;
    display: flex;
    justify-content: space-between;

    & + & {
        margin-top: 1rem;
    }
`;

const Wrapper = styled.div`
    border-radius: 0.5rem;
    border: 1px solid ${colors.backgroundSecondary};
    padding: 0.5rem;

    ${generateProps};
`;

type ContributeAmountInputProps = {
    onChange: Function;
} & GeneratedPropsTypes;

export const ContributeAmountInput = (props: ContributeAmountInputProps) => {
    const { onChange, ...forwardProps } = props;
    const [value, setValue] = useState<any>('');
    const inputRef = useRef<HTMLInputElement>();
    const { balance } = useBalance();
    const { t } = useTranslation();

    const handleMaxSet = useCallback(() => {
        setValue(balance?.cusd);
    }, [balance]);

    useEffect(() => {
        setTimeout(() => {
            inputRef?.current?.focus();
        }, 500);
    }, []);

    useEffect(() => {
        onChange(value, balance?.cusd);
    }, [value, balance]);

    return (
        <Wrapper {...forwardProps}>
            <Row>
                <Div sAlignItems="center" sMaxWidth="50%">
                    <Currency currency="cUSD" />
                    <Text ml={0.5} small>
                        cUSD (<String id="includingNetworkFees" />)
                    </Text>
                </Div>
                <Text small>
                    <String id="balance" />: {currencyValue(balance?.cusd, { isToken: true, symbol: 'cUSD' })}
                </Text>
            </Row>
            <Row>
                <Input
                    onChange={event => setValue(event?.target?.value)}
                    placeholder={t('amount')}
                    ref={inputRef}
                    value={value || ''}
                />
                <Button onClick={handleMaxSet} secondaryLight smallest>
                    <Text bold small uppercase>
                        <String id="max" />
                    </Text>
                </Button>
            </Row>
        </Wrapper>
    );
};
