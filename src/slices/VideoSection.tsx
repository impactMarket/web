import { Col, Grid, Heading, Row, Section } from '../theme/components';
import { PrismicRichTextType } from '../lib/Prismic/types';
import { Video } from '../components/Video/Video';
import React from 'react';
import RichText from '../lib/Prismic/components/RichText';

type VideoSectionSliceType = {
    primary: {
        format?: '16:9' | '21:9' | '4:3';
        text?: PrismicRichTextType;
        title?: string;
        video: {
            embedUrl?: string;
            providerName?: string;
        };
    };
    onlyVideo?: boolean;
};

const VideoSection = (props: VideoSectionSliceType) => {
    const { primary, onlyVideo = false } = props;
    const { format, text, title, video } = primary;
    const { embedUrl, providerName } = video;

    if (!embedUrl || providerName !== 'YouTube') {
        return null;
    }

    return (
        <Section id="video" sBackground={!onlyVideo ? 'backgroundSecondary' : ''} sWidth={onlyVideo ? '100%' : ''}>
            <Grid sPadding={!onlyVideo ? { sm: '4 null', xs: '3 null' } : {}} sWidth={onlyVideo ? '100%' : ''}>
                {!onlyVideo && (
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
                )}
                <Row>
                    <Col mt={{ sm: 3.125, xs: 2 }} sPadding={onlyVideo ? '0' : '1rem'} xs={12}>
                        <Video {...video} format={format || '16:9'} />
                    </Col>
                </Row>
            </Grid>
        </Section>
    );
};

export default VideoSection;
