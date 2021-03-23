import { Button, Input, Text } from '../../theme/components';
import { GeneratedPropsTypes } from '../../theme/Types';
import { generateProps, mq } from 'styled-gen';
import { useData } from '../../components/DataProvider/DataProvider';
import { validateEmail } from '../../helpers/validateEmail';
import Api from '../../apis/api';
import React, { useState } from 'react';
import styled, { css } from 'styled-components';

const Wrapper = styled.div`
    align-items: center;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    width: 100%;

    ${mq.tablet(css`
        flex-direction: row;
    `)}

    ${generateProps};
`;

const ButtonWrapper = styled.div`
    margin-top: 16px;
    width: 100%;

    ${mq.tablet(css`
        margin-left: 14px;
        margin-top: 0;
        width: unset;
    `)}
`;

export const Subscribe = (props: GeneratedPropsTypes) => {
    const { getString } = useData();
    const [email, setEmail] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const [subscribed, setSubscribed] = useState(false);
    const [errorMessage, setErrorMessage] = useState('');

    const handleChange = (event: any) => {
        setEmail(event?.target?.value);
        if (errorMessage) {
            setErrorMessage('');
        }
    };

    const handleSubscribe = async () => {
        if (!email) {
            return setErrorMessage(getString('required'));
        }

        if (!validateEmail(email)) {
            return setErrorMessage(getString('invalidEmail'));
        }

        setIsLoading(true);
        const { success } = await Api.subscribeEmail(email);

        setIsLoading(false);

        if (!success) {
            return setErrorMessage(getString('somethingWrong'));
        }

        return setSubscribed(true);
    };

    return (
        <>
            <Wrapper {...props}>
                {subscribed ? (
                    <Text>{getString('subscribeSuccess')}</Text>
                ) : (
                    <>
                        <Input onChange={handleChange} placeholder={getString('enterYourEmail')} value={email || ''} />
                        <ButtonWrapper>
                            <Button fluid isLoading={isLoading} onClick={handleSubscribe} small>
                                {getString('subscribe')}
                            </Button>
                        </ButtonWrapper>
                    </>
                )}
            </Wrapper>
            {errorMessage && (
                <Text XXSmall error style={{ marginTop: 8 }}>
                    {errorMessage}
                </Text>
            )}
        </>
    );
};
