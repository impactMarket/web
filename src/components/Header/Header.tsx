import { Col, Grid, Logo, Row, TextLink } from '../../theme/components';
import { HeaderContent, HeaderMenuWrapper, HeaderWrapper } from './Header.style';
import { useData } from '../DataProvider/DataProvider';
import { useRouter } from 'next/router';
import Link from 'next/link';
import React from 'react';

export const Header = () => {
    const { config } = useData();
    const { asPath } = useRouter();
    const menu = config?.header?.menu;

    const checkActiveRoute = (route: string | undefined) => route === asPath;

    return (
        <HeaderWrapper>
            <Grid>
                <Row>
                    <Col xs={12}>
                        <HeaderContent>
                            <Link href="/">
                                <a className={checkActiveRoute('/') ? 'is-disabled' : ''}>
                                    <Logo />
                                </a>
                            </Link>
                            <HeaderMenuWrapper>
                                {menu &&
                                    menu.map((item, index) => (
                                        <Link href={item?.to || ''} key={index}>
                                            <TextLink isActive={checkActiveRoute(item?.to)}>{item?.label}</TextLink>
                                        </Link>
                                    ))}
                            </HeaderMenuWrapper>
                        </HeaderContent>
                    </Col>
                </Row>
            </Grid>
        </HeaderWrapper>
    );
};
