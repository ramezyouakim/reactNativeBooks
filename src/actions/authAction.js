
import caller from '../api/caller';
import {
    User_Login_START,
    User_Login_FAILED,
    User_Login_SUCESS,

    User_Create_Account_START,
    User_Create_Account_FAILED,
    User_Create_Account_SUCESS
} from './types';

import config from '../config';
import User from '../classes/user';
import formBodyMaker from '../modules/utilities/formBodyMaker';

const {
    serverUrl,
    userEndpoint
} = config;

export function login(username, password, navigation) {
    return async (dispatch) => {
        dispatch({
            type: User_Login_START
        })

        let url = `${serverUrl}${userEndpoint}?username=${username}&password=${password}`;

        let response = await caller(url, "GET"),
            responseJson
        if (response) {
            /* Handling response */
            switch (response.status) {
                case 200:
                case 201:
                    responseJson = await response.json()
                    if (responseJson.length > 0) { // this is should be here but since the mocking api that i'm using return empty array insted of 404 so i'm gonna leave it just like this for now
                        dispatch(LoginSucess(responseJson, navigation))
                    }
                    else {
                        dispatch(LoginFailed(responseJson))
                    }
                    break;
                case 400:
                case 401:
                case 403:
                case 404:
                case 500:
                    responseJson = await response.json()
                    dispatch(LoginFailed(responseJson))
                    break;
                default:
                    dispatch(LoginFailed())
                    break;
            }
        } else {
            dispatch(LoginFailed())
        }
    }
}

LoginSucess = (response, navigation) => {
    return async (dispatch) => {

        let username = response[0].username;
        let id = response[0].id;

        User.getInstance(username, id);

        navigation.reset({
            routes: [{ name: "home" }]
        })

        dispatch({
            type: User_Login_SUCESS,
        })

    }

}

LoginFailed = () => {
    return {
        type: User_Login_FAILED,
        errorTitle: "Somthing Went Worng",
        errorMessage: "Either username or password is incorrect"
    }
}

export function createAccount(username, password, navigation) {
    return async (dispatch) => {
        dispatch({
            type: User_Create_Account_START
        })

        let url = `${serverUrl}${userEndpoint}`;

        let body = {
            username: username,
            password: password
        }

        let response = await caller(url, "POST", formBodyMaker(body)),
            responseJson
        if (response) {
            /* Handling response */
            switch (response.status) {
                case 200:
                case 201:
                    responseJson = await response.json()
                    if (responseJson) { // this is should be here but since the mocking api that i'm using return empty array insted of 404 so i'm gonna leave it just like this for now
                        dispatch(CreateAccountSucess(responseJson, navigation))
                    }
                    else {
                        dispatch(CreateAccountFailed(responseJson))
                    }
                    break;
                case 400:
                case 401:
                case 403:
                case 404:
                case 500:
                    responseJson = await response.json()
                    dispatch(CreateAccountFailed(responseJson))
                    break;
                default:
                    dispatch(CreateAccountFailed())
                    break;
            }
        } else {
            dispatch(CreateAccountFailed())
        }
    }
}

CreateAccountSucess = (response, navigation) => {
    console.log(response)
    return async (dispatch) => {

        let username = response.username;
        let id = response.id;

        User.getInstance(username, id);

        navigation.reset({
            routes: [{ name: "home" }]
        })

        dispatch({
            type: User_Create_Account_SUCESS,
        })

    }

}

CreateAccountFailed = () => {
    return {
        type: User_Create_Account_FAILED,
        errorTitle: "Somthing Went Worng",
        errorMessage: "Somthing Went Worng"
    }
}