import {
  sendGetRequest, sendPostRequest, sendPutRequest, sendDeleteRequest,
} from './request';

export const addPhoto = (data) => sendPostRequest('/photos/add-photo', data);

export const getAllPhotos = () => sendGetRequest('/photos');

export const getByUserId = (id) => sendGetRequest(`/photos/user/${id}`);

export const getPhotoById = (id) => sendGetRequest(`/photos/${id}`);

export const deletePhotoRequest = (id) => sendDeleteRequest(`/photos/${id}`);

export const updatePhoto = (id, data) => sendPutRequest(`/photos/${id}`, data);

export const getAllTags = () => sendGetRequest('/photos/tags');

export const getPhotoByTag = (tag) => sendGetRequest(`/photos/tags/${tag}`);
