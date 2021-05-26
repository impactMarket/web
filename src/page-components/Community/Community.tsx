import { Header } from './Header/Header';
// import { useData } from '../../components/DataProvider/DataProvider';
import { Dashboard } from './Dashboard/Dashboard';
import { ICommunity } from '../../apis/types';
import { MainInfo } from './MainInfo/MainInfo';
import React from 'react';

type CommunityProps = {
    data: ICommunity;
};

export const Community = (props: CommunityProps) => {
    const { data } = props;

    const { claimLocations, coverImage } = data;
    const header = { claimLocations, coverImage };

    return (
        <>
            <Header {...header} />
            <MainInfo {...data} />
            <Dashboard {...data} />
        </>
    );
};
