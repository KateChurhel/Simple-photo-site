import { sendGetRequest, sendPostRequest } from './request';

export const login = (data) => sendPostRequest('/users/authenticate', data);

export const getAll = () => sendGetRequest('/users');

export const getById = (id) => sendGetRequest(`/users/${id}`);

export const register = (data) => sendPostRequest('/users/register', data);
