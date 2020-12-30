import axios from 'axios';

const API = axios.create({
    baseURL: `https://pixabay.com/api/`,
    header: { 
       'Accept': 'application/json',
       'Content-type': 'application/json' 
    }, 
    params: {
        key: process.env.REACT_APP_PIXABAY_API_KEY
    }, 
})
 
export default API;