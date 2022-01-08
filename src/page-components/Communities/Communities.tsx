import { CommunityList } from './CommunityList/CommunityList';
import { Cta } from '../../components';
import { HealingMap } from './HealingMap/HealingMap';
import React from 'react';

export const Communities = () => {
    return (
        <>
            <HealingMap />
            <CommunityList />
            <Cta />
        </>
    );
};
