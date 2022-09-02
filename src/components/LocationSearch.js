import React, {useEffect} from 'react';

function LocationSearch() {
    useEffect(() => {
        const autocomplete = new window.google.maps.places.Autocomplete(document.getElementById('google-autocomplete'), {
            types: ('regions'),
            componentRestrictions: {'country':['US', 'CA']},
            fields: ['place_id','formatted_address']
        });

        autocomplete.addListener('place_changed', () => {
            console.log(autocomplete.getPlace().formatted_address);
        });
    }, []);

    return (
        <div>
            <h1>Location Search Bar</h1>
            <input id="google-autocomplete" type="text" placeholder='Search'/>
        </div>
    );
}

export default LocationSearch;