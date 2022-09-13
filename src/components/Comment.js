import React, {useState, useEffect} from 'react';
const ENDPOINT = process.env.NODE_ENV === 'production' ? 'https://weather-for-real.herokuapp.com/' : 'http://localhost:3000';
import { useSelector } from 'react-redux';

function Comment({comment, handleCommentDisplay}) {
    const {username} = useSelector((state) => state.user);
    const[commentDetails, setCommentDetails] = useState();


    useEffect(()=>{
        fetch(`${ENDPOINT}/comments/${comment.id}`)
            .then(res=> res.json()).then(setCommentDetails);
    },[]);

    function handleDeleteComment(){
        fetch(`${ENDPOINT}/comments/${comment.id}`,{
            method: 'DELETE',
            headers: {
                Authorization: `Bearer ${localStorage.getItem('token')}`
            }
        }).then(() => handleCommentDisplay(comment.id));
    }

    if(commentDetails === undefined){
        return (
            <div>Loading...</div>
        );
    }

    return (
        <div>
            <h6>{commentDetails.user.username}</h6>
            <p>{commentDetails.content}</p>
            {(username === commentDetails.user.username)?<button onClick={handleDeleteComment}>x</button> : null}
        </div>
    );
}

export default Comment;