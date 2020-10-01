import axios from 'axios';

export default axios.create({
    baseURL: "http://localhost:8888/",
    timeout: 0,
    headers: {
        'Content-type': 'application/json'
    }
});
