import { Button, DashboardCard, Div, Heading, Text } from '../../../theme/components';
import { ProgressBar, String } from '../../../components';
import { communityDashboardResume } from '../../../apis/communityDashboardResume';
import { numericalValue } from '../../../helpers/numericalValue';
import { useTranslation } from '../../../components/TranslationProvider/TranslationProvider';
import React from 'react';

export const ResumeBox = (props: any) => {
    const { campaignUrl, contract, state } = props;
    const { t } = useTranslation();

    const handleMiscDonationClick = () => {
        if (!window) {
            return;
        }

        window.open(campaignUrl, '_blank');
    };

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

            {/* campaign button */}
            {campaignUrl && (
                <>
                    <Text mt={1} sTextAlign="center" small>
                        <String id="contributeWith" />
                    </Text>
                    <Button
                        fluid
                        lined
                        mt={1}
                        onClick={handleMiscDonationClick}
                        sBorderColor="brandSecondaryLight"
                        thin
                    >
                        <Text regular>
                            <String id="page.community.miscDonationButtonLabel" />
                        </Text>
                    </Button>
                    <Div mt={0.5} sAlignItems="center" sJustifyContent="center">
                        <Text XSmall brandSecondaryLight mr={0.25}>
                            <String id="poweredBy" />
                        </Text>
                        <a href="https://esolidar.com" rel="noreferrer noopener" target="_blank">
                            <img height="14px" src="/img/partners/esolidar.svg" width="65px" />
                        </a>
                    </Div>
                </>
            )}
        </DashboardCard>
    );
};
