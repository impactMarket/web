import { Div as BaseDiv } from '../../../theme/components';
import { GeneratedPropsTypes } from '../../../theme/Types';
import { PrismicImageType } from '../types';
import Img from 'next/image';
import React from 'react';
import styled from 'styled-components';

const Div = styled(BaseDiv)`
    display: block;
    width: 100%;
`;

const Image = (props: PrismicImageType & GeneratedPropsTypes) => {
    const { alt = '', dimensions, url, ...forwardProps } = props;

    if (!url) {
        console.log(`No url provided for the image: \n${props}`);

        return null;
    }

    return (
        <Div {...forwardProps}>
            <Img alt={alt} layout="responsive" src={url} {...dimensions} />
        </Div>
    );
};

export default Image;
