import { LOGIN_ERROR, LOGIN_REQUEST, LOGIN_SUCCESS, REGISTER_ERROR, REGISTER_REQUEST, REGISTER_SUCCESS } from "./adminActionTypes";

const initialAdminState = {
    isLoggedIn: false,
    error: {},
    loading: false,
    registerSuccess: '',
    registerLoading: false,
    registerError: ''
}

function adminReducer(state = initialAdminState, action){
    switch(action.type){
        case LOGIN_SUCCESS:
            return {
                ...state,
                isLoggedIn: action.payload,
                error: '',
                loading: false
            };
        case LOGIN_ERROR: {
            return {
                ...state,
                error: action.payload,
                loading: false,
                isLoggedIn: false
            }
        }
        case LOGIN_REQUEST: {
            return {
                ...state,
                isLoggedIn: false,
                error: '',
                loading: action.payload
            }
        }
        case REGISTER_SUCCESS:
            return {
                ...state,
                registerSuccess: action.payload
            };
        case REGISTER_REQUEST: {
            return {
                ...state,
                registerLoading: action.payload
            }
        }
        case REGISTER_ERROR: {
            return {
                ...state,
                registerError: action.payload
            }
        }
        default:
            return state
    }
}

export default adminReducer