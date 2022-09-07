import React from 'react';

function TodaysWeather({locationData, handleDegreeType, fahrenheit}) {


    function handleTempClick(){
        handleDegreeType(fahrenheit);
    }

    if (locationData === undefined){
        return(<div>
            <h1>Search for Current weather in your area</h1>
        </div>
        );
    }

    const {
        location,
        current,
    } = locationData;

    return (
        <div>
            <h4>Current Weather for {location?.name} {location?.region} {location?.country}</h4>
            <button onClick={handleTempClick}>{fahrenheit? '°F' : '°C'}</button>
            <figure>
                <img src={current?.condition.icon}/>
                <figcaption>{current?.condition.text}</figcaption>
            </figure>
            <p>{fahrenheit? `${current?.temp_f}°F` : `${current?.temp_c}°C`}</p>
            <p>Feels like: {fahrenheit? `${current?.feelslike_f}°F` : `${current?.feelslike_c}°C`}</p>
            <p>Wind: {fahrenheit? `${current?.wind_mph} mph`:`${current?.wind_kph} kph`}</p>
        </div>
    );
}

export default TodaysWeather;