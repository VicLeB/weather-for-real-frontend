import React, {useEffect, useState} from 'react';
import { Link } from 'react-router-dom';
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
            <h3>Future home of post feed</h3>
            {loggedIn?<button><Link to= '/create-post'>Create Post</Link></button>:null}
            {postFeed}
        </div>
    );
}

export default PostFeed;
