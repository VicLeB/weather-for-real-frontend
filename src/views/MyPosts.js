import React, {useState, useEffect} from 'react';
import useFetchAuth from '../lib/useFetchAuth';
import styled from 'styled-components';
import { useSelector } from 'react-redux';
import MyPostCard from '../components/MyPostCard';
const ENDPOINT = process.env.NODE_ENV === 'production' ? 'https://weather-for-real.herokuapp.com/' : 'http://localhost:3000';

function MyPosts() {
    const {isLoggedIn, id, username} = useSelector((state) => state.user);
    const [userPosts, setUserPosts] = useState();
    const fetchAuthorized = useFetchAuth('/posts');

    useEffect(()=>{
        if (isLoggedIn) {
            fetchAuthorized()
                .then((res) => res.json())
                .then((data) => {
                    const myPosts = data.filter((post)=> post.user.username === username);
                    setUserPosts(myPosts);
                });
        }
    }, [isLoggedIn]);

    if(userPosts === undefined){
        return(<div>
            <h3>Loading...</h3>
        </div>
        );
    }
    const myPostsList = userPosts.map((post)=>{
        return <MyPostCard key={post.id} post={post} handleDeletePost = {handleDeletePost} handleEditPost={handleEditPost}/>;
    });

    function handleEditPost(editedPost){
        setUserPosts(userPosts.map((post)=>{
            if(post.id === editedPost.id){
                return editedPost;
            } else {
                return post;
            }
        }));
    }

    function handleDeletePost(deletedPostId){
        setUserPosts(userPosts.filter((post)=> (post.id !== deletedPostId)));
    }

    return (
        <>
            <h1>{username}&apos;s Post History</h1>
            <MyPostsWrapper>
                {myPostsList}
            </MyPostsWrapper>
        </>
    );
}

export default MyPosts;

const MyPostsWrapper= styled.div`
    display: flex;
    flex-direction: row;
    overflow-wrap: normal;
    flex-wrap: wrap;
    justify-content: space-around;
`;