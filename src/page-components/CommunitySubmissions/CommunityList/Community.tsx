import {
    CommunityContent,
    CommunityContentBottom,
    CommunityCover,
    CommunityHeadingWrapper,
    CommunityWrapper
} from './Community.style';
import { Div, Heading, Icon, Text, TextLink } from '../../../theme/components';
import { GenerateProposalButton, String } from '../../../components';
import { frequencyToText, toNumber } from '@impact-market/utils';
import { getThumbnailCoverImage } from '../../../helpers/getCoverImage';
import { useRouter } from 'next/router';
import { useTranslation } from '../../../components/TranslationProvider/TranslationProvider';
import React, { useState } from 'react';
import countriesJson from '../../../constants/countries.json';

const countries: { [key: string]: any } = countriesJson;

export const Community = (props: any) => {
    const { city, cover, country, contract, description, id, name, proposal, requestByAddress } = props;
    const { push } = useRouter();
    const { t } = useTranslation();
    const [submitted, setSubmitted] = useState(!!proposal?.id);

    const onSeeMoreClick = () => push(`/communities/${id}`);

    if (submitted) {
        return null;
    }

    return (
        <CommunityWrapper>
            <CommunityCover image={getThumbnailCoverImage(cover)} />
            <CommunityContent>
                <CommunityHeadingWrapper>
                    <Heading h4>{name}</Heading>
                    <Text brandSecondary mt={0.25} small>
                        <Icon brandSecondary icon="location" mr={0.25} sHeight={0.75} sWidth={0.65} />
                        {city}, {countries?.[country]?.name || country}
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
                                variables={{
                                    amount: toNumber(contract?.maxClaim),
                                    amountPerPeriod: toNumber(contract?.claimAmount),
                                    period: (t(frequencyToText(contract?.baseInterval)) || '').toLowerCase()
                                }}
                            />
                        </Text>
                        <Text brandSecondary small>
                            <String
                                id="eachClaimHasMinutesIncrement"
                                variables={{ minutes: (contract?.incrementInterval * 5) / 60 }}
                            />
                        </Text>
                    </Div>
                    <GenerateProposalButton
                        contract={contract}
                        description={description}
                        mt={{ sm: 'auto', xs: 2 }}
                        onSuccess={() => setSubmitted(true)}
                        proposalId={proposal?.id}
                        requestByAddress={requestByAddress}
                    />
                </CommunityContentBottom>
            </CommunityContent>
        </CommunityWrapper>
    );
};
