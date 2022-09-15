import React from 'react';
import ForecastDay from './ForecastDay';
import styled from 'styled-components';

function ForecastContainer({locationData, fahrenheit}) {

    if (locationData === undefined){
        return(<div>
            <h3>Five Day Forecast</h3>
        </div>
        );
    } else {
        const fiveDayForecast= locationData?.forecast?.forecastday;

        const forecastDayList = fiveDayForecast?.map((forecastDay) => {
            return <ForecastDay key={forecastDay.date} forecastDay = {forecastDay} fahrenheit={fahrenheit}/>;
        });

        return (
            <div>
                <h3>Five Day Forecast</h3>
                <StyledForecastWrapper>
                    {forecastDayList}
                </StyledForecastWrapper>
            </div>
        );
    }
}

export default ForecastContainer;

const StyledForecastWrapper = styled.div`
    display: flex;
    flex-direction: row;
    background: rgb(185, 203, 223, 0.7);
    border-radius: 5px;
    border: none;
    margin-left: 10px;
    min-width: 100%;
`;