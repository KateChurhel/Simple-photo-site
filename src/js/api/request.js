// config
import ENV from 'config/env';
// helpers
import { RequestError } from '../helpers/exceptions';
import { getAuthToken } from '../helpers/authorization';

const baseUrl = `${ENV.REACT_APP_API_URL}`;
const contentTypes = {
  json: 'application/json',
  text: 'text/html',
};

const encodeQueryData = (data) => {
  if (!data) {
    return '';
  }

  try {
    const queryStringStart = '?';

    return Object.keys(data).reduce((queryString, key, index) => {
      const paramStringStart = index ? '&' : '';
      const paramString = `${paramStringStart}${encodeURIComponent(key)}=${encodeURIComponent(data[key])}`;

      return queryString + paramString;
    }, queryStringStart);
  } catch (e) {
    throw new TypeError('Error: incorrect query data format.');
  }
};

const stringifyBodyData = (data) => {
  if (!data) {
    return null;
  }
  try {
    return JSON.stringify(data);
  } catch (e) {
    throw new TypeError('Error: incorrect send data format.');
  }
};

const getResponseData = async (response) => {
  const contentType = response.headers.get('content-type');

  if (!contentType || contentType.includes(contentTypes.text)) {
    const responseText = await response.text();

    return { message: responseText };
  }

  if (contentType.includes(contentTypes.json)) {
    return response.json();
  }

  throw new TypeError('Error: incorrect received data format.');
};

const sendRequest = async (url = '', options = {}) => {
  const requestUrl = baseUrl + url;
  const requestHeaders = new Headers({
    'Content-Type': contentTypes.json,
  });

  const authToken = getAuthToken();
  if (authToken) {
    requestHeaders.append('Authorization', `Bearer ${authToken}`);
  }

  const requestOptions = {
    headers: requestHeaders,
    ...options,
  };

  const response = await fetch(requestUrl, requestOptions);
  const responseData = await getResponseData(response);
  responseData.responseStatus = response.status;

  if (!response.ok) {
    throw new RequestError(response.status, responseData);
  }

  return responseData;
};

export const sendGetRequest = (url, data) => {
  const requestUrl = url + encodeQueryData(data);
  const requestOptions = {
    method: 'GET',
  };

  return sendRequest(requestUrl, requestOptions);
};

export const sendPostRequest = (url, data) => {
  const requestOptions = {
    method: 'POST',
    body: stringifyBodyData(data),
  };

  return sendRequest(url, requestOptions);
};

export const sendPutRequest = (url, data) => {
  const requestOptions = {
    method: 'PUT',
    body: stringifyBodyData(data),
  };

  return sendRequest(url, requestOptions);
};

export const sendDeleteRequest = (url, data) => {
  const requestOptions = {
    method: 'DELETE',
    body: stringifyBodyData(data),
  };

  return sendRequest(url, requestOptions);
};
