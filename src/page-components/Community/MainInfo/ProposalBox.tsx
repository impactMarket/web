import { CommunitySubmissionWarnings, GenerateProposalButton, String } from '../../../components';
import { DashboardCard, Div, Text } from '../../../theme/components';
import { toNumber } from '@impact-market/utils';
import React, { useState } from 'react';

const ProposalBox = (props: any) => {
    const { contract, proposalId, requestByAddress } = props;
    const [alreadyProposed, setAlreadyProposed] = useState(!!proposalId);

    return (
        <DashboardCard fluidHeight>
            <Div column pr={2} sWidth="100%">
                <Text center small>
                    <String
                        id="totalClaimAmountPerBeneficiary"
                        variables={{
                            amount: toNumber(contract?.maxClaim),
                            amountPerDay: toNumber(contract?.claimAmount)
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
            {!alreadyProposed && (
                <GenerateProposalButton
                    contract={contract}
                    mt={1.5}
                    requestByAddress={requestByAddress}
                    setSubmitted={setAlreadyProposed}
                />
            )}
        </DashboardCard>
    );
};

export default ProposalBox;
