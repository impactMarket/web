import { CountryFilterField } from '../../../components/FilterFields';
import React from 'react';

type FiltersProps = {
    handleChange: Function;
    query: any;
};

export const Filters = (props: FiltersProps) => {
    const { handleChange, query } = props;
    const { country } = query;

    return (
        <>
            <CountryFilterField
                defaultValue={country?.toString()}
                handleChange={(country: string) => handleChange('country', country)}
            />
        </>
    );
};
