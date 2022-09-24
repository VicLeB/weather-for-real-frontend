import React, {useState} from 'react';
import styled from 'styled-components';
import {BsWind} from 'react-icons/bs';

function TodaysWeather({locationData, handleDegreeType, fahrenheit}) {
    const [checked, setChecked]= useState(true);


    function handleTempClick(){
        setChecked(!checked);
        handleDegreeType(fahrenheit);
    }

    if (locationData === undefined){
        return(<div>
            <h1>Search for Current weather in your area</h1>
        </div>
        );
    }

    const {
        location,
        current,
    } = locationData;

    return (
        <div>
            <h4>Current Weather for {location?.name} {location?.region} {location?.country}</h4>
            <TodaysWeatherWrapper>
                <FocusedDetails>
                    <figure>
                        <img src={current?.condition.icon}/>
                        <figcaption>{current?.condition.text}</figcaption>
                    </figure>
                    <CurrentTemp>{fahrenheit? `${current?.temp_f}°F` : `${current?.temp_c}°C`}</CurrentTemp>
                </FocusedDetails>
                <TodaysDetails>
                    <FeelsLike>Feels like {fahrenheit? `${current?.feelslike_f}°F` : `${current?.feelslike_c}°C`}</FeelsLike>
                    <WindInfo><BsWind fontSize={20}/> {fahrenheit? `${current?.wind_mph} mph`:`${current?.wind_kph} kph`}</WindInfo>
                </TodaysDetails>
                <InputWrapper>
                    <Input type='checkbox' checked={checked} onChange={handleTempClick}/>
                    <Switch/>
                    <SwitchText fahrenheit={fahrenheit} checked={checked} />
                </InputWrapper>
            </TodaysWeatherWrapper>
        </div>
    );
}

export default TodaysWeather;

const TodaysWeatherWrapper = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    margin-bottom: 40px;
`;

const FocusedDetails = styled.div`
    display: flex;
    flex-direction: row;
    align-items: center;
`;


const CurrentTemp = styled.h2`
    font-size: 45px;
    font-weight: normal;

    `;

const TodaysDetails = styled.div`
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    align-items: center;
    width: 30%;
    `;

const FeelsLike = styled.h5`
        font-weight: normal;
    `;

const WindInfo = styled.h5`
    font-weight: normal;
    display: flex;
    flex-direction: row;
    align-items: center;
`;

const InputWrapper = styled.label`
    --width: 70px;
    --height: calc(var(--width) / 3);

    position: relative;
    display: inline-block;
    width: var(--width);
    height: var(--height);
    box-shadow: 0px 1px 3px rgba(0, 0, 0, 0.3);
    border-radius: var(--height);
    cursor: pointer;
`;

const Input = styled.input`
    display: none;

    &:checked + span{
        background-color: #256ce1;

        &:before{
            transform: translateX(calc(var(--width) - var(--height)));
        }
    }
`;

const Switch = styled.span`
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    border-radius: var(--height);
    background-color: #ccc;
    transition: all 0.4s ease-in-out;

    &:before{
        content: '';
        position: absolute;
        top: 0;
        left: 0;
        width: calc(var(--height));
        height: calc(var(--height));
        border-radius: calc(var(--height) / 2);
        background-color: #fff;
        box-shadow: 0px 1px 3px rgba(0, 0, 0, 0.3);
        transition: all 0.4s ease-in-out;
    }
`;

const SwitchText = styled.span`
    position: absolute;
    top: 8px;
    left: 0;
    width: 100%;
    height: 100%;
    font-size: 12px;
    font-family: sans-serif;
    transition: all 0.4s ease-in-out;

    &:after{
        content: '${props => props.fahrenheit ? '°F' : null}';
        position: absolute;
        right: 5px;
        color: #4d4d4d;
        opacity: ${props => props.checked ? 1 : 0};
        text-shadow: 1px 1px 2px rgba(0, 0, 0, 0.4);
        transition: all 0.4s ease-in-out;
    }

    &:before{
        content: '${props => props.fahrenheit ? null : '°C'}';
        position: absolute;
        left: 5px;
        color: #4D4D4D;
        opacity: ${props => props.checked ? 0 : 1};
        text-shadow: 1px 1px 2px rgba(255, 255, 255, 0.4);
        transition: all 0.4s ease-in-out;
    }
`;
