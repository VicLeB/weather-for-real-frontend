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
                <InputWrapper>
                    <p>Click for {checked? '°C': '°F'}</p>
                    <Input type='checkbox' checked={checked} onChange={handleTempClick}/>
                    <Switch/>
                </InputWrapper>
                <FocusedDetails>
                    <figure>
                        <img src={current?.condition.icon}/>
                        <figcaption>{current?.condition.text}</figcaption>
                    </figure>
                    <CurrentTemp>{fahrenheit? `${current?.temp_f}°F` : `${current?.temp_c}°C`}</CurrentTemp>
                </FocusedDetails>
                <TodaysDetails>
                    <p>Feels like {fahrenheit? `${current?.feelslike_f}°F` : `${current?.feelslike_c}°C`}</p>
                    <p><BsWind/> {fahrenheit? `${current?.wind_mph} mph`:`${current?.wind_kph} kph`}</p>
                </TodaysDetails>
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
    width: 30%;
`;

const InputWrapper = styled.label`
    position: relative;
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    width: 20%;
    padding-left: 10px;
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
    align-self: center;
    cursor: pointer;
    width: 45px;
    height: 20px;
    background: #bfbfbf;
    border-radius: 100px;
    transition: background-color 0.2s, box-shadow 0.2s;

    &:before{
        content: '';
        position: absolute;
        width: 16px;
        height: 16px;
        border-radius: 21px;
        top: 2px;
        left: 2px;
        background: #fff;
        transition: 0.2s;
        box-shadow: 0 2px 4px 0 rgba(0, 35, 11, 0.2);
    }
    `;
