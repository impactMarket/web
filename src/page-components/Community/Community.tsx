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
    // const { page } = useData();
    const { data } = props;

    const { coverImage, gps } = data;
    const header = { coverImage, gps };

    return (
        <>
            <Header {...header} />
            <MainInfo {...data} />
            <Dashboard {...data} />
        </>
    );
};
