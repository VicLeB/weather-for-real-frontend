
export const ENDPOINT = process.env.NODE_ENV === 'production' ? 'https://weather-for-real.herokuapp.com/' : 'http://localhost:3000';

export const get = (pathname) => {
    return fetch(`${ENDPOINT}${pathname}`);
};

export const post = (pathname, body) => {
    return fetch(`${ENDPOINT}${pathname}`, {
        method: 'POST',
        headers:{
            Authorization: `Bearer ${localStorage.getItem('token')}`,
            'Content-Type': 'application/json',
            Accepts: 'application/json'
        },
        body,
    });
};

export const patch = (pathname, body) => {
    return fetch(`${ENDPOINT}${pathname}`,{
        method: 'PATCH',
        headers: {
            Authorization: `Bearer ${localStorage.getItem('token')}`,
            'Content-Type': 'application/json',
            Accept: 'application/json',
        },
        body,
    });
};

export const destroy = (pathname) => {
    return fetch(`${ENDPOINT}${pathname}`,{
        method: 'DELETE',
        headers: {
            Authorization: `Bearer ${localStorage.getItem('token')}`
        }
    });
};
