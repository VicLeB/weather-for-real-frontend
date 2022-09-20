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
            <input id="google-autocomplete" size='50' type="text" placeholder='Search by city/town...'/>
        </div>
    );
}

export default LocationSearch;

