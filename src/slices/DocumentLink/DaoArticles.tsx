import { GovernanceArticles } from '../../components/GovernanceArticles/GovernanceArticles';
import React from 'react';
import prismicT from '@prismicio/types';

const DaoArticles = (props: prismicT.PrismicDocument) => {
    const { data } = props;
    const { articles } = (data || {}) as any;

    return <GovernanceArticles articles={articles} sPadding="1 0" />;
};

DaoArticles.propTypes = {};

export default DaoArticles;
