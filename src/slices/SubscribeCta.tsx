import {
    Button,
    Col,
    Grid,
    Heading,
    Input,
    ItemsRow,
    RichContentFormat,
    Row,
    Section,
    Text
} from '../theme/components';
import { PrismicImageType } from '../lib/Prismic/types';
import { String } from '../components';
import { useGoogleReCaptcha } from 'react-google-recaptcha-v3';
import { useTranslation } from '../components/TranslationProvider/TranslationProvider';
import { validateEmail } from '../helpers/validateEmail';
import Api from '../apis/api';
import Image from '../lib/Prismic/components/Image';
import React, { useState } from 'react';

type SubscribeCtaSliceType = {
    primary: {
        heading?: string;
        image?: PrismicImageType;
    };
};

const SubscribeCta = (props: SubscribeCtaSliceType) => {
    const { primary } = props;
    const { image, heading } = primary;

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
            return await executeRecaptcha('homepage_cta_subscribe');
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
        <Section>
            <Grid sPadding={{ md: '2.75 null', xs: '2 null' }}>
                <Row center="xs" middle="xs" reverse>
                    <Col md={5} mdOffset={0.5} xs={12}>
                        <Image {...image} />
                    </Col>
                    <Col md={5} mt={{ md: 0, xs: 2 }} xs={12}>
                        {!!heading && <Heading h3>{heading}</Heading>}
                        {subscribed ? (
                            <Text mt={{ md: 1, xs: 2 }}>
                                <String id="subscribeSuccess" />
                            </Text>
                        ) : (
                            <>
                                <ItemsRow distribute="tablet" mt={{ md: 1, xs: 2 }}>
                                    <Input
                                        lg
                                        name="name"
                                        onChange={handleChange}
                                        placeholder={t('firstName')}
                                        type="text"
                                        value={name || ''}
                                        withLightBackground
                                    />
                                    <Input
                                        lg
                                        mt={{ sm: 0, xs: 1 }}
                                        name="email"
                                        onChange={handleChange}
                                        placeholder={t('emailAddress')}
                                        type="text"
                                        value={email || ''}
                                        withLightBackground
                                    />
                                </ItemsRow>
                                <Button fluid isLoading={isLoading} large mt={1} onClick={handleSubscribe}>
                                    <String id="subscribe" />
                                </Button>
                                <RichContentFormat mt={1}>
                                    <Text XSmall>
                                        <String id="recaptchaFootnote" />
                                    </Text>
                                </RichContentFormat>
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

export default SubscribeCta;
