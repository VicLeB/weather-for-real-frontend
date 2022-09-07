import React, {useState, useEffect} from 'react';
import LocationSearch from '../components/LocationSearch';
import TodaysWeather from '../components/TodaysWeather';
import ForecastContainer from '../components/ForecastContainer';
import './Home.css';
import { useSelector } from 'react-redux';
import useFetchAuth from '../lib/useFetchAuth';

function Home() {
    const userData = useSelector((state) => state.user);
    const [ locationData, setLocationData ] = useState();
    const [ fahrenheit, setFahrenheit ] = useState(true);
    const loggedIn = userData.isLoggedIn;
    const ENDPOINT = process.env.NODE_ENV === 'production' ? 'https://weather-for-real.herokuapp.com/' : 'http://localhost:3000';
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

        if (loggedIn){
            fetchData();
        }

        if (!loggedIn) {
            setLocationData();
        }
    }, [loggedIn]);


    function handleLocationSearch(searchLocation){
        fetch(`${ENDPOINT}/search_result_weather/${searchLocation}`)
            .then(res => res.json())
            .then((searchData) => setLocationData(searchData));
    }

    function handleDegreeType(){
        setFahrenheit(!fahrenheit);
    }

    return (
        <div className='homepage'>
            <h1>Search by your location</h1>
            <div id='todaysWeather'>
                <TodaysWeather locationData= {locationData} handleDegreeType={handleDegreeType} fahrenheit={fahrenheit}/>
            </div>
            <div id='fiveDayForecast'>
                <ForecastContainer locationData = {locationData} fahrenheit={fahrenheit}/>
            </div>
            <div id='welcomeSearch'>
                <h1>Welcome!</h1>
                <LocationSearch handleLocationSearch={handleLocationSearch}/>
            </div>
        </div>
    );
}

export default Home;