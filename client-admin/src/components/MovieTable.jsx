import useFetch from "../hooks/useFetch";
import { Table } from 'react-bootstrap'
import MovieTableRow from '../components/MovieTableRow'
import { useSelector, useDispatch } from 'react-redux'
import { thunkFetchMovies } from "../stores/movieActionCreator";
import { useEffect } from "react";
import Container from "react-bootstrap/Container";



function MovieTable() {
    const {movies, loading} = useSelector((state) => {
        return state.movie
    })
    const dispatch = useDispatch()

    useEffect(() => {
        dispatch(thunkFetchMovies())
    }, [])

    if(loading) {
        return <h1>Loading...</h1>
    }


return (
    <>
    <Container>
    <Table>
        <thead>
            <tr>
                <th>#</th>
                <th>Title</th>
                <th>Poster</th>
                <th>Synopsis</th>
                <th>Trailer</th>
                <th>Rating</th>
                <th>Genre</th>
                <th>Owner</th>
                <th>Casts</th>
                <th>Actions</th>
            </tr>
        </thead>
        <tbody>
            <MovieTableRow movies={movies}></MovieTableRow>
        </tbody>
        
    </Table>
    </Container>
    </>

)
}




export default MovieTable