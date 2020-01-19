// constants
import { DEFAULT_ERROR } from '../constants/errors';

export class RequestError extends Error {
  constructor(status = '', responseData) {
    super();

    const errorData = responseData || {};

    this.message = errorData.message || DEFAULT_ERROR;
    this.errors = errorData.errors;
    this.status = status;
    this.name = 'RequestError';
  }
}
