import React, {useState} from 'react';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import {
    StyledForm,
    StyledInput,
    StyledButton,
    StyledFormWrapper,
    StyledSelectBox,
    FileUploadBox
} from '../styles/Form.style';

function CreateNewPostForm() {
    const userData = useSelector((state) => state.user);
    const [title, setTitle] = useState('');
    const [caption, setCaption]= useState('');
    const [imageFile, setImageFile]= useState();
    const [city, setCity]= useState('');
    const [stateProvince, setStateProvince] = useState('');
    const [country, setCountry]= useState('USA');
    const today = new Date();
    const date =`${today.getMonth() + 1}-${today.getDate()}-${today.getFullYear()}`;
    const time = today.getHours() > 12? `${today.getHours() - 12}:${today.getMinutes()}`: `${today.getHours()}:${today.getMinutes()}`;
    const amPm = today.getHours() > 12? 'PM' : 'AM';
    const dateTime = `${date} ${time} ${amPm}`;
    const navigate = useNavigate();



    const ENDPOINT = process.env.NODE_ENV === 'production' ? 'https://weather-for-real.herokuapp.com/' : 'http://localhost:3000';
    const stateOrProvince = ['AL','AK','AS','AZ','AR','CA','CO','CT','DE','DC','FM','FL','GA','GU','HI','ID','IL','IN','IA','KS','KY','LA','ME','MH','MD','MA','MI','MN','MS','MO','MT','NE','NV','NH','NJ','NM','NY','NC','ND','MP','OH','OK','OR','PW','PA','PR','RI','SC','SD','TN','TX','UT','VT','VI','VA','WA','WV','WI','WY','AB','BC','MB','NB','NL','NS','NT','NU','ON','PE','QC','SK','YT'];

    function handleImageChange(e){
        setImageFile(e.target.files[0]);
    }

    function handleNewPost(e){
        e.preventDefault();
        const location = `${city}, ${stateProvince}, ${country}`;
        const formData = new FormData();
        formData.append('image', imageFile);
        formData.append('title', title);
        formData.append('caption', caption);
        formData.append('location', location);
        formData.append('user_id', userData.id);
        formData.append('date', dateTime);

        fetch(`${ENDPOINT}/posts`,{
            method: 'POST',
            headers:{
                Authorization: `Bearer ${localStorage.getItem('token')}`,
                Accepts: 'application/json'
            },
            body: formData
        })
            .then(() => {
                setTimeout(() => navigate('/'), 100);
            })
            .catch(error=>console.log(error));
    }

    return (
        <div>
            <h1>Create your Real Weather Post </h1>
            <StyledFormWrapper>
                <StyledForm onSubmit={handleNewPost}>
                    <label>
                    Title
                        <StyledInput type='text' value={title} onChange={(e)=> setTitle(e.target.value)}/>
                    </label>
                    <label>
                    Caption
                        <StyledInput type='text' value={caption} onChange={(e)=> setCaption(e.target.value)}/>
                    </label>
                    <label>
                    Upload your image
                        <FileUploadBox>
                            <input type='file' accept='image/*' name='image' onChange={handleImageChange}/>
                        </FileUploadBox>
                    </label>
                    <label>
                    City
                        <StyledInput type='text' value={city} onChange={(e)=> setCity(e.target.value)}/>
                    </label>
                    <StyledSelectBox>
                        <label>
                            State/Province
                            <select type='text' onChange={(e)=> setStateProvince(e.target.value)}>
                                {stateOrProvince.map((stateProv)=> <option key ={stateProv} value={stateProv}>{stateProv}</option>)}
                            </select>
                        </label>
                        <label>
                            Country
                            <select type='text' value={country} onChange={(e)=> setCountry(e.target.value)}>
                                <option value={'USA'}>USA</option>
                                <option value={'CANADA'}>Canada</option>
                            </select>
                        </label>
                    </StyledSelectBox>
                    <StyledButton type='submit' >Submit</StyledButton>
                </StyledForm>
            </StyledFormWrapper>
        </div>
    );
}

export default CreateNewPostForm;