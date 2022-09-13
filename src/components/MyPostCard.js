import React, {useState} from 'react';
import styled from 'styled-components';
import { useSelector } from 'react-redux';
const ENDPOINT = process.env.NODE_ENV === 'production' ? 'https://weather-for-real.herokuapp.com/' : 'http://localhost:3000';


function MyPostCard({post, handleEditPost, handleDeletePost}) {
    const userData = useSelector((state) => state.user);
    const [editPost, setEditPost] = useState(false);
    const [title, setTitle] = useState('');
    const [caption, setCaption] = useState('');
    const [writeComment, setWriteComment] = useState(false);
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


    return (
        <PostContainer>
            <ButtonContainer>
                <EditDeleteButton onClick={handlePostDelete}>X</EditDeleteButton>
                <EditDeleteButton onClick={handleEditClick}>Edit</EditDeleteButton>
            </ButtonContainer>
            {editPost? (
                <>
                    <PostTop>
                        <input type='text' placeholder={post.title} value={title} onChange={(e)=> setTitle(e.target.value)}/>
                        <h4>{post.location}</h4>
                    </PostTop>
                    <ImageWrapper>
                        <Image src={`${ENDPOINT}/${post.image.url}`}/>
                    </ImageWrapper>
                    <UserName>Submitted by: {userData.username}</UserName>
                    <input type='text' placeholder={post.caption} value={caption} onChange={(e)=> setCaption(e.target.value)}/>
                    <SaveButtonWrapper>
                        <EditDeleteButton onClick={handleSaveChanges}>Save Changes</EditDeleteButton>
                    </SaveButtonWrapper>
                    <h5>{post.date}</h5>
                </>
            ):(
                <>
                    <PostTop>
                        <h3>{post.title}</h3>
                        <h4>{post.location}</h4>
                    </PostTop>
                    <ImageWrapper>
                        <Image src={`${ENDPOINT}/${post.image.url}`}/>
                    </ImageWrapper>
                    <UserName>Submitted by: {userData.username}</UserName>
                    <h4>{post.caption}</h4>
                    <h5>{post.date}</h5>
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
    max-width: 400px;
    min-width: 400px;
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

const ButtonContainer = styled.div`
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    padding: 5px;
`;

const EditDeleteButton = styled.button`
    background: #256ce1;
    color: #fff;
    border-radius: 4px;
    border: none;
    outline: none;
    padding: 5px 10px;
    cursor: pointer;
`;

const SaveButtonWrapper = styled.div`
    display: flex;
    flex-direction: row;
    justify-content: center;
    margin-top: 6px;
`;