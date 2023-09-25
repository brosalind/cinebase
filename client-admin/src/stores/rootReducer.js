import adminReducer from './adminReducer'
import movieReducer from './movieReducer'
import genreReducer from './genreReducer'
import { combineReducers } from 'redux'


const rootReducer = combineReducers({
    admin: adminReducer,
    movie: movieReducer,
    genre: genreReducer
})

export default rootReducer