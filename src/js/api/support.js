import {
  sendPostRequest,
} from './request';

export const sendEmail = (data) => sendPostRequest('/support/send-email', data);
