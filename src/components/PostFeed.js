import React, {useEffect, useState} from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import Post from './Post';

const ENDPOINT = process.env.NODE_ENV === 'production' ? 'https://weather-for-real.herokuapp.com/' : 'http://localhost:3000';

function PostFeed({loggedIn}) {
    const [postFeedData, setPostFeedData] = useState();

    useEffect(()=>{
        fetch(`${ENDPOINT}/posts`)
            .then(res => res.json())
            .then((data)=> setPostFeedData(data));
    },[]);

    const postFeed = postFeedData?.map((postData)=>{
        return <Post key={postData.id} postData={postData}/>;
    });



    return (
        <div>
            <h3>See weather for real from our users</h3>
            {loggedIn?<button><Link to= '/create-post'>Create Post</Link></button>:null}
            <PostFeedContainer>
                {postFeed}
            </PostFeedContainer>
        </div>
    );
}

export default PostFeed;

const PostFeedContainer= styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    margin-top: 3%;
    overflow: scroll;
`;
