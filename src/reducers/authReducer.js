import {
    User_Login_START,
    User_Login_FAILED,
    User_Login_SUCESS,

    User_Create_Account_START,
    User_Create_Account_FAILED,
    User_Create_Account_SUCESS
} from '../actions/types'

const INIT_STATE = {
    loading: false,
    errorTitle: "",
    errorMessage: ""
}

export default (state = INIT_STATE, action) => {
    switch (action.type) {

        // of course that not right but since there is no auth api and it just post request so login is the same as create account (just reading and writing)
        // we should create a spreate case for each flow
        case User_Login_START:
        case User_Create_Account_START:
            return { ...state, loading: true, errorTitle: null, errorMessage: null };
            
        case User_Login_FAILED:
        case User_Create_Account_FAILED:
            return { ...state, loading: false, errorTitle: action.errorTitle, errorMessage: action.errorMessage };
            
        case User_Login_SUCESS:
        case User_Create_Account_SUCESS:
            return { ...state, loading: false, errorTitle: null, errorMessage: null };

        default:
            return state;
    }
}