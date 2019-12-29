// libraries
import { createStore, applyMiddleware } from 'redux';

// Logger with default options
import logger from 'redux-logger';

// reducers
import rootReducer from '../reducers';

export default createStore(rootReducer, applyMiddleware(logger));
