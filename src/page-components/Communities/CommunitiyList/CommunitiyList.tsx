import { Col, Div, Grid, Heading, Icon, Row, Section, Text } from '../../../theme/components';
import {
    CommunityEmpytyListMessageWrapper,
    CommunityListItem,
    CommunityListItemImage,
    CommunityListItemLink,
    CommunityListWrapper
} from './CommunityList.style';
import { CommunitySkeleton } from './CommunitySkeleton';
import { Filters } from './Filters';
import { Pagination, SearchInput, String } from '../../../components';
import { debounce } from 'lodash';
import { numericalValue } from '../../../helpers/numericalValue';
import { useRouter } from 'next/router';
import Api from '../../../apis/api';
import React, { useEffect, useState } from 'react';
import countriesJson from '../../../constants/countries.json';

const countries: { [key: string]: any } = countriesJson;

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
    const [communities, setCommunities] = useState([]);
    const [count, setCount] = useState(0);
    const [isLoading, setIsLoading] = useState(true);
    const [skeleton, setSkeleton] = useState([]);
    const [windowWidth, setWindowWidth] = useState<keyof typeof limitPerWindowSize | undefined>();
    const router = useRouter();
    const { isReady, pathname, replace, query, push } = router;
    const { country, filter, name, page } = query;

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
        if (windowWidth && isReady) {
            const limit = limitPerWindowSize[windowWidth];

            setSkeleton(skeletons[windowWidth]);

            const options = {
                country: country?.toString(),
                filter: filter?.toString(),
                limit: limit?.toString(),
                name: name?.toString(),
                page: page?.toString()
            };

            const getCommunites = async () => {
                setIsLoading(true);
                const { count, items } = await Api.getCommunities(options);

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

    const handleCommunityClick = (communityId: string | number) => {
        push(`communities/${communityId}`);
    };

    const handleChange = (param: string, value: string | number) => {
        if (query[param] === value) {
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
        <Section mt={2}>
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
                <Row mt={{ sm: 2, xs: 1 }} pb={2}>
                    <Col xs={12}>
                        <Div>
                            {/* Loading */}
                            {isLoading && (
                                <CommunityListWrapper>
                                    {skeleton.map((_, index) => (
                                        <CommunityListItem key={index}>
                                            <CommunitySkeleton />
                                        </CommunityListItem>
                                    ))}
                                </CommunityListWrapper>
                            )}

                            {/* Empty state */}
                            {!communities?.length && !isLoading && (
                                <CommunityEmpytyListMessageWrapper>
                                    <Heading h3>
                                        <String id="noCommunitiesMatchCriteria" />
                                    </Heading>
                                </CommunityEmpytyListMessageWrapper>
                            )}

                            {/* Communities list */}
                            {!isLoading && !!communities?.length && (
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
