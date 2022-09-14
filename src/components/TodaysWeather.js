import React, {useState} from 'react';
import styled from 'styled-components';

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
            <InputWrapper>
                <p>Switch temperature to {checked? '°C': '°F'}</p>
                <Input type='checkbox' checked={checked} onChange={handleTempClick}/>
                <Switch/>
            </InputWrapper>
            <figure>
                <img src={current?.condition.icon}/>
                <figcaption>{current?.condition.text}</figcaption>
            </figure>
            <p>{fahrenheit? `${current?.temp_f}°F` : `${current?.temp_c}°C`}</p>
            <p>Feels like: {fahrenheit? `${current?.feelslike_f}°F` : `${current?.feelslike_c}°C`}</p>
            <p>Wind: {fahrenheit? `${current?.wind_mph} mph`:`${current?.wind_kph} kph`}</p>
        </div>
    );
}

export default TodaysWeather;

const InputWrapper = styled.label`
    position: relative;

`;

const Input = styled.input`
        position: absolute;
        left: -9999px;
        top: -9999px;

        &:checked + span {
            background-color: #1890ff;

            &:before {
                left: 27px;
            }
        }

        &:focus + span{
            box-shadow: 0 0 0 4px rgba(0, 0, 0, 0.1);
        }

        &:focus:checked + span {
            box-shadow: 0 0 0 4px rgba(24, 144, 255, 0.2);
        }
    `;

const Switch = styled.span`
    display: flex;
    position: relative;
    cursor: pointer;
    width: 50px;
    height: 25px;
    background: #bfbfbf;
    border-radius: 100px;
    transition: background-color 0.2s, box-shadow 0.2s;

    &:before{
        content: '';
        position: absolute;
        width: 21px;
        height: 21px;
        border-radius: 21px;
        top: 2px;
        left: 2px;
        background: #fff;
        transition: 0.2s;
        box-shadow: 0 2px 4px 0 rgba(0, 35, 11, 0.2);
    }
    `;
