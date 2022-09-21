import React, {useState, useEffect} from 'react';
import { useSelector } from 'react-redux';
import styled from 'styled-components';
import {TiDeleteOutline} from 'react-icons/ti';
import {get,destroy} from '../lib/api';

function Comment({comment, handleCommentDisplay}) {
    const {username} = useSelector((state) => state.user);
    const[commentDetails, setCommentDetails] = useState();


    useEffect(()=>{
        get(`/comments/${comment.id}`)
            .then(res=> res.json()).then(setCommentDetails);
    },[]);

    function handleDeleteComment(){
        destroy(`/comments/${comment.id}`).then(() => handleCommentDisplay(comment.id));
    }

    if(commentDetails === undefined){
        return (
            <div>Loading...</div>
        );
    }

    return (
        <CommentWrapper>
            <CommentUsername>{commentDetails.user.username}</CommentUsername>
            <CommentContent>{commentDetails.content}</CommentContent>
            {(username === commentDetails.user.username)?<DeleteButton onClick={handleDeleteComment}><TiDeleteOutline fontSize={14}/></DeleteButton> : null}
        </CommentWrapper>
    );
}

export default Comment;

const CommentWrapper = styled.div`
    display: flex;
    flex-direction: row;
    justify-content:start;
`;

const CommentUsername = styled.h5`
    padding-left: 10px;
    padding-right: 5px;
    margin: 0;
`;

const CommentContent = styled.h5`
    font-weight: normal;
    margin: 0;
    margin-bottom: 3px;
`;

const DeleteButton = styled.button`
    border: none;
    background: #f3f3fc;
    cursor: pointer;
`;