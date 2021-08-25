import { Button, Div, Heading, Icon, Text, TextLink } from '../../../theme/components';
import { String } from '../../../components';
import { colors } from '../../../theme';
import { mq } from 'styled-gen';
import { toToken, useDAO } from '@impact-market/utils';
import { toast } from '../../../components/Toaster/Toaster';
import { useRouter } from 'next/router';
import { useTranslation } from '../../../components/TranslationProvider/TranslationProvider';
import React, { useState } from 'react';
import config from '../../../../config';
import countriesJson from '../../../constants/countries.json';
import styled, { css } from 'styled-components';

const countries: { [key: string]: any } = countriesJson;

const CommunityWrapper = styled.div`
    display: flex;
    width: 100%;
    flex-direction: column;

    & + & {
        margin-top: 32px;
    }

    ${mq.tablet(css`
        border: 1px solid ${colors.backgroundSecondary};
        border-radius: 16px;
        flex-direction: row;
        padding: 20px;
    `)}
`;
const CommunityCover = styled.div<any>`
    background-image: url('${({ image }) => image}');
    background-position: center;
    background-repeat: no-repeat;
    background-size: cover;
    border-radius: 8px;
    flex-shrink: 0;
    overflow: hidden;
    padding-top: 310px;
    width: 100%;

    ${mq.tablet(css`
        padding-top: 122px;
        width: 133px;
    `)}
`;
const CommunityContent = styled.div`
    display: flex;
    flex-direction: column;
    margin-top: 22px;
    width: 100%;

    ${mq.tablet(css`
        margin-top: 0;
        margin-left: 22px;
    `)}
`;

const CommunityContentBottom = styled.div`
    display: flex;
    flex-direction: column;
    margin-top: auto;
    padding-top: 1.5rem;

    ${mq.tablet(css`
        flex-direction: row;
    `)}
`;

const CommunityHeadingWrapper = styled.div``;

const ToastMessage = (props: any) => (
    <>
        <String id="proposalNameGenerated" variables={{ name: props?.name }} />
        <TextLink brandPrimary href={props?.url} target="_blank">
            <String id="viewProposal" />
        </TextLink>
    </>
);

export const Community = (props: any) => {
    const {
        city,
        cover,
        country,
        contract,
        description,
        id,
        name,
        proposal,
        requestByAddress,
        votingPower,
        withAddress
    } = props;
    const { addCommunity } = useDAO();
    const { push } = useRouter();
    const [isLoading, setIsLoading] = useState(false);
    const [submitted, setSubmitted] = useState(!!proposal?.id);
    const { t } = useTranslation();

    const handleClick = async () => {
        if (isLoading) {
            return;
        }

        setIsLoading(true);

        try {
            const data = {
                ...contract,
                decreaseStep: toToken(0.01),
                managers: [requestByAddress],
                maxTranche: toToken(10000, { EXPONENTIAL_AT: 25 }),
                minTranche: toToken(0.1),
                proposalDescription: `${name} | ${city}, ${country} - ${description}`
            };

            const id = await addCommunity(data);

            if (id) {
                setSubmitted(true);
                const url = `${config.votingPlatformUrl}?id=${id}`;

                toast.success(<ToastMessage name={name} url={url} />);
            }

            setIsLoading(false);
        } catch (error) {
            setIsLoading(false);

            console.log(error);
            toast.error(t('toast.defaultError'));
        }
    };

    const onSeeMoreClick = () => push(`/communities/${id}`);

    if (submitted) {
        return null;
    }

    return (
        <CommunityWrapper>
            <CommunityCover image={cover?.url} />
            <CommunityContent>
                <CommunityHeadingWrapper>
                    <Heading h4>{name}</Heading>
                    <Text brandSecondary mt={0.25} small>
                        <Icon brandSecondary icon="location" mr={0.5} sHeight={0.75} sWidth={0.65} />
                        {city}, {countries?.[country]?.name}
                        <span style={{ padding: '0 0.5rem' }}>·</span>
                        <TextLink brandPrimary onClick={onSeeMoreClick}>
                            <String id="seeMore" />
                            ...
                        </TextLink>
                    </Text>
                </CommunityHeadingWrapper>
                <CommunityContentBottom>
                    <Div column pr={2} sWidth="100%">
                        <Text small>
                            <String
                                id="totalClaimAmountPerBeneficiary"
                                variables={{ amount: 100, amountPerDay: 1.5 }}
                            />
                        </Text>
                        <Text brandSecondary small>
                            <String id="eachClaimHasMinutesIncrement" variables={{ minutes: 1 }} />
                        </Text>
                    </Div>
                    <Button
                        disabled={votingPower === 'no' || !withAddress}
                        isLoading={isLoading || (votingPower === 'pending' && !!withAddress)}
                        mt={{ sm: 'auto', xs: 2 }}
                        onClick={handleClick}
                    >
                        <Text body manrope>
                            <String id="generateProposal" />
                        </Text>
                    </Button>
                </CommunityContentBottom>
            </CommunityContent>
        </CommunityWrapper>
    );
};
