import React, {useState, useEffect} from 'react';
import LocationSearch from '../components/LocationSearch';
import TodaysWeather from '../components/TodaysWeather';
import ForecastContainer from '../components/ForecastContainer';
import './Home.css';
import { useSelector } from 'react-redux';
import useFetchAuth from '../lib/useFetchAuth';

function Home({currentUser}) {
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

    if (locationData === undefined){
        return(<div>
            <h1>Search for location</h1>
        </div>
        );
    }

    return (
        <div className='homepage'>
            <div id='todaysWeather'>
                <TodaysWeather locationData= {locationData} handleDegreeType={handleDegreeType} fahrenheit={fahrenheit}/>
            </div>
            <div id='fiveDayForecast'>
                <ForecastContainer locationData = {locationData} fahrenheit={fahrenheit}/>
            </div>
            <div id='welcomeSearch'>
                <h1>Welcome {currentUser? currentUser.username: null}!</h1>
                <LocationSearch/>
            </div>
        </div>
    );
}

export default Home;