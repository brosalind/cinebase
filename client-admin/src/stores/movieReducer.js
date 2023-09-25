import { MOVIES_FETCHED, SET_LOADING, DELETE_MOVIE_ERROR, DELETE_MOVIE_SUCCESS, DELETE_MOVIE_REQUEST, SELECTED_MOVIE_ERROR, SELECTED_MOVIE_LOADING, SELECTED_MOVIE_FETCHED } from './movieActionTypes'

const initialMovieState = {
    movies: [],
    loading: false,
    deleteError: '',
    deleteLoading: false,
    deleteSuccess: '',
    selectedMovie: [],
    selectedMovieLoading: false,
    selectedMovieError: ''
}

function movieReducer(state = initialMovieState, action) {
    switch (action.type) {
        case MOVIES_FETCHED:
            return {
                ...state,
                movies: action.payload
            };
        case SET_LOADING:
            return {
                ...state,
                loading: action.payload
            };
        case DELETE_MOVIE_ERROR:
            return {
                ...state,
                deleteError: action.payload
            };
        case DELETE_MOVIE_REQUEST:
            return {
                ...state,
                deleteLoading: action.payload
            };
        case DELETE_MOVIE_SUCCESS:
            return {
                ...state,
                deleteSuccess: action.payload
            };
        case SELECTED_MOVIE_ERROR:
            return {
                ...state,
                selectedMovieError: action.payload
            };
        case SELECTED_MOVIE_LOADING:
            return {
                ...state,
                selectedMovieLoading: action.payload
            };
        case SELECTED_MOVIE_FETCHED:
            return {
                ...state,
                selectedMovie: action.payload
            };
        default:
            return state

    }

}



export default movieReducer