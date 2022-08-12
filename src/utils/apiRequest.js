import axios from 'axios';

const apiRequest = axios.create({
  baseURL: process.env.REACT_APP_BASE_URL,
  headers: { Authorization: `Bearer ${localStorage.getItem('token')}`, Accept: 'application/json' },
});

export default apiRequest;
