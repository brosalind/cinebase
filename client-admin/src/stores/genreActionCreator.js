import { FETCH_GENRES_ERROR, FETCH_GENRES_LOADING, FETCH_GENRES_SUCCESS, ADD_GENRE_ERROR, ADD_GENRE_LOADING, ADD_GENRE_SUCCESS, DELETE_GENRE_SUCCESS, DELETE_GENRE_LOADING, DELETE_GENRE_ERROR, EDIT_GENRE_ERROR, EDIT_GENRE_LOADING, EDIT_GENRE_SUCCESS} from "./genreActionTypes"
// let serverUrl = "https://moviesdb.benitarosalind.site/"
let serverUrl = "http://localhost:3000/"
export function fetchGenres(payload) {
    return { type: FETCH_GENRES_SUCCESS, payload }
}
export function fetchGenresLoading(payload) {
    return { type: FETCH_GENRES_LOADING, payload }
}
export function fetchGenresError(payload) {
    return { type: FETCH_GENRES_ERROR, payload }
}

export function thunkFetchGenres() {
    return (dispatch) => {
        dispatch(fetchGenresLoading(true))
        fetch(serverUrl + 'admin/genres', {
            method: 'GET',
             headers: {
                "Content-Type": "application/json",
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
                dispatch(fetchGenres(data))
            })
            .catch((err) => {
                dispatch(fetchGenresError(err))
                console.log(err)
            })
            .finally(() => {
                dispatch(fetchGenresLoading(false))
            })

    }
}


export function addGenreSuccess(payload) {
    return { type: ADD_GENRE_SUCCESS, payload }
}
export function addGenreLoading(payload) {
    return { type: ADD_GENRE_LOADING, payload }
}
export function addGenreError(payload) {
    return { type: ADD_GENRE_ERROR, payload }
}

export function addGenre(genreName){
    return (dispatch) => {
        dispatch(addGenreLoading(true))
        fetch(serverUrl + 'admin/genres', {
            method: 'POST',
            headers: {
                "Content-Type": "application/json",
                "access_token": localStorage.access_token
            },
            body: JSON.stringify({ newGenre: genreName})
        }).then(async (response) => {
            if (!response.ok) {
                throw await response.text()
            }
            return response.json()
        }).then((data) => {
            dispatch(thunkFetchGenres())
            dispatch(addGenreSuccess(data))
        }).catch((err) => {
            dispatch(addGenreError(err))
            console.log(err)
        })
        .finally(() => dispatch(addGenreLoading(false)))

    }
    
}

export function deleteGenreSuccess(payload) {
    return { type: DELETE_GENRE_SUCCESS, payload }
}
export function deleteGenreLoading(payload) {
    return { type: DELETE_GENRE_LOADING, payload }
}
export function deleteGenreError(payload) {
    return { type: DELETE_GENRE_ERROR, payload }
}

export function deleteGenre(id){
    return (dispatch) => {
        dispatch(deleteGenreLoading(true))
        fetch(serverUrl + 'admin/genres/' + `${id}`, {
            method: 'DELETE',
            headers: {
                "Content-Type": "application/json",
                "access_token": localStorage.access_token
            },
        }).then(async (response) => {
            if (!response.ok) {
                throw await response.text()
            }
            return response.json()
        }).then((data) => {
            dispatch(thunkFetchGenres())
            dispatch(deleteGenreSuccess(data))
        }).catch((err) => {
            dispatch(deleteGenreError(err))
            console.log(err)
        })
        .finally(() => dispatch(deleteGenreLoading(false)))
    }
    
}

export function editGenreSuccess(payload) {
    return { type: EDIT_GENRE_SUCCESS, payload }
}
export function editGenreLoading(payload) {
    return { type: EDIT_GENRE_LOADING, payload }
}
export function editGenreError(payload) {
    return { type: EDIT_GENRE_ERROR, payload }
}

export function editGenre(id, editForm){
    return (dispatch) => {
        const {name} = editForm
        dispatch(editGenreLoading(true))
        fetch(serverUrl + 'admin/genres/' + `${id}`, {
            method: 'PUT',
            headers: {
                "Content-Type": "application/json",
                "access_token": localStorage.access_token
            },
            body: JSON.stringify({
                name: name
            })
        }).then(async (response) => {
            if (!response.ok) {
                throw await response.text()
            }
            return response.json()
        }).then((data) => {
            dispatch(thunkFetchGenres())
        }).catch((err) => {
            dispatch(editGenreError(err))
            console.log(err)
        })
        .finally(() => dispatch(editGenreLoading(false)))
    }
    
}