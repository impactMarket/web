import { CommunitySubmissionWarnings, GenerateProposalButton, String } from '../../../components';
import { DashboardCard, Div, Text } from '../../../theme/components';
import { frequencyToText, toNumber } from '@impact-market/utils';
import { useTranslation } from '../../../components/TranslationProvider/TranslationProvider';
import React, { useState } from 'react';

const ProposalBox = (props: any) => {
    const { contract, description, proposalId, requestByAddress } = props;
    const [submitted, setSubmitted] = useState(false);
    const { t } = useTranslation();

    return (
        <DashboardCard fluidHeight>
            <Div column pr={2} sWidth="100%">
                <Text center small>
                    <String
                        id="totalClaimAmountPerBeneficiary"
                        variables={{
                            amount: toNumber(contract?.maxClaim),
                            amountPerPeriod: toNumber(contract?.claimAmount),
                            period: (t(frequencyToText(contract?.baseInterval)) || '').toLowerCase()
                        }}
                    />
                </Text>
                <Text center mt={0.5} small textSecondary>
                    <String
                        id="eachClaimHasMinutesIncrement"
                        variables={{ minutes: (contract?.incrementInterval * 5) / 60 }}
                    />
                </Text>
            </Div>
            <CommunitySubmissionWarnings mt={1.5} />
            {!submitted && (
                <GenerateProposalButton
                    contract={contract}
                    description={description}
                    mt={1.5}
                    onSuccess={() => setSubmitted(true)}
                    proposalId={proposalId}
                    requestByAddress={requestByAddress}
                />
            )}
        </DashboardCard>
    );
};

export default ProposalBox;
