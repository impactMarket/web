import { Col, Grid, Logo, Row, TextLink } from '../../theme/components';
import { HeaderContent, HeaderMenuItem, HeaderMenuWrapper, HeaderWrapper } from './Header.style';
import { useData } from '../DataProvider/DataProvider';
import { useRouter } from 'next/router';
import Link from 'next/link';
import React from 'react';

export const Header = () => {
    const { config } = useData();
    const { asPath } = useRouter();
    const menu = config?.header?.menu;

    const checkActiveRoute = (route: string | undefined) =>
        typeof route === 'string' ? asPath.includes(route) : false;

    return (
        <HeaderWrapper>
            <Grid>
                <Row>
                    <Col xs={12}>
                        <HeaderContent>
                            <Link href="/">
                                <a className={checkActiveRoute('/') ? 'is-disabled' : ''} style={{ fontSize: 0 }}>
                                    <Logo />
                                </a>
                            </Link>
                            <HeaderMenuWrapper>
                                {menu &&
                                    menu.map((item, index) => (
                                        <HeaderMenuItem key={index}>
                                            <Link href={item?.to || ''}>
                                                <TextLink isActive={checkActiveRoute(item?.to)}>{item?.label}</TextLink>
                                            </Link>
                                        </HeaderMenuItem>
                                    ))}
                            </HeaderMenuWrapper>
                        </HeaderContent>
                    </Col>
                </Row>
            </Grid>
        </HeaderWrapper>
    );
};
