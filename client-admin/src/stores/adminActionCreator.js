import { LOGIN_ERROR, LOGIN_SUCCESS, LOGIN_REQUEST, REGISTER_ERROR, REGISTER_REQUEST, REGISTER_SUCCESS } from "./adminActionTypes";
let serverUrl = "http://localhost:3000/admin/"


export function successLogin(payload) {
    return { type: LOGIN_SUCCESS, payload }
}

export function errorLogin(payload) {
    return { type: LOGIN_ERROR, payload }
}

export function requestLogin(payload) {
    return { type: LOGIN_REQUEST, payload }
}

export function login(form){
    return (dispatch) => {
        dispatch(requestLogin(true))
        const {email, password} = form
        return fetch(serverUrl + 'login', {
            method: 'POST',
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                email: email, password: password}),  
        })

    }
}

export function successRegister(payload) {
    return { type: REGISTER_SUCCESS, payload }
}

export function errorRegister(payload) {
    return { type: REGISTER_ERROR, payload }
}

export function requestRegister(payload) {
    return { type: REGISTER_REQUEST, payload }
}

export function registerAdmin(form){
    return (dispatch) => {
        const {email, username, password, address, phoneNumber} = form
        dispatch(requestRegister(true))
        fetch(serverUrl + 'register', {
            method: 'POST',
            headers: {
                "Content-Type": "application/json",
                "access_token": localStorage.access_token
            },
            body: JSON.stringify({email, username, password, address, phoneNumber}),  
        }).then(async(response) => {
            if(!response.ok){
                throw await response.text()
            }
            return response.json()
        }).then ((data) => {
            dispatch(requestRegister(false))
            dispatch(successRegister("Success!"))
        }).catch((err) => {
            console.log(err,"this is error")
            dispatch(errorRegister(err))
        }).finally(() => {
            dispatch(requestRegister(false))
        })

    }
}
