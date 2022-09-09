import React from 'react';
import styled from 'styled-components';

const ENDPOINT = process.env.NODE_ENV === 'production' ? 'https://weather-for-real.herokuapp.com/' : 'http://localhost:3000';

function Post({postData}) {
    return (
        <PostContainer>
            <PostTop>
                <h3>{postData.title}</h3>
                <h4>{postData.location}</h4>
            </PostTop>
            <UserName>Submitted by: {postData.user.username}</UserName>
            <ImageWrapper>
                <Image src={`${ENDPOINT}/${postData.image.url}`}/>
            </ImageWrapper>
            <h4>{postData.caption}</h4>
            <h5>{postData.date}</h5>
        </PostContainer>
    );
}

export default Post;

const PostContainer = styled.div`
    display: flex;
    flex-direction: column;
    align-content: center;
    max-height: 800px;
    max-width: 400px;
    border: 1px solid black;
    border-radius: 7px;
    margin-bottom: 3%;
`;

const ImageWrapper = styled.div`
    padding-bottom: 100%;
    position: relative;
    width: 100%;
`;

const Image = styled.img`
    position: absolute;
    top: 0px;
    left: 0px;
    width: 100%;
    height: 100%;
    object-fit: cover;
    object-position: 50% 50%;
`;

const PostTop = styled.div`
    display: flex;
    flex-direction: row;
    justify-content: space-around;
    margin-bottom: 0;
`;

const UserName = styled.h5`
    text-align: left;
    margin: 0;
    padding-left: 5px;
`;

