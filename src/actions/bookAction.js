import caller from '../api/caller';
import {
    GET_Books_START,
    GET_Books_FAILED,
    GET_Books_SUCESS,
    GET_More_Books_START,
    GET_More_Books_SUCESS,
    GET_More_Books_FAILED
} from './types';
import store from '../store';
import config from '../config';

const {
    serverUrl,
    booksEndpoint
} = config;


export function fetchBooksList(query = null) {
    return async (dispatch) => {
        dispatch({
            type: GET_Books_START
        })

        let url = "";
        if (query) {
            url = `${serverUrl}${booksEndpoint}?${query}&page=1&limit=10`;
        }
        else {
            url = `${serverUrl}${booksEndpoint}?page=1&limit=10`;
        }

        let response = await caller(url, "GET"),
            responseJson
        if (response) {
            /* Handling response */
            switch (response.status) {
                case 200:
                case 201:

                    responseJson = await response.json()
                    if (responseJson.length > 0) { // this is should be here but since the mocking api that i'm using return empty array insted of 404 so i'm gonna leave it just like this for now
                        dispatch(fetchBooksListSucess(responseJson))
                    }
                    else {
                        dispatch(fetchBooksListFailed())
                    }
                    break;
                case 400:
                case 401:
                case 403:
                case 404:
                case 500:
                    dispatch(fetchBooksListFailed())
                    break;
                default:
                    dispatch(fetchBooksListFailed())
                    break;
            }
        } else {
            dispatch(fetchBooksListFailed())
        }
    }
}

fetchBooksListSucess = (response) => {
    return {
        type: GET_Books_SUCESS,
        booksList: response
    }
}

fetchBooksListFailed = () => {
    return {
        type: GET_Books_FAILED,
        errorTitle: "Somthing Went Worng",
        errorMessage: "Somthing Went Worng,PLease try again!"
    }
}

export function fetchMoreBooksList(pagenumber, query = null) {
    return async (dispatch) => {
        dispatch({
            type: GET_More_Books_START,
        })
        let url = "";
        if (query) {
            url = `${serverUrl}${booksEndpoint}?${query}&page=${pagenumber}&limit=10`;

        }
        else {
            url = `${serverUrl}${booksEndpoint}?page=${pagenumber}&limit=10`;
        }

        let response = await caller(url, "GET"),
            responseJson
        if (response) {
            /* Handling response */
            switch (response.status) {
                case 200:
                case 201:
                    responseJson = await response.json()
                    if (responseJson.length > 0) { // this is should be here but since the mocking api that i'm using return empty array insted of 404 so i'm gonna leave it just like this for now
                        dispatch(fetchBooksMoreListSucess(responseJson))
                    }
                    else {
                        dispatch(fetchBooksMoreListFailed(responseJson))
                    }
                    break;
                case 400:
                case 401:
                case 403:
                case 404:
                case 500:
                    responseJson = await response.json()
                    dispatch(fetchBooksMoreListFailed(responseJson))
                    break;
                default:
                    dispatch(fetchBooksMoreListFailed())
                    break;
            }
        } else {
            dispatch(fetchBooksMoreListFailed())
        }
    }
}

fetchBooksMoreListSucess = (response) => {
    let oldLIst = store.getState().books.booksList;
    return {
        type: GET_More_Books_SUCESS,
        booksList: oldLIst.concat(response)
    }
}

fetchBooksMoreListFailed = () => {
    return {
        type: GET_More_Books_FAILED,
        errorTitle: "Somthing Went Worng",
        errorMessage: "Somthing Went Worng,PLease try again!"
    }
}