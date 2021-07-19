import { DashboardCard, Div, Heading, Text } from '../../../theme/components';
import { ProgressBar, String } from '../../../components';
import { communityDashboardResume } from '../../../apis/communityDashboardResume';
import { numericalValue } from '../../../helpers/numericalValue';
import { useTranslation } from '../../../components/TranslationProvider/TranslationProvider';
import React from 'react';

export const ResumeBox = (props: any) => {
    const { contract, state } = props;
    const { t } = useTranslation();

    return (
        <DashboardCard fluidHeight>
            <Heading center h3>
                {numericalValue(state?.beneficiaries)} <String id="beneficiaries" />
            </Heading>
            <Text center small>
                ({communityDashboardResume.getClaimingValuePerFrequence(contract, t)})
            </Text>
            <Div mt={1.5}>
                <Text small textSecondary>
                    <String id="raisedFromDonors" variables={{ donors: state?.backers }} />
                </Text>
                <Text ml="auto" small textSecondary>
                    <String id="goal" />
                </Text>
            </Div>
            <Div>
                <Heading h6>
                    {communityDashboardResume.getRaised(state)} ({communityDashboardResume.getGoalProgress(props, '%')})
                </Heading>
                <Heading h6 ml="auto">
                    {communityDashboardResume.getGoal(props)}
                </Heading>
            </Div>
            <ProgressBar mb={1} mt={1} progress={communityDashboardResume.getGoalProgress(props)} />
        </DashboardCard>
    );
};
