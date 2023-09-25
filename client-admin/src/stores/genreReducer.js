import { FETCH_GENRES_LOADING, FETCH_GENRES_SUCCESS, FETCH_GENRES_ERROR, ADD_GENRE_SUCCESS, ADD_GENRE_LOADING, ADD_GENRE_ERROR, DELETE_GENRE_ERROR, DELETE_GENRE_LOADING, DELETE_GENRE_SUCCESS, EDIT_GENRE_ERROR, EDIT_GENRE_LOADING, EDIT_GENRE_SUCCESS } from "./genreActionTypes";

const initialGenreState = {
    genres: [],
    fetchGenresLoading: false,
    fetchGenresError: '',
    addGenreSuccess: '',
    addGenreLoading: false,
    addGenreError: '',
    deleteGenreError: '',
    deleteGenreLoading: false,
    deleteGenreSuccess: '',
    editGenreError: '',
    editGenreLoading: false,
    editGenreSuccess: ''
}

function genreReducer(state = initialGenreState, action) {
    switch (action.type) {
        case FETCH_GENRES_SUCCESS:
            return {
                ...state,
                genres: action.payload
            };
        case FETCH_GENRES_LOADING:
            return {
                ...state,
                fetchGenresLoading: action.payload
            };
        case FETCH_GENRES_ERROR:
            return {
                ...state,
                fetchGenresError: action.payload
            };
        case ADD_GENRE_SUCCESS:
            return {
                ...state,
                addGenreSuccess: action.payload
            };
        case ADD_GENRE_LOADING:
            return {
                ...state,
                addGenreLoading: action.payload
            };
        case ADD_GENRE_ERROR:
            return {
                ...state,
                addGenreError: action.payload
            };
        case DELETE_GENRE_ERROR:
            return {
                ...state,
                deleteGenreError: action.payload
            };
        case DELETE_GENRE_LOADING:
            return {
                ...state,
                deleteGenreLoading: action.payload
            };
        case DELETE_GENRE_SUCCESS:
            return {
                ...state,
                deleteGenreSuccess: action.payload
            };
        case EDIT_GENRE_ERROR:
            return {
                ...state,
                editGenreError: action.payload
            };
        case EDIT_GENRE_LOADING:
            return {
                ...state,
                editGenreLoading: action.payload
            };
        case EDIT_GENRE_SUCCESS:
            return {
                ...state,
                editGenreSuccess: action.payload
            };
        default:
            return state
                ;
    }
}

export default genreReducer
