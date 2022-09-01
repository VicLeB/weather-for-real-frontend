import React from 'react'

function useFetchAuth() {
    return function(url){
        return fetch(url,{
            headers:{
                Authorization: `Bearer ${localStorage.getItem('token')}`,
            },
        }).then(res => res.json())
    }
}

export default useFetchAuth