import { Stories } from '../../components/Stories/Stories';
import React from 'react';
import prismicT from '@prismicio/types';

const StoriesContent = (props: any) => {
    const { data } = props as prismicT.PrismicDocument;

    return <Stories isActive={props.isActive} sPadding="3 0" stories={(data || {}) as any} />;
};

StoriesContent.propTypes = {};

export default StoriesContent;
