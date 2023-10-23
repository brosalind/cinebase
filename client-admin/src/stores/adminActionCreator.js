import { LOGIN_ERROR, LOGIN_SUCCESS, LOGIN_REQUEST, REGISTER_ERROR, REGISTER_REQUEST, REGISTER_SUCCESS, HISTORY_ERROR, HISTORY_REQUEST, HISTORY_SUCCESS } from "./adminActionTypes";
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


export function errorHistory(payload) {
    return { type: HISTORY_ERROR, payload }
}

export function requestHistory(payload) {
    return { type: HISTORY_REQUEST, payload }
}

export function successHistory(payload) {
    return { type: HISTORY_SUCCESS, payload }
}

export function fetchHistory() {
    return (dispatch) => {
        dispatch(requestHistory(true))
        console.log("dispatch loading")
        fetch(serverUrl + 'history', {
            method: 'GET',
            headers: {
                "access_token": localStorage.access_token,
                "Content-Type": "application/json"
            }
        })
        .then(async (response) => {
            if (!response.ok) {
                throw await response.text();
            }
            return response.json();
        })
        .then((data) => {
            dispatch(successHistory(data));
        })
        .catch((err) => {
            dispatch(errorHistory(err));
        })
        .finally(() => {
            dispatch(requestHistory(false));
        });        

    }
}
