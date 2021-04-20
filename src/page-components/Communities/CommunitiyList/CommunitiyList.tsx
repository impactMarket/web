import { Chip, Col, Div, Grid, Heading, Icon, ItemsRow, Row, Section, Spinner, Text } from '../../../theme/components';
import {
    CommunityListChipSeparator,
    CommunityListItem,
    CommunityListItemImage,
    CommunityListItemLink,
    CommunityListLoading,
    CommunityListWrapper
} from './CommunityList.style';
import { Pagination } from '../../../components';
import { numericalValue } from '../../../helpers/numericalValue';
import { useData } from '../../../components/DataProvider/DataProvider';
import { useRouter } from 'next/router';
import Api from '../../../apis/api';
import React, { useEffect, useState } from 'react';
import countriesJson from '../../../constants/countries.json';

const countries: { [key: string]: any } = countriesJson;

const filters = ['allCommunities', 'featured'] as const;

const limitPerWindowSize = {
    desktop: 10,
    phone: 3,
    tablet: 6
};

export const CommunitiyList = () => {
    const { getString } = useData();
    const [activeFilter, setActiveFilter] = useState<typeof filters[number]>(filters[0]);
    const [activePage, setActivePage] = useState(1);
    const [communities, setCommunities] = useState([]);
    const [count, setCount] = useState(0);
    const [isLoading, setIsLoading] = useState(true);
    const [windowWidth, setWindowWidth] = useState<keyof typeof limitPerWindowSize | undefined>();
    const router = useRouter();

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

            const getCommunites = async () => {
                setIsLoading(true);
                const { count, items } = await Api.getCommunities({ filter: activeFilter, limit, page: activePage });

                setCommunities(items);
                setCount(count);
                setIsLoading(false);
            };

            getCommunites();
        }
    }, [activeFilter, activePage, windowWidth]);

    const handleFilterClick = (filterName: typeof filters[number]) => {
        if (filterName === activeFilter) {
            return;
        }

        setActiveFilter(filterName);
    };

    const handlePageChange = (page: number) => {
        if (page === activePage) {
            return;
        }

        setActivePage(page);
    };

    const handleCommunityClick = (communityId: string | number) => {
        router.push(`communities/${communityId}`);
    };

    return (
        <Section mt={2}>
            <Grid>
                <Row>
                    <Col xs={12}>
                        <Heading h2>{getString('communities')}</Heading>
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
                                            {getString(filterName)}
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
                                <CommunityListLoading>
                                    <Spinner isLoading />
                                </CommunityListLoading>
                            ) : (
                                <CommunityListWrapper>
                                    {communities.map((community: any, index: number) => (
                                        <CommunityListItem key={index}>
                                            <CommunityListItemLink onClick={() => handleCommunityClick(community?.id)}>
                                                <CommunityListItemImage image={community?.coverImage} />
                                                <Text bold ellipsis manrope mt={0.5} small>
                                                    {community?.name}
                                                </Text>
                                                <Div textSecondary>
                                                    <Icon icon="community" sWidth={0.75} />
                                                    <Text ml={0.25} small>
                                                        {numericalValue(community?.state?.beneficiaries)}
                                                    </Text>
                                                    <Icon icon="location" ml={0.5} sWidth={0.5} />
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
