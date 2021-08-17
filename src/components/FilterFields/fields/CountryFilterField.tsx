import { Div, Icon, Text } from '../../../theme/components';
import { FilterButton } from '../components/FilterButton';
import { FilterList } from '../components/FilterList';
import { String } from '../../String/String';
import { multipleItemString } from '../../../helpers/multipleItemString';
import { useTranslation } from '../../TranslationProvider/TranslationProvider';
import Api from '../../../apis/api';
import React, { useEffect, useState } from 'react';
import countriesJson from '../../../constants/countries.json';
import sortBy from 'lodash/sortBy';

const countriesCollection: { [key: string]: any } = countriesJson;

type CountryFilterFieldProps = {
    handleChange: Function;
    defaultValue: string;
};

export const CountryFilterField = (props: CountryFilterFieldProps) => {
    const { defaultValue, handleChange: handleChangeFromProps } = props;

    const [searchString, setSearchString] = useState('');
    const [countries, setCountries] = useState([]);
    const [selected, setSelected] = useState(multipleItemString.parse(defaultValue) || []);
    const [filteredCountries, setFilteredCountries] = useState([]);
    const { t } = useTranslation();

    useEffect(() => {
        const getCountries = async () => {
            const countriesArr = await Api.getCommunityCount('country');
            const unsortedCountries = countriesArr.map(
                ({ country: code, count }: { count?: number | string; country: string }) => ({
                    count,
                    label: countriesCollection[code]?.name,
                    value: code
                })
            );

            const countries = sortBy(unsortedCountries, ['label', 'value']);

            setCountries(countries);
        };

        getCountries();
    }, []);

    useEffect(() => {
        const filteredCountries = (countries || []).filter(
            ({ label, value }) =>
                label.toLowerCase().includes(searchString.toLocaleLowerCase()) ||
                value.toLowerCase().includes(searchString.toLocaleLowerCase())
        );

        setFilteredCountries(searchString ? filteredCountries : countries);
    }, [searchString, countries]);

    const handleSearchFieldChange = (value?: string) => {
        setSearchString(value || '');
    };

    const handleChange = (items: string[]) => {
        setSelected(items);
        handleChangeFromProps(!!items?.length ? multipleItemString.stringify(items) : '');
    };

    return (
        <FilterButton
            flyoutProps={{ small: true }}
            label={
                <Div sAlignItems="center">
                    <Icon icon="world" sHeight={1} sWidth={1} textSecondary />
                    <Text left medium ml={0.625} sWidth="100%" small textPrimary>
                        {!!selected?.length ? (
                            <>
                                {selected?.length} <String id="selected" />
                            </>
                        ) : (
                            <String id="allCountries" />
                        )}
                    </Text>
                    <Icon icon="caret" ml={0.625} sHeight={0.7} sWidth={0.7} textSecondary />
                </Div>
            }
        >
            {!!countries?.length && (
                <FilterList
                    defaultValue={multipleItemString.parse(defaultValue)}
                    handleChange={handleChange}
                    handleSearch={handleSearchFieldChange}
                    isResetable
                    isSelectable
                    items={filteredCountries}
                    searchPlaceholder={t('searchByCountry')}
                    withCounter
                />
            )}
        </FilterButton>
    );
};
