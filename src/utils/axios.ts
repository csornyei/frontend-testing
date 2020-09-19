import axios from 'axios';

export default axios.create({
    baseURL: process.env.NODE_ENV === 'development' ? "http://localhost:3000/" : "",
    timeout: 20000,
    headers: {
        'Content-type': 'application/json'
    }
});
