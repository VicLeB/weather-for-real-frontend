import React from 'react';

function ForecastDay({forecastDay, fahrenheit}) {

    return (
        <div>
            <h5>{forecastDay.date}</h5>
            <figure>
                <img src={forecastDay.day.condition.icon}/>
                <figcaption>{forecastDay.day.condition.text}</figcaption>
            </figure>
            <h6>high/low:{fahrenheit? `${forecastDay.day.maxtemp_f}°F/ ${forecastDay.day.mintemp_f}°F` : `${forecastDay.day.maxtemp_c}°C/ ${forecastDay.day.mintemp_c}°C` }</h6>
            <h5>🌧 {forecastDay.day.daily_chance_of_rain}%</h5>
        </div>
    );
}

export default ForecastDay;