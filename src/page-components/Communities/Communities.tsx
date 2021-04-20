import { CommunitiyList } from './CommunitiyList/CommunitiyList';
import { Cta } from '../../components';
import { HealingMap } from './HealingMap/HealingMap';
import React from 'react';

export const Communities = () => {
    return (
        <>
            <HealingMap />
            <CommunitiyList />
            <Cta />
        </>
    );
};
