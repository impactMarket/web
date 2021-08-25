import { Col, Div, Grid, Heading, Row, Section, TextLink } from '../../../theme/components';
import { Community } from './Community';
import { CommunityEmpytyListMessageWrapper } from '../../Communities/CommunitiyList/CommunityList.style';
import { Filters } from '../../Communities/CommunitiyList/Filters';
import { Pagination, SearchInput, String } from '../../../components';
import { useRouter } from 'next/router';
import { useVotingPower } from '@impact-market/utils';
import { useWallet } from '../../../hooks/useWallet';
import Api from '../../../apis/api';
import Infobox from '../../../components/Infobox/Infobox';
import React, { useEffect, useState } from 'react';
import debounce from 'lodash/debounce';

const limitPerWindowSize: { [key: string]: any } = {
    desktop: 4,
    phone: 1,
    tablet: 4
};

export const CommunityList = () => {
    const { address, connect } = useWallet();
    const { enoughVotingPowerToPropose } = useVotingPower();
    const [communities, setCommunities] = useState([]);
    const [votingPower, setVotingPower] = useState('pending');
    const [count, setCount] = useState(0);
    const [isLoading, setIsLoading] = useState(true);
    const [windowWidth, setWindowWidth] = useState<keyof typeof limitPerWindowSize | undefined>();
    const router = useRouter();
    const { isReady, pathname, replace, query } = router;
    const { country, filter, name, page } = query;

    const handleConnectClick = async () => {
        try {
            await connect();
        } catch (error) {
            console.log(error);
        }
    };

    useEffect(() => {
        if (typeof enoughVotingPowerToPropose === 'boolean') {
            setVotingPower(enoughVotingPowerToPropose ? 'yes' : 'no');
        }
    }, [enoughVotingPowerToPropose]);

    useEffect(() => {
        const handleWindowSize = () => {
            const { innerWidth } = window;
            const isPhone = innerWidth < 768;
            const isDesktop = !isPhone && innerWidth > 1023;
            // eslint-disable-next-line no-nested-ternary
            const widthName = isPhone ? 'phone' : isDesktop ? 'desktop' : 'tablet';

            if (widthName !== windowWidth) {
                setWindowWidth(widthName);
            }
        };

        handleWindowSize();
        window.addEventListener('resize', handleWindowSize);

        return () => window.removeEventListener('resize', handleWindowSize);
    }, [windowWidth]);

    useEffect(() => {
        if (windowWidth && isReady && page) {
            const limit = limitPerWindowSize[windowWidth];

            const options = {
                country: country?.toString(),
                filter: filter?.toString(),
                limit: limit?.toString(),
                name: name?.toString(),
                page: page?.toString()
            };

            const getCommunites = async () => {
                setIsLoading(true);
                const { count, items } = await Api.getPendingCommunities(options);

                if (!items.length && +page > 1) {
                    replace({ pathname, query: { ...query, page: 1 } }, undefined, {
                        shallow: true
                    });
                }

                setCommunities(items);
                setCount(count);
                setIsLoading(false);
            };

            getCommunites();
        }
    }, [windowWidth, country, filter, name, page]);

    const handleChange = (param: string, value: string | number) => {
        if (query[param] === value || !address) {
            return;
        }

        const newQuery = {
            ...query,
            page: 1,
            [param]: value
        };

        if (!value) {
            delete newQuery[param];
        }

        replace({ pathname, query: newQuery }, undefined, { shallow: true });
    };

    const handleDebouncedChange = debounce(handleChange, 250);

    return (
        <Section mt={{ md: 2, xs: 1 }}>
            <Grid>
                <Row middle="xs">
                    <Col sm={7} xs={12}>
                        <Heading h2>
                            <String id="communities" />
                        </Heading>
                    </Col>
                    <Col mt={{ sm: 0, xs: 1 }} sm={5} xs={12}>
                        <String id="searchByCommunityName">
                            {(placeholder: string) => (
                                <SearchInput
                                    defaultValue={name?.toString()}
                                    ml={{ sm: 'auto' }}
                                    onChange={(name?: string) => handleDebouncedChange('name', name)}
                                    onReset={() => handleChange('name', '')}
                                    placeholder={placeholder}
                                    sMaxWidth={{ sm: 14 }}
                                />
                            )}
                        </String>
                    </Col>
                </Row>
                <Row mt={1.5}>
                    <Col xs={12}>
                        <Filters handleChange={handleChange} query={query} />
                    </Col>
                </Row>
                {(!address || votingPower === 'no') && (
                    <Row mt={1.5}>
                        <Col xs={12}>
                            {!address && (
                                <Infobox type="info">
                                    To generate proposals you need to{' '}
                                    <TextLink brandPrimary onClick={handleConnectClick}>
                                        connect your wallet.
                                    </TextLink>
                                </Infobox>
                            )}
                            {votingPower === 'no' && address && (
                                <Infobox type="warning">
                                    You don’t have enought voting power to generate proposals.
                                </Infobox>
                            )}
                        </Col>
                    </Row>
                )}
                <Row mt={2} pb={2}>
                    <Col xs={12}>
                        <Div>
                            {/* Loading */}
                            {isLoading && <div>loading</div>}

                            {/* Empty state */}
                            {!communities?.length && !isLoading && (
                                <CommunityEmpytyListMessageWrapper>
                                    <Heading h3>
                                        <String id="noCommunitiesMatchCriteria" />
                                    </Heading>
                                </CommunityEmpytyListMessageWrapper>
                            )}

                            {/* Comunities list */}
                            {!isLoading && !!communities?.length && (
                                <Div sFlexDirection="column" sWidth="100%">
                                    {communities.map((community: any, index: number) => (
                                        <Community
                                            {...community}
                                            key={index}
                                            votingPower={votingPower}
                                            withAddress={!!address}
                                        />
                                    ))}
                                </Div>
                            )}
                        </Div>
                        {!!count && (
                            <Pagination
                                count={count}
                                isPhone={windowWidth === 'phone'}
                                limit={windowWidth ? limitPerWindowSize[windowWidth] : limitPerWindowSize.desktop}
                                onPageChange={(selectedPage?: string | number) => handleChange('page', +selectedPage)}
                                page={+page || 1}
                            />
                        )}
                    </Col>
                </Row>
            </Grid>
        </Section>
    );
};
