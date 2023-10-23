import useFetch from "../hooks/useFetch";
import { Table } from 'react-bootstrap'
import MovieTableRow from '../components/MovieTableRow'
import { useSelector, useDispatch } from 'react-redux'
import { thunkFetchMovies } from "../stores/movieActionCreator";
import { useEffect } from "react";
import Container from "react-bootstrap/Container";
import Col from "react-bootstrap/Col";
import '../assets/movie.css';




function MovieTable() {
    const {movies, loading} = useSelector((state) => {
        return state.movie
    })
    const dispatch = useDispatch()

    useEffect(() => {
        dispatch(thunkFetchMovies())
    }, [])

    if(loading) {
        return<>
        <Container className="pt-5">
           <Col>
       <h1 className="text-center">Loading... Please wait.</h1>
       </Col>
       </Container>
       </>
    }


return (
    <>
    <Container>
    <div className="table-responsive custom-table-container">
    <Table className="table-responsive custom-table">
        <thead>
            <tr>
                <th>#</th>
                <th>Title</th>
                <th>Synopsis</th>
                <th>Trailer</th>
                <th>Writer</th>
                <th>Director</th>
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
    </div>
    </Container>
    </>

)
}




export default MovieTable