import {
    GET_Books_START,
    GET_Books_FAILED,
    GET_Books_SUCESS,
    GET_More_Books_START,
    GET_More_Books_FAILED,
    GET_More_Books_SUCESS
} from '../actions/types'

const INIT_STATE = {
    booksList: [],
    loading: false,
    errorTitle: "",
    errorMessage: "",
    loadMore: false,
    end: false
}

export default (state = INIT_STATE, action) => {
    switch (action.type) {

        case GET_Books_START:
            return { ...state, booksList: [], loading: true, errorTitle: null, errorMessage: null };
        case GET_Books_FAILED:
            return { ...state, booksList: [], loading: false, errorTitle: action.errorTitle, errorMessage: action.errorMessage };
        case GET_Books_SUCESS:
            return { ...state, booksList: action.booksList, loading: false, errorTitle: null, errorMessage: null };

        case GET_More_Books_START:
            return { ...state, loading: false, loadMore: true, errorTitle: null, errorMessage: null };
        case GET_More_Books_FAILED:
            return { ...state, loading: false, loadMore: false, errorTitle: action.errorTitle, errorMessage: action.errorMessage, end: true };
        case GET_More_Books_SUCESS:
            return { ...state, booksList: action.booksList, loading: false, loadMore: false, errorTitle: null, errorMessage: null, end: false };
        default:
            return state;
    }
}