import { Button, DashboardCard, Div, Heading, Img, Text } from '../../../theme/components';
import { ProgressBar, String } from '../../../components';
import { communityDashboardResume } from '../../../apis/communityDashboardResume';
import { mq } from 'styled-gen';
import { numericalValue } from '../../../helpers/numericalValue';
import { modal } from 'react-modal-handler';
import { useTranslation } from '../../../components/TranslationProvider/TranslationProvider';
import ProposalBox from './ProposalBox';
import React from 'react';
import styled, { css } from 'styled-components';

const celoDollarLabel = 'Celo Dollar ($cUSD)';

const Wrapper = styled.div`
    width: 100%;

    ${mq.tablet(css`
        position: absolute;
    `)}
`;

export const ResumeBox = (props: any) => {
    const { campaignUrl, contract, contractAddress, state, status } = props;
    const { t } = useTranslation();

    const handleMiscDonationClick = () => {
        if (!window) {
            return;
        }

        window.open(campaignUrl, '_blank');
    };

    const handleContributeClick = () => {
        return modal.open('governanceContribute', { communityAddress: contractAddress });
    };

    if (status === 'pending') {
        return <ProposalBox {...props} />;
    }

    return (
        <Div relative>
            <Wrapper>
                <DashboardCard fluidHeight>
                    <Heading center h3>
                        {numericalValue(state?.beneficiaries)} <String id="beneficiaries" />
                    </Heading>
                    {!!communityDashboardResume.getClaimingValuePerFrequence(contract, t) && (
                        <Text center small>
                            ({communityDashboardResume.getClaimingValuePerFrequence(contract, t)})
                        </Text>
                    )}
                    {!!state?.backers && (
                        <Div mt={1.5}>
                            <Text small textSecondary>
                                <String id="raisedFromDonors" variables={{ donors: state?.backers }} />
                            </Text>
                            <Text ml="auto" small textSecondary>
                                <String id="goal" />
                            </Text>
                        </Div>
                    )}
                    <Div mt={!state?.backers ? 1.5 : 0}>
                        <Heading h6>
                            {communityDashboardResume.getRaised(state)}
                            {!!+communityDashboardResume.getGoalProgress(props) &&
                                ` (${communityDashboardResume.getGoalProgress(props, '%')})`}
                        </Heading>
                        <Heading h6 ml="auto">
                            {communityDashboardResume.getGoal(props)}
                        </Heading>
                    </Div>
                    <ProgressBar mb={1} mt={1} progress={communityDashboardResume.getGoalProgress(props)} />

                    <Text mt={1} sTextAlign="center" small>
                        <String id="contributeWith" />
                    </Text>

                    {/* Contribute with DAO */}
                    <Button fluid mt={1} onClick={handleContributeClick} >
                        <Text medium>{celoDollarLabel}</Text>
                        <Img inlineFlex ml={0.5} sHeight={1.5} sWidth="auto" src="/img/cusd.png" />
                    </Button>

                    {/* campaign button */}
                    {campaignUrl && (
                        <>
                            <Text mt={1} sTextAlign="center" small>
                                <String id="or" />
                            </Text>
                            <Button
                                fluid
                                lined
                                mt={1}
                                onClick={handleMiscDonationClick}
                                sBorderColor="brandSecondaryLight"
                                thin
                            >
                                <Text body medium>
                                    <String id="page.community.miscDonationButtonLabel" />
                                </Text>
                            </Button>
                            <Div mt={0.5} sAlignItems="center" sJustifyContent="center">
                                <Text XSmall brandSecondaryLight mr={0.25}>
                                    <String id="poweredBy" />
                                </Text>
                                <a href="https://esolidar.com" rel="noreferrer noopener" target="_blank">
                                    {/* eslint-disable-next-line @next/next/no-img-element */}
                                    <img
                                        alt="e-solidar logo"
                                        height="14px"
                                        src="/img/partners/esolidar.svg"
                                        width="65px"
                                    />
                                </a>
                            </Div>
                        </>
                    )}
                </DashboardCard>
            </Wrapper>
        </Div>
    );
};
