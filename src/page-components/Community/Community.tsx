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

    const { claimLocations, coverImage, gps, status } = data;
    const header = { claimLocations, coverImage, gps };

    return (
        <>
            <Header {...header} />
            <MainInfo {...data} />
            {status !== 'pending' && <Dashboard {...data} />}
        </>
    );
};
