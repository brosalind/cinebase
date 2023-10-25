import { fetchHistory } from "./adminActionCreator"
import { MOVIES_FETCHED, SET_LOADING, DELETE_MOVIE_ERROR, DELETE_MOVIE_SUCCESS, DELETE_MOVIE_REQUEST, SELECTED_MOVIE_ERROR, SELECTED_MOVIE_FETCHED, SELECTED_MOVIE_LOADING } from "./movieActionTypes"
// let serverUrl = "https://moviesdb.benitarosalind.site/"
let serverUrl = "http://localhost:3000/"
import { redirect } from "react-router-dom"


export function actionFetchMovies(payload) {
    return { type: MOVIES_FETCHED, payload }
}
export function setLoading(payload) {
    return { type: SET_LOADING, payload }
}

export function thunkFetchMovies() {
    return (dispatch) => {
        dispatch(setLoading(true))
        fetch(serverUrl + 'admin/movies', {
            method: 'GET',
             headers: {
                "access_token": localStorage.access_token
            }
        })
            .then(async (response) => {
                if (!response.ok) {
                    throw await response.text()
                }
                return response.json()
            }).
            then((data) => {
                dispatch(actionFetchMovies(data))
            })
            .catch((err) => {
                console.log(err)
            })
            .finally(() => {
                dispatch(setLoading(false))
            })

    }
}

export function deleteMovieLoading(payload) {
    return { type: DELETE_MOVIE_REQUEST, payload }
}
export function deleteMovieSuccess(payload) {
    return { type: DELETE_MOVIE_SUCCESS, payload }
}

export function deleteMovieError(payload) {
    return { type: DELETE_MOVIE_ERROR, payload }
}

export function thunkDeleteMovie(id) {
    return (dispatch) => {
        fetch(serverUrl + 'admin/movies/' + `${id}`, {
            method: "DELETE",
            headers: {
                "access_token": localStorage.access_token,
                "Content-Type": "application/json"
            }
        })
            .then(async (response) => {
                if (!response.ok) {
                    throw await response.text()
                }
                return response.json()
            }).
            then(() => {
                console.log(dispatch)
                dispatch(thunkFetchMovies())
            })
            .catch((err) => {
                console.log(err)
            })

    }
}


export function thunkAddMovie(movieForm) {
    return (dispatch) => {
        console.log(movieForm, "thunk")
        fetch(serverUrl + 'admin/movies', {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "access_token": localStorage.access_token
            }, 
            body:
                JSON.stringify({
                    title: movieForm.title,
                    imgUrl: movieForm.imgUrl,
                    trailerUrl: movieForm.trailerUrl,
                    synopsis: movieForm.synopsis,
                    rating: movieForm.rating,
                    genreId: movieForm.genreId,
                    cast: movieForm.casts,
                    year: movieForm.year,
                    writer: movieForm.writer,
                    director: movieForm.director,
                    status: movieForm.status,
                    still: movieForm.stills
                })
        })
            .then(async (response) => {
                if (!response.ok) {
                    throw await response.text()
                }
                return response.json()
            }).
            then(() => {
                console.log("works")
                dispatch(thunkFetchMovies())
                dispatch(fetchHistory())
            })
            .catch((err) => {
                console.log(err)
            })

    }
}


export function selectedMovieLoading(payload) {
    return { type: SELECTED_MOVIE_LOADING, payload }
}
export function selectedMovieSuccess(payload) {
    return { type: SELECTED_MOVIE_FETCHED, payload }
}

export function selectedMovieError(payload) {
    return { type: SELECTED_MOVIE_ERROR, payload }
}

    export function thunkGetMovieDetails(id) {
        console.log(id)
        return (dispatch) => {
            fetch(serverUrl + 'movies/' + `${id}`, {
                method: "GET",
                headers: {
                    "Content-Type": "application/json"
                }
            })
                .then(async (response) => {
                    if (!response.ok) {
                        throw await response.text()
                    }
                    return response.json()
                }).
                then((data) => {
                    console.log("get details", data)
                    dispatch(selectedMovieSuccess(data))
                })
                .catch((err) => {
                    console.log(err)
                })

        }
    }


    export function thunkEditMovie(id, editMovieForm) {
        return (dispatch) => {
            fetch(serverUrl + 'admin/movies/' + `${id}`, {
                method: "PUT",
                headers: {
                    "Content-Type": "application/json",
                    "access_token": localStorage.access_token
                },
                body: JSON.stringify(editMovieForm)
            })
                .then(async (response) => {
                    if (!response.ok) {
                        throw await response.text()
                    }
                    return response.json()
                }).
                then(() => {
                    console.log("success edit")
                    dispatch(actionFetchMovies())
                })
                .catch((err) => {
                    console.log(err)
                })

        }
    }