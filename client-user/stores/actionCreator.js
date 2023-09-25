import { MOVIES_FETCH_SUCCESS, MOVIES_FETCH_ERROR, MOVIES_FETCH_LOADING, SELECTED_MOVIE_FETCH_ERROR, SELECTED_MOVIE_FETCH_LOADING, SELECTED_MOVIE_FETCH_SUCCESS} from "./actionTypes"
// let serverUrl = 'https://moviesdb.benitarosalind.site/movies'
let serverUrl = 'http://localhost:3000/movies'


export function fetchMoviesSuccess(payload) {
    return {
        type: MOVIES_FETCH_SUCCESS,
        payload
    }
}

export function fetchMoviesLoading(payload){
    return {
        type: MOVIES_FETCH_LOADING,
        payload
    }
}

export function fetchMoviesError(payload){
    return {
        type: MOVIES_FETCH_ERROR,
        payload
    }
}

export function fetchMovies (){
    return (dispatch) => {
        dispatch(fetchMoviesLoading(true))
        fetch(serverUrl, {
            method: 'GET'
        }).then(async(response) => {
            if(!response.ok){
                throw await response.text()
            } 
            return response.json()
        }).then((data) => {
            dispatch(fetchMoviesSuccess(data))
            dispatch(fetchMoviesError({}))
        }).catch((err) => {
            console.log(err)
            dispatch(fetchMoviesError(null))
        }).finally(()=> {
            dispatch(fetchMoviesLoading(false))
        })
    }
}

export function fetchMovieDetailSuccess(payload) {
    return {
        type: SELECTED_MOVIE_FETCH_SUCCESS,
        payload
    }
}

export function fetchMovieDetailLoading(payload){
    return {
        type: SELECTED_MOVIE_FETCH_LOADING,
        payload
    }
}

export function fetchMovieDetailError(payload){
    return {
        type: SELECTED_MOVIE_FETCH_ERROR,
        payload
    }
}

export function fetchMovieDetail (id){
    return (dispatch) => {
        dispatch(fetchMovieDetailLoading(true))
        fetch(serverUrl + `/${id}`, {
            method: 'GET'
        }).then(async(response) => {
            if(!response.ok){
                throw await response.text()
            } 
            return response.json()
        }).then((data) => {
            console.log(data)
            dispatch(fetchMovieDetailSuccess(data))
            dispatch(fetchMovieDetailError({}))
        }).catch((err) => {
            console.log(err)
            dispatch(fetchMovieDetailError(null))
        }).finally(()=> {
            dispatch(fetchMovieDetailLoading(false))
        })
    }
}