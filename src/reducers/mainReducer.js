import { combineReducers } from 'redux';
import bookReducer from './bookReducer';
import authReducer from './authReducer';
import bookOpsReducer from './bookOpsReducer';

export default combineReducers({
    books: bookReducer,
    auth: authReducer,
    bookOps: bookOpsReducer
});