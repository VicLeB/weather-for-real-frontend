import React from 'react';
import LocationSearch from '../components/LocationSearch';
import TodaysWeather from '../components/TodaysWeather';
import './Home.css';

function Home({currentUser}) {
    return (
        <div className='homepage'>
            <div id='todaysWeather'>
                <TodaysWeather/>
            </div>
            <div id='welcomeSearch'>
                <h1>Welcome {currentUser? currentUser.username: null}!</h1>
                <LocationSearch/>
            </div>
        </div>
    );
}

export default Home;