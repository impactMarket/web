import { Chip, Col, Div, Grid, Heading, Icon, ItemsRow, Row, Section, Text } from '../../../theme/components';
import {
    CommunityListChipSeparator,
    CommunityListItem,
    CommunityListItemImage,
    CommunityListItemLink,
    CommunityListWrapper
} from './CommunityList.style';
import { CommunitySkeleton } from './CommunitySkeleton';
import { Pagination, String } from '../../../components';
import { numericalValue } from '../../../helpers/numericalValue';
import { useRouter } from 'next/router';
import Api from '../../../apis/api';
import React, { useEffect, useState } from 'react';
import countriesJson from '../../../constants/countries.json';

const countries: { [key: string]: any } = countriesJson;

const filters = ['allCommunities', 'featured'] as const;

const limitPerWindowSize: { [key: string]: any } = {
    desktop: 10,
    phone: 3,
    tablet: 6
};

const skeletons = Object.keys(limitPerWindowSize).reduce(
    (result: any, key: string) => ({ ...result, [key]: new Array(limitPerWindowSize[key]).fill('') }),
    {}
);

export const CommunitiyList = () => {
    const [activeFilter, setActiveFilter] = useState<any>();
    const [activePage, setActivePage] = useState<any>();
    const [communities, setCommunities] = useState([]);
    const [count, setCount] = useState(0);
    const [isLoading, setIsLoading] = useState(true);
    const [skeleton, setSkeleton] = useState([]);
    const [windowWidth, setWindowWidth] = useState<keyof typeof limitPerWindowSize | undefined>();
    const router = useRouter();
    const { isReady, pathname, push, replace, query } = router;

    useEffect(() => {
        const { filter, page } = query;

        if (isReady && (!filter || !page)) {
            push({ pathname, query: { ...query, filter: filter || filters[0], page: page || 1 } }, undefined, {
                shallow: true
            });
        }

        if (isReady && filter !== activeFilter) {
            setActiveFilter(filter);
        }

        if (isReady && page !== activePage) {
            setActivePage(page);
        }
    }, [query]);

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
        if (windowWidth) {
            const limit = limitPerWindowSize[windowWidth];

            if (activeFilter && activePage) {
                const getCommunites = async () => {
                    setIsLoading(true);
                    const { count, items } = await Api.getCommunities({
                        filter: activeFilter,
                        limit,
                        page: activePage
                    });

                    setCommunities(items);
                    setCount(count);
                    setIsLoading(false);
                };

                getCommunites();
            }

            const getCommunites = async () => {
                setIsLoading(true);
                const { count, items } = await Api.getCommunities({ filter: activeFilter, limit, page: activePage });

                if (!items.length && activePage > 1) {
                    replace({ pathname, query: { ...query, page: 1 } }, undefined, {
                        shallow: true
                    });
                }

                setCommunities(items);
                setCount(count);
                setIsLoading(false);
            };

            getCommunites();

            setSkeleton(skeletons[windowWidth]);
        }
    }, [activeFilter, activePage, windowWidth]);

    const handleFilterClick = (filterName: typeof filters[number]) => {
        if (filterName === activeFilter) {
            return;
        }

        push({ pathname, query: { ...query, filter: filterName, page: 1 } }, undefined, { shallow: true });
    };

    const handlePageChange = (page: number) => {
        if (page === activePage) {
            return;
        }

        push({ pathname, query: { ...query, page } }, undefined, { shallow: true });
    };

    const handleCommunityClick = (communityId: string | number) => {
        router.push(`communities/${communityId}`);
    };

    return (
        <Section mt={2}>
            <Grid>
                <Row>
                    <Col xs={12}>
                        <Heading h2>
                            <String id="communities" />
                        </Heading>
                    </Col>
                </Row>
                <Row mt={1.5}>
                    <Col xs={12}>
                        <ItemsRow scrollable>
                            {filters.map((filterName, index) => (
                                <React.Fragment key={index}>
                                    {index === 1 && <CommunityListChipSeparator />}
                                    <Chip
                                        as="a"
                                        isActive={activeFilter === filterName}
                                        key={index}
                                        onClick={() => handleFilterClick(filterName)}
                                        textUppercase={false}
                                    >
                                        <Text flex medium sAlignItems="center" small>
                                            {filterName === filters[1] && (
                                                <Icon
                                                    icon="star"
                                                    mr={0.25}
                                                    sColor={
                                                        activeFilter === filterName ? 'yellow' : 'brandSecondaryLight'
                                                    }
                                                    sHeight={1}
                                                />
                                            )}
                                            <String id={filterName} />
                                        </Text>
                                    </Chip>
                                </React.Fragment>
                            ))}
                        </ItemsRow>
                    </Col>
                </Row>
                <Row mt={2} pb={2}>
                    <Col xs={12}>
                        <Div>
                            {!communities || isLoading ? (
                                <CommunityListWrapper>
                                    {skeleton.map((_, index) => (
                                        <CommunityListItem key={index}>
                                            <CommunitySkeleton />
                                        </CommunityListItem>
                                    ))}
                                </CommunityListWrapper>
                            ) : (
                                <CommunityListWrapper>
                                    {communities.map((community: any, index: number) => (
                                        <CommunityListItem key={index} withLink>
                                            <CommunityListItemLink onClick={() => handleCommunityClick(community?.id)}>
                                                <CommunityListItemImage image={community?.coverImage} />
                                                <Text bold ellipsis manrope mt={0.5} small>
                                                    {community?.name}
                                                </Text>
                                                <Div textSecondary>
                                                    <Div sHeight={1.375}>
                                                        <Icon icon="community" sHeight="auto" sWidth={0.75} />
                                                    </Div>
                                                    <Text ml={0.25} small>
                                                        {numericalValue(community?.state?.beneficiaries)}
                                                    </Text>
                                                    <Div sHeight={1.375}>
                                                        <Icon icon="location" ml={0.5} sHeight="auto" sWidth={0.5} />
                                                    </Div>
                                                    <Text ml={0.25} small>
                                                        {countries?.[community?.country]?.name}
                                                    </Text>
                                                </Div>
                                            </CommunityListItemLink>
                                        </CommunityListItem>
                                    ))}
                                </CommunityListWrapper>
                            )}
                        </Div>
                        {!!count && (
                            <Pagination
                                count={count}
                                isPhone={windowWidth === 'phone'}
                                limit={windowWidth ? limitPerWindowSize[windowWidth] : limitPerWindowSize.desktop}
                                onPageChange={handlePageChange}
                                page={activePage}
                            />
                        )}
                    </Col>
                </Row>
            </Grid>
        </Section>
    );
};
