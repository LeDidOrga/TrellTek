import axios from 'axios';

const TRELLO_API_URL = 'https://api.trello.com/1';
const TRELLO_API_KEY = import.meta.env.VITE_TRELLO_API_KEY;
const TRELLO_TOKEN = import.meta.env.VITE_TRELLO_TOKEN;

const trelloClient = axios.create({
    baseURL: TRELLO_API_URL,
    params: {
        key: TRELLO_API_KEY,
        token: TRELLO_TOKEN
    }
});

export default trelloClient;