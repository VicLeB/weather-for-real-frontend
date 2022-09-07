import React, {useEffect, useState} from 'react';

function LocationSearch({handleLocationSearch }) {
    const [locationSearchValue, setLocationSearchValue] = useState('');

    useEffect(() => {
        const autocomplete = new window.google.maps.places.Autocomplete(document.getElementById('google-autocomplete'), {
            types: ('regions'),
            componentRestrictions: {'country':['US', 'CA']},
            fields: ['place_id','formatted_address']
        });

        autocomplete.addListener('place_changed', () => {
            const searchLocation = (autocomplete.getPlace().formatted_address);
            handleLocationSearch(searchLocation);
            setLocationSearchValue(searchLocation);
        });
    }, [locationSearchValue]);

    return (
        <div>
            <h1>Location Search Bar</h1>
            <input id="google-autocomplete" type="text" placeholder='Search'/>
        </div>
    );
}

export default LocationSearch;