import React from 'react';
import ForecastDay from './ForecastDay';

function ForecastContainer({locationData, fahrenheit}) {

    if (locationData === undefined){
        return(<div>
            <h3>Your five day forecast</h3>
        </div>
        );
    } else {
        const fiveDayForecast= locationData?.forecast?.forecastday;

        const forecastDayList = fiveDayForecast?.map((forecastDay) => {
            return <ForecastDay key={forecastDay.date} forecastDay = {forecastDay} fahrenheit={fahrenheit}/>;
        });

        return (
            <div>
                <h3>Your five day forecast</h3>
                {forecastDayList}
            </div>
        );
    }
}

export default ForecastContainer;