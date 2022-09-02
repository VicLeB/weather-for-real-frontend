import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import useFetchAuth from '../lib/useFetchAuth';

function TodaysWeather() {
    const userData = useSelector((state) => state.user);
    const [ locationData, setLocationData ] = useState();
    const [ fahrenheit, setFahrenheit ] = useState(true);
    const loggedIn = userData.isLoggedIn;
    const fetchWeather = useFetchAuth('/saved_user_weather_current');

    useEffect(() => {
        async function fetchData() {
            try {
                const data = await fetchWeather();
                const jsonData = await data.json();
                setLocationData(jsonData);
            } catch (e) {
                console.error(e);
            }
        }

        if(loggedIn){
            fetchData();
        }
    }, [loggedIn]);

    function handleDegreeType(){
        setFahrenheit(!fahrenheit);
    }

    console.log(locationData);

    if (locationData === undefined){
        return(<div>
            <h1>Search for location</h1>
        </div>
        );
    }

    return (
        <div>
            <h2>Current Weather for {locationData.location.name},{locationData.location.region}</h2>
            <button onClick={handleDegreeType}>{fahrenheit? '°F' : '°C'}</button>
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