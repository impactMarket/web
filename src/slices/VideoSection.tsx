import { Col, Grid, Heading, Row, Section } from '../theme/components';
import { PrismicRichTextType } from '../lib/Prismic/types';
import { Video } from '../components/Video/Video';
import React from 'react';
import RichText from '../lib/Prismic/components/RichText';

type VideoSectionSliceType = {
    primary: {
        text?: PrismicRichTextType;
        title?: string;
        video: {
            embedUrl?: string;
            providerName?: string;
        };
    };
};

const VideoSection = (props: VideoSectionSliceType) => {
    const { primary } = props;
    const { text, title, video } = primary;
    const { embedUrl, providerName } = video;

    if (!embedUrl || providerName !== 'YouTube') {
        return null;
    }

    return (
        <Section id="video" sBackground="backgroundSecondary">
            <Grid sPadding={{ sm: '4 null', xs: '3 null' }}>
                <Row center="xs">
                    <Col xs={10}>
                        {!!title && (
                            <Heading center h2>
                                {title}
                            </Heading>
                        )}
                        {!!text?.length && <RichText center content={text} mt={1} />}
                    </Col>
                </Row>
                <Row>
                    <Col mt={{ sm: 3.125, xs: 2 }} xs={12}>
                        <Video {...video} />
                    </Col>
                </Row>
            </Grid>
        </Section>
    );
};

export default VideoSection;
