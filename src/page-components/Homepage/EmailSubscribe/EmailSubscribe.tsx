import { Button, Col, Grid, Heading, Img, Input, ItemsRow, Row, Section, Text } from '../../../theme/components';
import { useData } from '../../../components/DataProvider/DataProvider';
import { useGoogleReCaptcha } from 'react-google-recaptcha-v3';
import { validateEmail } from '../../../helpers/validateEmail';
import Api from '../../../apis/api';
import React, { useState } from 'react';

export const EmailSubscribe = () => {
    const { config, getString } = useData();
    const [fields, setFields] = useState({ email: '', name: '' });
    const [isLoading, setIsLoading] = useState(false);
    const [subscribed, setSubscribed] = useState(false);
    const [errorMessage, setErrorMessage] = useState('');
    const { executeRecaptcha } = useGoogleReCaptcha();

    const { name, email } = fields;

    const emailSubscribe: any = config?.emailSubscribe;

    const heading = emailSubscribe?.heading;

    const handleChange = (event: any) => {
        const { name, value } = event.target;

        setFields(fields => ({ ...fields, [name]: value }));
        if (errorMessage) {
            setErrorMessage('');
        }
    };

    const getRecaptchaToken = async () => {
        if (!executeRecaptcha) {
            return console.log('No reCAPTCHA ready!');
        }

        try {
            return await executeRecaptcha('Form: subscribe');
        } catch (error) {
            return console.log(error);
        }
    };

    const handleSubscribe = async () => {
        const token = await getRecaptchaToken();

        if (!token) {
            return setErrorMessage('Ups! reCAPTCHA error...');
        }

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
        <Section>
            <Grid sPadding={{ md: '2.75 null', xs: '2 null' }}>
                <Row center="xs" middle="xs" reverse>
                    <Col md={5} mdOffset={0.5} xs={12}>
                        <Img alt="Random community people jumping" src="/img/subscribe.png" />
                    </Col>
                    <Col md={5} mt={{ md: 0, xs: 2 }} xs={12}>
                        <Heading h3>{heading}</Heading>
                        {subscribed ? (
                            <Text mt={{ md: 1, xs: 2 }}>{getString('subscribeSuccess')}</Text>
                        ) : (
                            <>
                                <ItemsRow distribute="tablet" mt={{ md: 1, xs: 2 }}>
                                    <Input
                                        lg
                                        name="name"
                                        onChange={handleChange}
                                        placeholder={getString('firstName')}
                                        type="text"
                                        value={name || ''}
                                        withLightBackground
                                    />
                                    <Input
                                        lg
                                        mt={{ sm: 0, xs: 1 }}
                                        name="email"
                                        onChange={handleChange}
                                        placeholder={getString('emailAddress')}
                                        type="text"
                                        value={email || ''}
                                        withLightBackground
                                    />
                                </ItemsRow>
                                <Button fluid isLoading={isLoading} large mt={1} onClick={handleSubscribe}>
                                    {getString('subscribe')}
                                </Button>
                            </>
                        )}
                        {errorMessage && (
                            <Text XSmall error style={{ marginTop: 8 }}>
                                {errorMessage}
                            </Text>
                        )}
                    </Col>
                </Row>
            </Grid>
        </Section>
    );
};
