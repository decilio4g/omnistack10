import axios from 'axios'

const api = axios.create({
  baseURL: 'http://localhost:4448'
});

export default api;