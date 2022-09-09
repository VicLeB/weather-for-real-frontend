import React from 'react';
import styled from 'styled-components';

const ENDPOINT = process.env.NODE_ENV === 'production' ? 'https://weather-for-real.herokuapp.com/' : 'http://localhost:3000';

function Post({postData}) {
    return (
        <PostContainer>
            <h3>{postData.title}</h3>
            <h5>user: {postData.user.username}</h5>
            <ImageWrapper>
                <Image src={`${ENDPOINT}/${postData.image.url}`}/>
            </ImageWrapper>
        </PostContainer>
    );
}

export default Post;

const PostContainer = styled.div`
    display: flex;
    flex-direction: column;
    align-content: center;
    width: 70%;
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

