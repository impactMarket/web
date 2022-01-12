import { Dashboard } from './Dashboard/Dashboard';
import { Header } from './Header/Header';
import { ICommunity } from '../../apis/types';
import { MainInfo } from './MainInfo/MainInfo';
import React from 'react';

type CommunityProps = {
    data: ICommunity;
};

export const Community = (props: CommunityProps) => {
    const { data } = props;

    const { claimLocations, cover, gps, status } = data;
    const header = { claimLocations, cover, gps };

    return (
        <>
            <Header {...header} />
            <MainInfo {...data} />
            {status !== 'pending' && <Dashboard {...data} />}
        </>
    );
};
