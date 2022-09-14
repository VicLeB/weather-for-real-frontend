import React from 'react';
import styled from 'styled-components';
import {IoRainyOutline} from 'react-icons/io5';

function ForecastDay({forecastDay, fahrenheit}) {
    // let dateStr = forecastDay.date;

    // function getDayName(dateStr, locale){
    //     let date = new Date(dateStr);
    //     return date.toLocaleDateString(locale, {weekday: 'long'});
    // }

    // let day = getDayName(dateStr, 'en-US');
    // console.log(day);

    return (
        <DayForecastWrapper>
            <Date>{forecastDay.date}</Date>
            <figure>
                <FigureImg src={forecastDay.day.condition.icon}/>
                <FigureCaption>{forecastDay.day.condition.text}</FigureCaption>
            </figure>
            <HighLow>{fahrenheit? `${forecastDay.day.maxtemp_f}°F/ ${forecastDay.day.mintemp_f}°F` : `${forecastDay.day.maxtemp_c}°C/ ${forecastDay.day.mintemp_c}°C` }</HighLow>
            <Precipitation><IoRainyOutline/> {forecastDay.day.daily_chance_of_rain}%</Precipitation>
        </DayForecastWrapper>
    );
}

export default ForecastDay;

const Date = styled.h5`
    font-weight: normal;
`;

const Precipitation = styled.h5`
    font-weight: normal;
`;

const HighLow = styled.h6`
    font-weight: normal;
`;

const FigureImg = styled.img`
    height: 60px;
`;

const FigureCaption = styled.figcaption`
    font-weight: normal;
    font-size: small;
    text-align: center;
`;


const DayForecastWrapper= styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: space-between;
    border-left: 0.5px solid #afc5d4;
    border-right: 0.5px solid #afc5d4;
    border-radius: 5px;
    min-width: 20%;
    max-width: 20%;
    background: rgb(185, 203, 223);
`;



