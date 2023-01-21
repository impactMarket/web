import { Box, Button, CircledIcon } from '@impact-market/ui';
import { Text } from '../../../theme/components';
import { colors } from '../../../theme';
import React from 'react';
import RichText from '../../../lib/Prismic/components/RichText';
import styled from 'styled-components';

const ThanksButtonsStyled = styled.div`
    /* Hide for now 
    display: grid;
    grid-template-columns: 1fr 1fr;
    align-items: center;
    gap: 1rem; */
`;

export const Thanks = ({ setOpenThanksComponent, funds, setFunds, translations }: any) => {
    const { depositThankYou, depositYourDonation, depositContinue } = translations;

    return (
        <Box flex style={{ flexDirection: 'column', gap: '2rem' }}>
            <CircledIcon icon="heart" medium />
            <Box>
                <Text sColor={colors.g900} sFontSize={1.125} sFontWeight={500}>
                    {depositThankYou}
                </Text>
                <RichText
                    content={depositYourDonation}
                    mt={0.5}
                    sColor={colors.g500}
                    sFontSize={0.875}
                    variables={{ amount: funds?.availableInterest }}
                />
            </Box>
            <ThanksButtonsStyled>
                <Button
                    onClick={() => {
                        setOpenThanksComponent(false);
                        setFunds({
                            availableInterest: '0',
                            cUsdBalance: funds?.cUsdBalance,
                            deposited: funds?.deposited,
                            totalInterest: funds?.totalInterest
                        });
                    }}
                >
                    <Text semibold>{depositContinue}</Text>
                </Button>
                {/* Hide for now
                <Button icon="share" secondary>
                    <Text semibold>{depositShare}</Text>
                </Button> */}
            </ThanksButtonsStyled>
        </Box>
    );
};
