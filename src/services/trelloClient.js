import axios from 'axios';
import dotenv from 'dotenv';

dotenv.config();

const TRELLO_API_URL = 'https://api.trello.com/1';
const TRELLO_API_KEY = process.env.TRELLO_API_KEY;
const TRELLO_TOKEN = process.env.TRELLO_TOKEN;

const trelloClient = axios.create({
    baseURL: TRELLO_API_URL,
    params: {
        key: TRELLO_API_KEY,
        token: TRELLO_TOKEN
    }
});

export default trelloClient;
