import React, {useState, useEffect} from 'react';
import LocationSearch from '../components/LocationSearch';
import TodaysWeather from '../components/TodaysWeather';
import ForecastContainer from '../components/ForecastContainer';
import PostFeed from '../components/PostFeed';
import './Home.css';
import styled from 'styled-components';
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
        if (!loggedIn) {
            navigator.geolocation.getCurrentPosition((position) => {
                const {latitude, longitude} = position.coords;
                const geolocation = `${latitude} ${longitude}`;
                fetch(`${ENDPOINT}/geolocation?location=${geolocation}`)
                    .then(res => res.json())
                    .then((geolocationData) => setLocationData(geolocationData));
            });
        }
    }, [loggedIn]);

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
                <FeedPosts>
                    <div id='searchPrompt'>
                        <h2>What&apos;s the Weather like in...</h2>
                    </div>
                    <div id='welcomeSearch'>
                        <LocationSearch handleLocationSearch={handleLocationSearch}/>
                    </div>
                    {locationData ?
                        <div>
                            <PostFeed locationData ={locationData} loggedIn={loggedIn}/>
                        </div> : null
                    }
                </FeedPosts>
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
    position: fixed;
    flex-direction: column;
    width: 40vw;
`;

const FeedPosts = styled.div`
    display: flex;
    flex-direction: column;
    align-content: center;
    width: 100%;
`;

const RightHomePage = styled.div`
    position: absolute;
    right: 20%;
`;
