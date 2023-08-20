import { PublicHoliday, CountryInfo } from '../model/interfaces';

const fetchData = async <T>(url: string): Promise<T | undefined> => {
    try {
        const result = await fetch(url);
        return await result.json() as T;
    } catch (error) {
        console.error(error);
    }
};

export const holidayApi = {
    getHolydays: async (countyCode = 'CY') => await fetchData<PublicHoliday[]>(`https://date.nager.at/api/v3/publicholidays/2023/${countyCode}`),
    getCountries: async () => await fetchData<CountryInfo[]>('https://date.nager.at/api/v3/AvailableCountries')
};