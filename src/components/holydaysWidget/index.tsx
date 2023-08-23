import { useState, useEffect, useCallback } from 'react';
import { PublicHoliday, CountryInfo } from '../../model/interfaces';
import { holidayApi } from '../../utils/holydaysApi';
import HolydaysList from './HolydaysList';
import CountriesDropdown from './CountriesDropdown';

export default function HolydaysWidget(): JSX.Element {
    const [isLoading, setIsLoading] = useState(true);
    const [holydays, setHolydays] = useState<PublicHoliday[]>();
    const [countries, setCountries] = useState<CountryInfo[]>();
    const [selectedCountry, setSelectedCountry] = useState('Cyprus');

    const getHolydays = useCallback(async (country?: CountryInfo) => {
        const holydays: PublicHoliday[] | undefined = await holidayApi.getHolydays(country?.countryCode);
        setHolydays(holydays);
        if (country) {
            setSelectedCountry(country.name);
        }
    }, []);

    const getCountries = useCallback(async () => {
        const countries: CountryInfo[] | undefined = await holidayApi.getCountries();
        setCountries(countries);
    }, []);

    useEffect(() => {
        const fetchHolydays = async (): Promise<void> => {
            setIsLoading(true);
            await Promise.all([getHolydays(), getCountries()]);
            setIsLoading(false);
        };
        fetchHolydays();
    }, [getHolydays, getCountries]);

    const onCountrySelect = useCallback((country: CountryInfo) => {
        getHolydays(country);
    }, [getHolydays]);

    return (
        <div className='p-4 bg-zinc-400 flex flex-col justify-center items-center rounded'>
            {
                !isLoading &&
                <>
                    <CountriesDropdown
                        selectedCountry={selectedCountry}
                        countries={countries}
                        onCountrySelect={onCountrySelect} />
                    <HolydaysList holydays={holydays} />
                </>
            }
        </div>
    );
}