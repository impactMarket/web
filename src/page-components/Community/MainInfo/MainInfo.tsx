import { Col, Div, Grid, Heading, Icon, Row, Section, Text } from '../../../theme/components';
import { ICommunity } from '../../../apis/types';
import { ResumeBox } from './ResumeBox';
import { String } from '../../../components';
import { dateHelpers } from '../../../helpers/dateHelpers';
import { numericalValue } from '../../../helpers/numericalValue';
import { size } from 'polished';
import React, { useMemo } from 'react';
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
    const { campaign, city, contract, contractAddress, country, description, managers, name, state, status } = props;
    const campaignUrl = useMemo(() => campaign?.campaignUrl, [campaign]);

    return (
        <Section mt={2}>
            <Grid>
                <Row>
                    <Col md={8} sm={6} xs={12}>
                        {/* Heading info */}
                        <Heading h2>{name}</Heading>
                        <Div mt={0.5} textSecondary>
                            <Div sHeight={1.375}>
                                <Icon icon="community" sHeight="auto" sWidth={0.75} />
                            </Div>
                            <Text ml={0.25} small>
                                {numericalValue(state?.beneficiaries || 0)}
                            </Text>
                            <Div sHeight={1.375}>
                                <Icon icon="location" ml={0.5} sHeight="auto" sWidth={0.5} />
                            </Div>
                            <Text ml={0.25} small>
                                {city ? `${city}, ` : ``}
                                {countries?.[country]?.name}
                            </Text>
                        </Div>

                        {/* Description */}
                        <Div mt={1}>
                            <Text small>{description}</Text>
                        </Div>

                        {/* Mobile Resume */}
                        <Div column mt={1.5} sDisplay={{ sm: 'none', xs: 'flex' }}>
                            <ResumeBox
                                campaignUrl={campaignUrl}
                                contract={contract}
                                contractAddress={contractAddress}
                                state={state}
                            />
                        </Div>

                        {/* Managers */}
                        <Div column mt={2}>
                            <Heading h3>
                                <String id="communityManagers" />
                            </Heading>

                            <Div column mt={1}>
                                {managers?.map(({ user }, index) => (
                                    <Div key={index} mt={index ? 1 : 0} sAlignItems="center">
                                        <Avatar image={user?.avatar?.url}>
                                            {!user?.avatar?.url && <Icon icon="user" textSecondary />}
                                        </Avatar>
                                        <Div column ml={1} sWidth="100%">
                                            <Heading h6>{user?.username || user?.address}</Heading>
                                            <Text XSmall textSecondary>
                                                <String id="managerSince" /> {dateHelpers.short(user?.createdAt)}
                                            </Text>
                                        </Div>
                                    </Div>
                                ))}
                            </Div>
                        </Div>
                    </Col>
                    <Col md={4} sm={6} xs={false}>
                        <ResumeBox
                            campaignUrl={campaignUrl}
                            contract={contract}
                            contractAddress={contractAddress}
                            state={state}
                            status={status}
                        />
                    </Col>
                </Row>
            </Grid>
        </Section>
    );
};
