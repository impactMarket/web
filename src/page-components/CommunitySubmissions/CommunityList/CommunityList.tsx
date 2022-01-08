import { Col, Div, Grid, Heading, Row, Section } from '../../../theme/components';
import { Community } from './Community';
import { CommunityEmptyListMessageWrapper } from '../../Communities/CommunityList/CommunityList.style';
import { CommunitySkeleton } from './CommunitySkeleton';
import { CommunitySubmissionWarnings, Pagination, SearchInput, String } from '../../../components';
import { Filters } from '../../Communities/CommunityList/Filters';
import { useRouter } from 'next/router';
import Api from '../../../apis/api';
import React, { useEffect, useState } from 'react';
import debounce from 'lodash/debounce';

const limitPerWindowSize: { [key: string]: any } = {
    desktop: 4,
    phone: 1,
    tablet: 4
};

export const CommunityList = () => {
    const [communities, setCommunities] = useState([]);
    const [count, setCount] = useState(0);
    const [isLoading, setIsLoading] = useState(true);
    const [windowWidth, setWindowWidth] = useState<keyof typeof limitPerWindowSize | undefined>();
    const router = useRouter();
    const { isReady, pathname, replace, query } = router;
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
        if (windowWidth && isReady && page) {
            const limit = limitPerWindowSize[windowWidth];

            const options = {
                country: country?.toString(),
                filter: filter?.toString(),
                limit: limit?.toString(),
                name: name?.toString(),
                page: page?.toString()
            };

            const getCommunities = async () => {
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

            getCommunities();
        }
    }, [windowWidth, country, filter, name, page]);

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
        <Section mt={{ md: 2, xs: 1 }}>
            <Grid>
                <Row middle="xs">
                    <Col sm={7} xs={12}>
                        <Heading h2>
                            <String id="submittedCommunities" />
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
                <Row mt={1.5}>
                    <Col xs={12}>
                        <CommunitySubmissionWarnings mt={1.5} />
                    </Col>
                </Row>
                <Row mt={2} pb={2}>
                    <Col xs={12}>
                        <Div column>
                            {/* Loading */}
                            {isLoading && new Array(4).fill('').map((_, index) => <CommunitySkeleton key={index} />)}

                            {/* Empty state */}
                            {!communities?.length && !isLoading && (
                                <CommunityEmptyListMessageWrapper>
                                    <Heading h3>
                                        <String id="noCommunitiesMatchCriteria" />
                                    </Heading>
                                </CommunityEmptyListMessageWrapper>
                            )}

                            {/* Communities list */}
                            {!isLoading && !!communities?.length && (
                                <Div sFlexDirection="column" sWidth="100%">
                                    {communities.map((community: any, index: number) => (
                                        <Community {...community} key={index} />
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
