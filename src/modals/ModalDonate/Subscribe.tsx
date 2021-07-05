import { Button, Input, ItemsRow, Text } from '../../theme/components';
import { GeneratedPropsTypes } from '../../theme/Types';
import { generateProps, mq } from 'styled-gen';
import { useData } from '../../components/DataProvider/DataProvider';
import { validateEmail } from '../../helpers/validateEmail';
import Api from '../../apis/api';
import React, { useState } from 'react';
import styled, { css } from 'styled-components';

const Wrapper = styled.div`
    display: block;

    ${mq.tablet(css`
        align-items: center;
        display: flex;
        flex-direction: column;
        justify-content: space-between;
        width: 100%;
        flex-direction: row;
    `)}

    ${generateProps};
`;

export const Subscribe = (props: GeneratedPropsTypes) => {
    const { getString } = useData();
    const [fields, setFields] = useState({ email: '', name: '' });
    const [isLoading, setIsLoading] = useState(false);
    const [subscribed, setSubscribed] = useState(false);
    const [errorMessage, setErrorMessage] = useState('');

    const { name, email } = fields;

    const handleChange = (event: any) => {
        const { name, value } = event.target;

        setFields(fields => ({ ...fields, [name]: value }));
        if (errorMessage) {
            setErrorMessage('');
        }
    };

    const handleSubscribe = async () => {
        if (!name || !email) {
            return setErrorMessage(getString('requiredFields'));
        }

        if (!validateEmail(email)) {
            return setErrorMessage(getString('invalidEmail'));
        }

        setIsLoading(true);
        const { success } = await Api.submitHubspotContact({ email, name });

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
                        <ItemsRow distribute="tablet">
                            <Input
                                lg
                                name="name"
                                onChange={handleChange}
                                placeholder={getString('firstName')}
                                type="text"
                                value={name || ''}
                            />
                            <Input
                                lg
                                mt={{ sm: 0, xs: 1 }}
                                name="email"
                                onChange={handleChange}
                                placeholder={getString('emailAddress')}
                                type="text"
                                value={email || ''}
                            />
                            <Button isLoading={isLoading} large medium mt={{ sm: 0, xs: 1 }} onClick={handleSubscribe}>
                                {getString('subscribe')}
                            </Button>
                        </ItemsRow>
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
