import { Global } from './Global/Global';
import { IGlobalDashboard } from '../../apis/types';
import { useData } from '../../components/DataProvider/DataProvider';
import React from 'react';

type GlobalDashboardProps = {
    data: IGlobalDashboard;
    page: string;
};

export const GlobalDashboard = (props: GlobalDashboardProps) => {
    const { page } = useData();
    const { data } = props;

    const global = page?.global;

    return (
        <>
            <Global data={data} {...global} />
        </>
    );
};
