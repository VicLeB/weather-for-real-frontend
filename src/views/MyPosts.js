import React, {useState, useEffect} from 'react'
import useFetchAuth from '../lib/useFetchAuth'
const ENDPOINT = 'http://localhost:3000'

function MyPosts() {
    const [userData, setUserData] = useState('')
    const fetchAuthorized = useFetchAuth();

    function fetchData(){
        fetchAuthorized(`${ENDPOINT}/me`)
        .then((json) => setUserData(JSON.stringify(json)))
    }


    return (
        <div>
            <button onClick={fetchData}>Click to fetch user</button>
            <h1>Posts belong to: {userData}</h1>
        </div>
    )
}

export default MyPosts