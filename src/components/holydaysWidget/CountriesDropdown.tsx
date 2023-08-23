import Dropdown from '../ui/Dropdown';
import { CountryInfo } from '../../model/interfaces';

interface CountriesDropdownProps {
    countries?: CountryInfo[]
    onCountrySelect: (country: CountryInfo) => void
    selectedCountry: string
}

export default function CountriesDropdown({ countries, onCountrySelect, selectedCountry }: CountriesDropdownProps): JSX.Element {
    return (<>
        <div className='w-56 mb-6 p-2 bg-gray-50 rounded'>
        <h3>Select country: </h3>
        {countries && <Dropdown<CountryInfo> text={selectedCountry} onClickEvent={onCountrySelect} items={countries}/>}
    </div>
    </>);
}