import axios from 'axios';

const movieDB = axios.create({
    baseURL: 'https://api.themoviedb.org/3/movie',
    params: {
        api_key: '648b8d80c993f16ad90f520a193b5137',
        language: 'en-US'
    }
});

export default movieDB;