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
} from '../actions/types'

const INIT_STATE = {
    loading: false,
    errorTitle: "",
    errorMessage: ""
}

export default (state = INIT_STATE, action) => {
    switch (action.type) {
        // we should spread each case by it self but since we are using mocking api and it will have the same behavior i'm gonna leave it as it is  

        case Book_Add_START:
        case Book_Edit_START:
        case Book_Delete_START:
            return { ...state, loading: true, errorTitle: null, errorMessage: null };
        case Book_Add_FAILED:
        case Book_Edit_FAILED:
        case Book_Delete_FAILED:
            return { ...state, loading: false, errorTitle: action.errorTitle, errorMessage: action.errorMessage };
        case Book_Add_SUCESS:
        case Book_Edit_SUCESS:
        case Book_Delete_SUCESS:
            return { ...state, loading: false, errorTitle: null, errorMessage: null };


        default:
            return state;
    }
}