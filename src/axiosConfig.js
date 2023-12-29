import axios from 'axios';

const instance = axios.create({
    baseURL: 'https://notepadapi-d30s.onrender.com/api' // Replace with your API URL
});

export default instance;
