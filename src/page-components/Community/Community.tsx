import { Dashboard } from './Dashboard/Dashboard';
import { Header } from './Header/Header';
import { ICommunity } from '../../apis/types';
import { MainInfo } from './MainInfo/MainInfo';
import React from 'react';

type CommunityProps = {
    data: {
        communityDataFromApi?: ICommunity;
    };
};

export const Community = (props: CommunityProps) => {
    const { data } = props;
    const { communityDataFromApi } = data;

    if (!communityDataFromApi) {
        return null;
    }

    const { claimLocations, cover, gps, status } = communityDataFromApi;
    const header = { claimLocations, cover, gps };

    return (
        <>
            <Header {...header} />
            <MainInfo {...communityDataFromApi} />
            {status !== 'pending' && <Dashboard {...communityDataFromApi} />}
        </>
    );
};
