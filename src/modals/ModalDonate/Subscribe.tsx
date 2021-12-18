import { Button, Input, ItemsRow, RichContentFormat, Text } from '../../theme/components';
import { GeneratedPropsTypes } from '../../theme/Types';
import { String } from '../../components';
import { generateProps, mq } from 'styled-gen';
import { useGoogleReCaptcha } from 'react-google-recaptcha-v3';
import { useTranslation } from '../../components/TranslationProvider/TranslationProvider';
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
    const { t } = useTranslation();
    const [fields, setFields] = useState({ email: '', name: '' });
    const [isLoading, setIsLoading] = useState(false);
    const [subscribed, setSubscribed] = useState(false);
    const [errorMessage, setErrorMessage] = useState('');
    const { executeRecaptcha } = useGoogleReCaptcha();

    const { name, email } = fields;

    const handleChange = (event: any) => {
        const { name, value } = event.target;

        setFields(fields => ({ ...fields, [name]: value }));
        if (errorMessage) {
            setErrorMessage('');
        }
    };

    const getRecaptchaToken = async () => {
        try {
            return await executeRecaptcha('donate_modal_subscribe');
        } catch (error) {
            return console.log(error);
        }
    };

    const handleSubscribe = async () => {
        const recaptchaToken = await getRecaptchaToken();

        if (!recaptchaToken) {
            return setErrorMessage('Ups! reCAPTCHA error...');
        }

        if (!name || !email) {
            return setErrorMessage(t('requiredFields'));
        }

        if (!validateEmail(email)) {
            return setErrorMessage(t('invalidEmail'));
        }

        setIsLoading(true);
        const { success } = await Api.submitHubspotContact({ email, name, recaptchaToken });

        setIsLoading(false);

        if (!success) {
            return setErrorMessage(t('somethingWrong'));
        }

        return setSubscribed(true);
    };

    return (
        <>
            <Wrapper {...props}>
                {subscribed ? (
                    <Text>{t('subscribeSuccess')}</Text>
                ) : (
                    <>
                        <ItemsRow distribute="tablet">
                            <Input
                                lg
                                name="name"
                                onChange={handleChange}
                                placeholder={t('firstName')}
                                type="text"
                                value={name || ''}
                            />
                            <Input
                                lg
                                mt={{ sm: 0, xs: 1 }}
                                name="email"
                                onChange={handleChange}
                                placeholder={t('emailAddress')}
                                type="text"
                                value={email || ''}
                            />
                            <Button isLoading={isLoading} large medium mt={{ sm: 0, xs: 1 }} onClick={handleSubscribe}>
                                {t('subscribe')}
                            </Button>
                        </ItemsRow>
                    </>
                )}
            </Wrapper>
            <RichContentFormat mt={0.5}>
                <Text XSmall>
                    <String id="recaptchaFootnote" />
                </Text>
            </RichContentFormat>
            {errorMessage && (
                <Text XXSmall error style={{ marginTop: 8 }}>
                    {errorMessage}
                </Text>
            )}
        </>
    );
};
