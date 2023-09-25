import { MOVIES_FETCH_SUCCESS, MOVIES_FETCH_ERROR, MOVIES_FETCH_LOADING, SELECTED_MOVIE_FETCH_ERROR, SELECTED_MOVIE_FETCH_LOADING, SELECTED_MOVIE_FETCH_SUCCESS } from "./actionTypes"

const initialState = {
    movies: [],
    loading: false,
    error: '',
    selectedMovie: [],
    selectedMovieLoading: false,
    selectedMovieError: {}
}

function rootReducer(state = initialState, action){
    switch(action.type){
        case MOVIES_FETCH_SUCCESS:
            return {
                ... state,
                movies: action.payload
            };
        case MOVIES_FETCH_ERROR: {
            return {
                ... state,
                error: action.payload
            }
        };
        case MOVIES_FETCH_LOADING:
            return {
                ...state,
                loading: action.payload
            };
        case SELECTED_MOVIE_FETCH_SUCCESS:
            return {
                ... state,
                selectedMovie: action.payload
            };
        case SELECTED_MOVIE_FETCH_ERROR: {
            return {
                ... state,
                selectedMovieError: action.payload
            }
        };
        case SELECTED_MOVIE_FETCH_LOADING:
            return {
                ...state,
                selectedMovieLoading: action.payload
            };
        default: 
            return state
        
    }
}

export default rootReducer