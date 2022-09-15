import React, {useState} from 'react';
import styled from 'styled-components';
import { useSelector } from 'react-redux';
import Comment from './Comment';
import {FaTrashAlt} from 'react-icons/fa';
const ENDPOINT = process.env.NODE_ENV === 'production' ? 'https://weather-for-real.herokuapp.com/' : 'http://localhost:3000';


function MyPostCard({post, handleEditPost, handleDeletePost}) {
    const userData = useSelector((state) => state.user);
    const [editPost, setEditPost] = useState(false);
    const [title, setTitle] = useState('');
    const [caption, setCaption] = useState('');
    const [writeComment, setWriteComment] = useState(false);
    const [postComments, setPostComments] = useState(post.comments);
    const ENDPOINT = process.env.NODE_ENV === 'production' ? 'https://weather-for-real.herokuapp.com/' : 'http://localhost:3000';


    function handleEditClick(){
        setEditPost(!editPost);
    }

    function handleSaveChanges(){
        fetch(`${ENDPOINT}/posts/${post.id}`,{
            method: 'PATCH',
            headers: {
                Authorization: `Bearer ${localStorage.getItem('token')}`,
                'Content-Type': 'application/json',
                Accept: 'application/json',
            },
            body:JSON.stringify({
                title: title || post.title,
                caption: caption || post.caption
            }),
        }).then((res)=>{
            if(res.ok){
                res.json().then((editedPost)=>{
                    handleEditPost(editedPost);
                    setEditPost(!editPost);
                });
            }else{
                res.json().then(console.error);
            }
        });
    }

    function handlePostDelete(){
        fetch(`${ENDPOINT}/posts/${post.id}`,{
            method: 'DELETE',
            headers: {
                Authorization: `Bearer ${localStorage.getItem('token')}`
            }
        }).then(() => handleDeletePost(post.id));
    }

    const commentsList = postComments.map((comment)=> {
        return <Comment key={comment.id} comment={comment} />;
    });


    return (
        <PostContainer>
            <ButtonContainer>
                <EditDeleteButton onClick={handlePostDelete}><FaTrashAlt fontSize={18}/></EditDeleteButton>
                <EditDeleteButton onClick={handleEditClick}>Edit</EditDeleteButton>
            </ButtonContainer>
            {editPost? (
                <>
                    <PostTop>
                        <TitleInput type='text' placeholder={post.title} value={title} onChange={(e)=> setTitle(e.target.value)}/>
                        <PostLocation>{post.location}</PostLocation>
                    </PostTop>
                    <ImageWrapper>
                        <Image src={`${ENDPOINT}/${post.image.url}`}/>
                    </ImageWrapper>
                    <UserCaptionWrapper>
                        <UserName>{userData.username}</UserName>
                        <CaptionInput type='text' placeholder={post.caption} value={caption} onChange={(e)=> setCaption(e.target.value)}/>
                    </UserCaptionWrapper>
                    <SaveButtonWrapper>
                        <SaveChangesButton onClick={handleSaveChanges}>Save Changes</SaveChangesButton>
                    </SaveButtonWrapper>
                    <CommentListContainer>
                        {commentsList}
                    </CommentListContainer>
                    <DateTime>{post.date}</DateTime>
                </>
            ):(
                <>
                    <PostTop>
                        <PostTitle>{post.title}</PostTitle>
                        <PostLocation>{post.location}</PostLocation>
                    </PostTop>
                    <ImageWrapper>
                        <Image src={`${ENDPOINT}/${post.image.url}`}/>
                    </ImageWrapper>
                    <UserCaptionWrapper>
                        <UserName>{userData.username}</UserName>
                        <Caption>{post.caption}</Caption>
                    </UserCaptionWrapper>
                    <CommentListContainer>
                        {commentsList}
                    </CommentListContainer>
                    <DateTime>{post.date}</DateTime>
                </>
            )}
        </PostContainer>
    );
}

export default MyPostCard;

const PostContainer = styled.div`
    display: flex;
    flex-direction: column;
    align-content: center;
    max-height: 800px;
    max-width: 25vw;
    min-width: 25vw;
    border: none;
    border-radius: 7px;
    margin-bottom: 3%;
    margin-left: 1%;
    background-color: #f3f3fc;
`;

const ImageWrapper = styled.div`
    padding-bottom: 100%;
    position: relative;
    width: 100%;
    margin-bottom: 5px;
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
    margin-bottom: 3px;
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

const CommentListContainer = styled.div`
    display: flex;
    flex-direction: column;
    overflow-y: scroll;
    height: 40px;
`;

const DateTime = styled.h5`
    font-weight: normal;
    text-align: left;
    padding-left: 10px;
`;


const ButtonContainer = styled.div`
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    padding: 5px;
`;

const EditDeleteButton = styled.button`
    background: #f3f3fc;
    color: black;
    font-weight: bold;
    border-radius: 4px;
    border: none;
    outline: none;
    padding: 5px 10px;
    cursor: pointer;

    &:hover{
        color: #256ce1;
    }
`;

const SaveChangesButton = styled.button`
    background: #256ce1;
    color: #fff;
    font-weight: normal;
    border-radius: 4px;
    border: none;
    outline: none;
    padding: 5px 10px;
    cursor: pointer;

    &:hover{
        background: #fff;
        color: #256ce1;
    }
`;

const SaveButtonWrapper = styled.div`
    display: flex;
    flex-direction: row;
    justify-content: end;
    margin-top: 6px;
    margin-right: 10px;
`;

const TitleInput = styled.input`
    border: none;
    border-radius: 5px;
    height: 50%;
    margin-top: 10px;
`;

const CaptionInput = styled.input`
    width: 80%;
    border: none;
    border-radius: 5px;
`;