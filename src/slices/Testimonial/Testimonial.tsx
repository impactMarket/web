import { Testimonial } from '../../components/Testimonial/Testimonial';
import React from 'react';
import prismicT from '@prismicio/types';

const TestimonialContent = (props: prismicT.PrismicDocument) => {
    const { data } = props;
    const { testimonial: testimonialCards } = (data || {}) as any;

    return <Testimonial data={data} sPadding="3 0" testimonialCards={testimonialCards} />;
};

TestimonialContent.propTypes = {};

export default TestimonialContent;
