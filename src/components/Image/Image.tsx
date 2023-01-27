import { getImage } from '../../../utils/images';
import Img from 'next/image';
import React from 'react';

const getImageOptions = (forwardProps: any) => {
    if (forwardProps?.layout === 'raw') {
        return forwardProps;
    }

    return {
        layout: 'fill',
        objectFit: 'cover',
        ...forwardProps
    };
};

const Image = (props: any) => {
    const { src: filePath, h: height, w: width, ...forwardProps } = props;

    return (
        <Img
            alt=""
            blurDataURL={getImage({
                filePath,
                fit: 'cover',
                height: 2,
                width: 2
            })}
            placeholder="blur"
            src={getImage({
                filePath,
                fit: 'cover',
                height: height ? height : 0,
                width: width ? width : 0
            })}
            {...getImageOptions(forwardProps)}
        />
    );
};

export default Image;
