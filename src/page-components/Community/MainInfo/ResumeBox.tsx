import { DashboardCard, Div, Heading, Text } from '../../../theme/components';
import { ProgressBar } from '../../../components';
import { communityDashboardResume } from '../../../apis/communityDashboardResume';
import { numericalValue } from '../../../helpers/numericalValue';
import { useData } from '../../../components/DataProvider/DataProvider';
import React from 'react';

export const ResumeBox = (props: any) => {
    const { contract, state } = props;
    const { getString } = useData();

    return (
        <DashboardCard fluidHeight>
            <Heading center h3>
                {numericalValue(state?.beneficiaries)} {getString('beneficiaries')}
            </Heading>
            <Text center small>
                ({communityDashboardResume.getClaimingValuePerFrequence(contract, getString)})
            </Text>
            <Div mt={1.5}>
                <Text small textSecondary>
                    {getString('raisedFromDonors', { donors: state?.backers })}
                </Text>
                <Text ml="auto" small textSecondary>
                    {getString('goal')}
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
