import caller from '../api/caller';
import {
    Book_Add_START,
    Book_Add_FAILED,
    Book_Add_SUCESS,

    Book_Edit_START,
    Book_Edit_FAILED,
    Book_Edit_SUCESS,

    Book_Delete_START,
    Book_Delete_FAILED,
    Book_Delete_SUCESS,
} from './types';

import { fetchBooksList } from './main';
import config from '../config';
import User from '../classes/user';
import formBodyMaker from '../modules/utilities/formBodyMaker';

const {
    serverUrl,
    booksEndpoint
} = config;

export function addNewBook(title, description, setModalVisible) {
    return async (dispatch) => {
        dispatch({
            type: Book_Add_START
        })

        let url = `${serverUrl}${booksEndpoint}`;;

        let user = User.getInstance();

        let body = {
            title: title,
            description: description,
            author_id: user.id,
            author_name: user.username,
            createdAt: new Date()
        }

        let response = await caller(url, "POST", formBodyMaker(body)),
            responseJson
        if (response) {
            /* Handling response */
            switch (response.status) {
                case 200:
                case 201:
                    dispatch(addNewBookSucess(setModalVisible))
                    break;
                case 400:
                case 401:
                case 403:
                case 404:
                case 500:
                    responseJson = await response.json()
                    dispatch(addNewBookFailed(responseJson))
                    break;
                default:
                    dispatch(addNewBookFailed())
                    break;
            }
        } else {
            dispatch(addNewBookFailed())
        }
    }
}

addNewBookSucess = (setModalVisible) => {
    return async (dispatch) => {
        setModalVisible(false, "Add")
        dispatch(fetchBooksList())
        dispatch({
            type: Book_Add_SUCESS
        })
    }
}

addNewBookFailed = () => {
    return {
        type: Book_Add_FAILED,
        errorTitle: "Somthing Went Worng",
        errorMessage: "Somthing Went Worng,PLease try again!"
    }
}

export function editBook(title, description, setModalVisible, bookId) {
    return async (dispatch) => {
        dispatch({
            type: Book_Edit_START
        })

        let url = `${serverUrl}${booksEndpoint}/${bookId}`;;

        let body = {
            title: title,
            description: description,
            createdAt: new Date()
        }

        let response = await caller(url, "PUT", formBodyMaker(body)),
            responseJson
        if (response) {
            /* Handling response */
            switch (response.status) {
                case 200:
                case 201:
                    dispatch(editBookSucess(setModalVisible))
                    break;
                case 400:
                case 401:
                case 403:
                case 404:
                case 500:
                    responseJson = await response.json()
                    dispatch(editBookFailed(responseJson))
                    break;
                default:
                    dispatch(editBookFailed())
                    break;
            }
        } else {
            dispatch(editBookFailed())
        }
    }
}

editBookSucess = (setModalVisible) => {
    return async (dispatch) => {
        setModalVisible(false, "Edit")
        dispatch(fetchBooksList())
        dispatch({
            type: Book_Edit_SUCESS
        })
    }
}

editBookFailed = () => {
    return {
        type: Book_Edit_FAILED,
        errorTitle: "Somthing Went Worng",
        errorMessage: "Somthing Went Worng,PLease try again!"
    }
}

export function deleteBook(setModalVisible, bookId) {
    return async (dispatch) => {
        dispatch({
            type: Book_Delete_START
        })

        let url = `${serverUrl}${booksEndpoint}/${bookId}`;;

        let response = await caller(url, "DELETE"),
            responseJson
        if (response) {
            /* Handling response */
            switch (response.status) {
                case 200:
                case 201:
                    dispatch(deleteBookSucess(setModalVisible))
                    break;
                case 400:
                case 401:
                case 403:
                case 404:
                case 500:
                    responseJson = await response.json()
                    dispatch(deleteBookFailed(responseJson))
                    break;
                default:
                    dispatch(deleteBookFailed())
                    break;
            }
        } else {
            dispatch(deleteBookFailed())
        }
    }
}

deleteBookSucess = (setModalVisible) => {
    return async (dispatch) => {
        setModalVisible(false, "Edit")
        dispatch(fetchBooksList())
        dispatch({
            type: Book_Delete_SUCESS
        })
    }
}

deleteBookFailed = () => {
    return {
        type: Book_Delete_FAILED,
        errorTitle: "Somthing Went Worng",
        errorMessage: "Somthing Went Worng,PLease try again!"
    }
}