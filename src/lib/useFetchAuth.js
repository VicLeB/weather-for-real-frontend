
const ENDPOINT = process.env.NODE_ENV === 'production' ? 'https://weather-for-real.herokuapp.com/' : 'http://localhost:3000';

function useFetchAuth(url) {
    return function() {
        return fetch(`${ENDPOINT}${url}`, {
            headers:{
                Authorization: `Bearer ${localStorage.getItem('token')}`,
            },
        });
    };
}

export default useFetchAuth;