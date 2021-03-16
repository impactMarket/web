import { Col, Grid, Logo, Row } from '../../theme/components';
import { HeaderContent, HeaderLink, HeaderMenuWrapper, HeaderWrapper } from './Header.style';
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
                                            <HeaderLink isActive={checkActiveRoute(item?.to)}>{item?.label}</HeaderLink>
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
