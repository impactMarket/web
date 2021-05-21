import { Col, DashboardCard, Div, Grid, Heading, Icon, Row, Section, Text } from '../../../theme/components';
import { ICommunity } from '../../../apis/types';
import { ProgressBar } from '../../../components';
import { communityDashboardResume } from '../../../apis/communityDashboardResume';
import { dateHelpers } from '../../../helpers/dateHelpers';
import { numericalValue } from '../../../helpers/numericalValue';
import { size } from 'polished';
import { useData } from '../../../components/DataProvider/DataProvider';
import React from 'react';
import countriesJson from '../../../constants/countries.json';
import styled from 'styled-components';

const countries: { [key: string]: any } = countriesJson;

type AvatarProps = {
    image?: string;
};

const Avatar = styled.div<AvatarProps>`
    ${size(42)};

    background-image: ${({ image }) => image && `url("${image}")`};
    background-position: center;
    background-repeat: no-repeat;
    background-size: cover;
    border-radius: 21px;
    overflow: hidden;
`;

export const MainInfo = (props: ICommunity) => {
    const { contract, country, description, managers, name, state } = props;
    const { getString } = useData();

    return (
        <Section mt={2}>
            <Grid>
                <Row>
                    <Col md={8} sm={6} xs={12}>
                        {/* Heading info */}
                        <Heading h2>{name}</Heading>
                        <Div textSecondary>
                            <Icon icon="community" sWidth={0.75} />
                            <Text ml={0.25} small>
                                {numericalValue(state?.beneficiaries)}
                            </Text>
                            <Icon icon="location" ml={0.5} sWidth={0.5} />
                            <Text ml={0.25} small>
                                {countries?.[country]?.name}
                            </Text>
                        </Div>

                        {/* Description */}
                        <Div mt={1}>
                            <Text small>{description}</Text>
                        </Div>

                        {/* Managers */}
                        <Div column mt={2}>
                            <Heading h3>{getString('communityManagers')}</Heading>

                            <Div column mt={1}>
                                {managers?.map(({ user }, index) => (
                                    <Div key={index} mt={index ? 1 : 0} sAlignItems="center">
                                        <Avatar image={user?.avatar?.url}>
                                            {!user?.avatar?.url && <Icon icon="user" textSecondary />}
                                        </Avatar>
                                        <Div column ml={1}>
                                            <Heading h6>{user?.username || user?.address}</Heading>
                                            <Text XSmall textSecondary>
                                                {getString('managerSince')} {dateHelpers.short(user?.createdAt)}
                                            </Text>
                                        </Div>
                                    </Div>
                                ))}
                            </Div>
                        </Div>
                    </Col>
                    <Col md={4} mt={{ sm: 0, xs: 1 }} sm={6} xs={12}>
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
                                    {communityDashboardResume.getRaised(state)} (
                                    {communityDashboardResume.getGoalProgress(props, '%')})
                                </Heading>
                                <Heading h6 ml="auto">
                                    {communityDashboardResume.getGoal(props)}
                                </Heading>
                            </Div>
                            <ProgressBar mb={1} mt={1} progress={communityDashboardResume.getGoalProgress(props)} />
                        </DashboardCard>
                    </Col>
                </Row>
            </Grid>
        </Section>
    );
};
