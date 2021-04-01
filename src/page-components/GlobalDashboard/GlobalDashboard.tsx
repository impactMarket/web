import { Communities } from './Communities/Communities';
import { Distribution } from './Distribution/Distribution';
import { Fundraising } from './Fundraising/Fundraising';
import { Global } from './Global/Global';
import { HealingMap } from './HealingMap/HealingMap';
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
    const healingMap = page?.healingMap;
    const communities = page?.communities;
    const distribution = page?.distribution;
    const fundraising = page?.fundraising;

    return (
        <>
            <Global data={data} {...global} />
            <HealingMap {...healingMap} />
            <Communities data={data} {...communities} />
            <Distribution data={data} {...distribution} />
            <Fundraising data={data} {...fundraising} />
        </>
    );
};
