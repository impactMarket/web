import { Currency, Div, InfoTooltip, Spinner, Text } from '../../theme/components';
import { GeneratedPropsTypes } from '../../theme/Types';
import { String } from '..';
import { colors } from '../../theme';
import { currencyValue } from '../../helpers/currencyValue';
import { generateProps } from 'styled-gen';
import { useCUSDBalance } from '@impact-market/utils';
import { useTranslation } from '../TranslationProvider/TranslationProvider';
import React, { useEffect, useRef, useState } from 'react';
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
    isLoading?: boolean;
} & GeneratedPropsTypes;

export const ContributeAmountInput = (props: ContributeAmountInputProps) => {
    const { isLoading, onChange, ...forwardProps } = props;
    const [value, setValue] = useState<any>('');
    const [error, setError] = useState<any>('');
    const inputRef = useRef<HTMLInputElement>();
    const { balance: balanceCUSD } = useCUSDBalance();
    const { t } = useTranslation();

    // const handleMaxSet = useCallback(() => {
    //     setValue(balance?.cusd);
    // }, [balance]);

    useEffect(() => {
        setTimeout(() => {
            inputRef?.current?.focus();
        }, 500);
    }, []);

    const checkErrors = () => {
        const cusdBalance = +currencyValue(balanceCUSD, { isToken: true });
        const amount = +value;

        if (amount > cusdBalance) {
            return setError('insufficientFunds');
        }

        if (amount === cusdBalance) {
            return setError('equalBalance');
        }

        if (!!error) {
            return setError('');
        }

        return;
    };

    useEffect(() => {
        checkErrors();

        onChange(value, balanceCUSD);
    }, [value, balanceCUSD]);

    return (
        <>
            <Wrapper {...forwardProps}>
                <Row>
                    <Div sAlignItems="center" sMaxWidth="50%">
                        <Currency currency="cUSD" />
                        <Text bold ml={0.5} small>
                            cUSD
                        </Text>
                    </Div>
                    {isLoading ? (
                        <Div relative>
                            <Div
                                sHeight={2.5}
                                sWidth={2.5}
                                style={{ position: 'absolute', right: '-0.5rem', top: '-1.25rem' }}
                            >
                                <Spinner isLoading={isLoading} />
                            </Div>
                        </Div>
                    ) : (
                        <Text small>
                            <b>
                                <String id="balance" />
                            </b>
                            : {currencyValue(balanceCUSD, { isToken: true, symbol: 'cUSD' })}
                        </Text>
                    )}
                </Row>
                <Row>
                    <Input
                        onChange={event => setValue(event?.target?.value)}
                        placeholder={`${t('enterAmount')}...`}
                        ref={inputRef}
                        value={value || ''}
                    />
                    {/* <Button onClick={handleMaxSet} secondaryLight smallest>
                        <Text bold small uppercase>
                            <String id="max" />
                        </Text>
                    </Button> */}
                </Row>
            </Wrapper>
            {!!error && !isLoading && value !== '' && (
                <Div mt={0.5} sAlignItems="center" sJustifyContent="center">
                    <Text div error small>
                        <String id="insufficientBalance" />
                        {error === 'equalBalance' && (
                            <InfoTooltip position="bottom center">
                                <Text brandSecondary small>
                                    <String id="includingNetworkFees" />
                                </Text>
                            </InfoTooltip>
                        )}
                    </Text>
                </Div>
            )}
        </>
    );
};
