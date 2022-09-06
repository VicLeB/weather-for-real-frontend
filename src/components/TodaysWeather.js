import React from 'react';

function TodaysWeather({locationData, handleDegreeType, fahrenheit}) {


    function handleTempClick(){
        handleDegreeType(fahrenheit);
    }

    if (locationData === undefined){
        return(<div>
            <h1>Search for location</h1>
        </div>
        );
    }

    return (
        <div>
            <h4>Current Weather for {locationData.location.name} {locationData.location.region} {locationData.location.country}</h4>
            <button onClick={handleTempClick}>{fahrenheit? '°F' : '°C'}</button>
            <figure>
                <img src={locationData.current.condition.icon}/>
                <figcaption>{locationData.current.condition.text}</figcaption>
            </figure>
            <p>{fahrenheit? `${locationData.current.temp_f}°F` : `${locationData.current.temp_c}°C`}</p>
            <p>Feels like: {fahrenheit? `${locationData.current.feelslike_f}°F` : `${locationData.current.feelslike_c}°C`}</p>
            <p>Wind: {fahrenheit? `${locationData.current.wind_mph} mph`:`${locationData.current.wind_kph} kph`}</p>
        </div>
    );
}

export default TodaysWeather;