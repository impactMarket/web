import { Col, Grid, Row, Section } from '../../../theme/components';
import { Map } from '../../../components';
import { mq } from 'styled-gen';
import React from 'react';
import styled, { css } from 'styled-components';

type HeaderProps = {
    coverImage?: string;
    gps?: {
        latitude: number;
        longitude: number;
    };
};

type ImageProps = {
    image: string;
};

const Image = styled.div<ImageProps>`
    background-image: url('${({ image }) => image}');
    background-position: center;
    background-repeat: no-repeat;
    background-size: cover;
    border-radius: 12px;
    overflow: hidden;
    padding-top: 100%;
    width: 100%;
`;

const MapWrapper = styled.div`
    border-radius: 12px;
    height: 6.5rem;
    overflow: hidden;
    width: 100%;

    ${mq.tablet(css`
        height: 100%;
    `)};
`;

export const Header = (props: HeaderProps) => {
    const { coverImage, gps } = props;

    return (
        <Section>
            <Grid>
                <Row reverse>
                    {coverImage && (
                        <Col md={4} sm={6} xs={12}>
                            <Image image={coverImage} />
                        </Col>
                    )}
                    {gps && (
                        <Col md={8} mt={{ sm: 0, xs: 1 }} sm={6} xs={12}>
                            <MapWrapper>
                                <Map claims={[{ gps }]} />
                            </MapWrapper>
                        </Col>
                    )}
                </Row>
            </Grid>
        </Section>
    );
};
