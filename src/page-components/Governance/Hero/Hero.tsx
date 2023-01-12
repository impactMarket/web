import { Breakdown, ShareThis, String } from '../../../components';
import {
    Button,
    Col,
    Div,
    DotBackground,
    Grid,
    Heading,
    RichContentFormat,
    Row,
    Section,
    Text
} from '../../../theme/components';
// import { RampInstantSDK } from '@ramp-network/ramp-instant-sdk';
// import { colors } from '../../../theme';
import { modal } from 'react-modal-handler';
// import { useTranslation } from '../../../components/TranslationProvider/TranslationProvider';
import React from 'react';
// import config from '../../../../config';

export const Hero = () => {
    // const { t } = useTranslation();

    const handleContributeClick = () => {
        return modal.open('governanceContribute');
    };

    // const triggerRamp = () => {
    //     new RampInstantSDK({
    //         hostAppName: 'impactMarket',
    //         hostLogoUrl:
    //             'https://www.gitbook.com/cdn-cgi/image/height=40,fit=contain,dpr=2,format=auto/https%3A%2F%2F2074548608-files.gitbook.io%2F~%2Ffiles%2Fv0%2Fb%2Fgitbook-x-prod.appspot.com%2Fo%2Fspaces%252FCYFjCZsJmtFWjyXZmVH8%252Flogo%252FrnP1xUXSL3jJHhxKkA82%252Flogo_blue_on_transparent_background.png%3Falt%3Dmedia%26token%3D42e89872-c292-4ccc-b8c5-771b055c4581',
    //         swapAmount: '',
    //         swapAsset: 'CELO_CUSD',
    //         userAddress: config.treasuryAddress
    //     }).show();
    // };

    return (
        <Section relative>
            <DotBackground />
            <Grid pb={2} pt={2} relative>
                <Row>
                    <Col md={6} xs={12}>
                        <Heading fontSize={{ md: '41 54', sm: '32 42', xs: '24 36' }} h1>
                            <String id="page.governanceToken.hero.heading" />
                        </Heading>
                        <RichContentFormat fontSize={{ md: '16 28', xs: '14 24' }} mt={1}>
                            <String id="page.governanceToken.hero.text" />
                        </RichContentFormat>
                        <Div mt={2} sAlignItems="center" sFlexDirection={{ sm: 'row', xs: 'column' }}>
                            <Button
                                large
                                mr={{ sm: 2, xs: 0 }}
                                onClick={handleContributeClick}
                                sWidth={{ sm: 'unset', xs: '100%' }}
                            >
                                <Text bold>
                                    <String id="contributeAndEarnRewards" />
                                </Text>
                            </Button>
                        </Div>
                        {/* <Text flex g500 mt={0.5} small>
                            {t('or').toLocaleLowerCase()}
                        </Text> */}
                        {/* <Button
                            lined
                            mt={{ xs: 0.5 }}
                            onClick={triggerRamp}
                            sColor={colors.brandPrimary}
                            sHeight="3rem"
                            sPadding="12px 20px"
                            smaller
                        >
                            <Text bold sFontSize="1rem" sFontWeight={500}>
                                <String id="cashin.button.text" />
                            </Text>
                        </Button> */}
                        <ShareThis mt={2} sJustifyContent={{ sm: 'left', xs: 'center' }} />
                    </Col>
                    <Col md={6} mt={{ md: 0, xs: 2.5 }} relative xs={12}>
                        <Breakdown />
                    </Col>
                </Row>
            </Grid>
        </Section>
    );
};
