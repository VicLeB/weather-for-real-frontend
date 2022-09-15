import React, {useState} from 'react';
import styled from 'styled-components';
import { useSelector } from 'react-redux';
import Comment from './Comment';
import {FaRegComment} from 'react-icons/fa';


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
                <PostTitle>{postData.title}</PostTitle>
                <PostLocation>{postData.location}</PostLocation>
            </PostTop>
            <ImageWrapper>
                <Image src={`${ENDPOINT}/${postData.image.url}`}/>
            </ImageWrapper>
            <CommentButton onClick={handleAddCommentClick}><FaRegComment fontSize={20}/></CommentButton>
            <UserCaptionWrapper>
                <UserName>{postData.user.username} </UserName>
                <Caption>{postData.caption}</Caption>
            </UserCaptionWrapper>
            {writeComment? <>
                <WriteACommentForm onSubmit={handleAddComment}>
                    <CommentTextArea value={comment} onChange={(e)=> setComment(e.target.value)} placeholder={userData.isLoggedIn?'Add a comment...' : 'Login to add a comment...'}/>
                    {userData.isLoggedIn? <PostCommentButton type='submit'>Post</PostCommentButton>: null}
                </WriteACommentForm>
            </>:null}
            <CommentListContainer>
                {commentsList}
            </CommentListContainer>
            <DateTime>{postData.date}</DateTime>
        </PostContainer>
    );
}



export default Post;

const CommentButton = styled.button`
    align-self: flex-start;
    background: #f3f3fc;
    border-radius: 50%;
    border: none;
    cursor: pointer;
    padding-top: 15px;
    padding-left: 10px;
`;

const PostContainer = styled.div`
    display: flex;
    flex-direction: column;
    align-content: center;
    max-height: 800px;
    max-width: 30vw;
    min-width: 30vw;
    border: none;
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

const PostTitle = styled.h3`
    font-weight: normal;
`;

const PostLocation = styled.h4`
    font-weight: normal;
`;
const UserCaptionWrapper= styled.div`
    display: flex;
    flex-direction: row;
    padding: 5px;
`;

const UserName = styled.h5`
    text-align: left;
    padding-left: 5px;
    padding-right: 5px;
    margin: 0;
`;

const Caption = styled.h5`
    font-weight: normal;
    margin: 0;
`;

const DateTime = styled.h5`
    font-weight: normal;
    text-align: left;
    padding-left: 10px;
`;

const CommentTextArea = styled.textarea`
    resize: none;
    border: none;
    border-radius: 5px;
    width: 80%
`;

const CommentListContainer = styled.div`
    display: flex;
    flex-direction: column;
    overflow-y: scroll;
    height: 40px;
`;

const WriteACommentForm = styled.form`
    display: flex;
    flex-direction: row;
`;

const PostCommentButton = styled.button`
    border: none;
    border-top-right-radius: 5px;
    border-bottom-right-radius: 5px;
    background-color: white;
    cursor: pointer;

    &:hover {
        color: #256ce1;
    }
`;


