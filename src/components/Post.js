import React, {useState} from 'react';
import styled from 'styled-components';
import { useSelector } from 'react-redux';
import Comment from './Comment';

const ENDPOINT = process.env.NODE_ENV === 'production' ? 'https://weather-for-real.herokuapp.com/' : 'http://localhost:3000';

function Post({postData}) {
    const [writeComment, setWriteComment] = useState(false);
    const [comment, setComment] = useState('');
    const userData = useSelector((state) => state.user);
    const [postComments, setPostComments] = useState(postData.comments);

    const newCommentData ={
        content: comment,
        user_id: userData.id,
        post_id: postData.id
    };

    function handleAddCommentClick(){
        setWriteComment(!writeComment);
    }

    function handleAddComment(e){
        e.preventDefault();
        fetch(`${ENDPOINT}/comments`,{
            method:'POST',
            headers:{
                Authorization: `Bearer ${localStorage.getItem('token')}`,
                'Content-Type': 'application/json',
                Accepts: 'application/json'
            },
            body: JSON.stringify(newCommentData)
        }).then((res)=>{
            if(res.ok){
                res.json().then((addedComment)=>{
                    handleAllCommentsList(addedComment);
                    setWriteComment(!writeComment);
                });
            }else{
                res.json().then(console.error);
            }
        });
    }


    function handleCommentDisplay(deletedCommentId){
        setPostComments(postComments.filter((comment)=>(comment.id !== deletedCommentId)));
    }

    function handleAllCommentsList(addedComment){
        setPostComments([...postComments, addedComment]);
    }


    const commentsList = postComments.map((comment)=> {
        return <Comment key={comment.id} comment={comment} handleCommentDisplay={handleCommentDisplay}/>;
    });

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
            <button onClick={handleAddCommentClick}>Add a comment</button>
            {writeComment? <>
                <form onSubmit={handleAddComment}>
                    <textarea value={comment} onChange={(e)=> setComment(e.target.value)} placeholder={userData.isLoggedIn?'Add a comment...' : 'Login to add a comment...'}/>
                    {userData.isLoggedIn? <button type='submit'>Post</button>: null}
                </form>
            </>:null}
            {commentsList}
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
    min-width: 400px;
    border: 1px solid black;
    border-radius: 7px;
    margin-bottom: 3%;
    background-color: #f3f3fc;
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

