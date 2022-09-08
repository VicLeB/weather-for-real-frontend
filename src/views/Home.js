import React, {useState, useEffect} from 'react';
import LocationSearch from '../components/LocationSearch';
import TodaysWeather from '../components/TodaysWeather';
import ForecastContainer from '../components/ForecastContainer';
import './Home.css';
import styled from 'styled-components';
import { useSelector } from 'react-redux';
import useFetchAuth from '../lib/useFetchAuth';

function Home() {
    const userData = useSelector((state) => state.user);
    const [ locationData, setLocationData ] = useState();
    const [ fahrenheit, setFahrenheit ] = useState(true);
    const [latitude, setLatitude] = useState();
    const [longitude, setLogitude] = useState();
    const loggedIn = userData.isLoggedIn;
    const ENDPOINT = process.env.NODE_ENV === 'production' ? 'https://weather-for-real.herokuapp.com/' : 'http://localhost:3000';
    const fetchWeather = useFetchAuth('/saved_user_weather_current');

    navigator.geolocation.getCurrentPosition((position) => {
        setLatitude(position.coords.latitude);
        setLogitude(position.coords.longitude);
    });

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

        if (loggedIn === false && latitude && longitude){
            const geolocation = `${latitude} ${longitude}`;
            fetch(`${ENDPOINT}/geolocation?location=${geolocation}`)
                .then(res => res.json())
                .then((geolocationData) => setLocationData(geolocationData));
        }

    }, [loggedIn, latitude, longitude]);


    function handleLocationSearch(searchLocation){
        fetch(`${ENDPOINT}/search_result_weather/${searchLocation}`)
            .then(res => res.json())
            .then((searchData) => setLocationData(searchData));
    }

    function handleDegreeType(){
        setFahrenheit(!fahrenheit);
    }

    return (
        <HomeViewWrapper>
            <LeftHomePage>
                <div id='todaysWeather'>
                    <TodaysWeather locationData={locationData} handleDegreeType={handleDegreeType} fahrenheit={fahrenheit}/>
                </div>
                <div id='fiveDayForecast'>
                    <ForecastContainer locationData={locationData} fahrenheit={fahrenheit}/>
                </div>
            </LeftHomePage>
            <RightHomePage>
                <div id='searchPrompt'>
                    <h1>Search by your location</h1>
                </div>
                <div id='welcomeSearch'>
                    <h1>Welcome!</h1>
                    <LocationSearch handleLocationSearch={handleLocationSearch}/>
                </div>
            </RightHomePage>
        </HomeViewWrapper>
    );
}

export default Home;

const HomeViewWrapper = styled.div`
    display: flex;
    height: 100vh;
    width: 100vw;
`;

const LeftHomePage = styled.div`
    display: flex;
    flex-direction: column;
    width: 60%;
`;

const RightHomePage = styled.div`
display: flex;
flex-direction: column;
align-content: center;
width: 100%;
`;
