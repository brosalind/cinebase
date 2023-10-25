import useFetch from "../hooks/useFetch";
import { Table, Form, Button } from 'react-bootstrap'
import MovieTableRow from '../components/MovieTableRow'
import { useSelector, useDispatch } from 'react-redux'
import { thunkFetchMovies } from "../stores/movieActionCreator";
import { useEffect, useState } from "react";
import Container from "react-bootstrap/Container";
import Col from "react-bootstrap/Col";
import '../assets/movie.css';

function MovieTable() {
    const { movies, loading } = useSelector((state) => {
        return state.movie
    })

    const [search, setSearch] = useState('')

    const dispatch = useDispatch()

    useEffect(() => {
        dispatch(thunkFetchMovies())
    }, [])

    function handleSearchChange(e) {
        setSearch(e.target.value);
    };

    const [filteredMovies, setFilteredMovies] = useState([])

    useEffect(() => {
        if (movies) {
            const filtered = movies.filter((movie) => {
                const searchTerm = search.toLowerCase();
                return (
                    movie.title.toLowerCase().includes(searchTerm) ||
                    movie.writer.toLowerCase().includes(searchTerm) ||
                    movie.director.toLowerCase().includes(searchTerm) ||
                    movie.Casts.some((cast) => cast.name.toLowerCase().includes(searchTerm)) ||
                    movie.Genre.name.toLowerCase().includes(searchTerm))
            });
            setFilteredMovies(filtered);

        }

    }, [search, movies]);



    if (loading) {
        return <>
            <Container className="pt-5">
                <Col>
                    <h1 className="text-center">Loading... Please wait.</h1>
                </Col>
            </Container>
        </>
    }


    return (
        <>

            <Form className="d-flex mb-5">
                <Form.Control
                    type="search"
                    placeholder="Search by title, writer, director, cast, genre..."
                    className="me-2"
                    aria-label="Search"
                    value={search}
                    onChange={handleSearchChange}
                />
                <Button variant="outline-success">Search</Button>
            </Form>

            <div className="table-responsive custom-table-container">
                <Table className="custom-table">
                    <thead>
                        <tr>
                            <th>#</th>
                            <th>Title</th>
                            <th>Synopsis</th>
                            <th>Media</th>
                            <th>Writer</th>
                            <th>Director</th>
                            <th>Score</th>
                            <th>Genre</th>
                            <th>Owner</th>
                            <th>Casts</th>
                            <th>Status</th>
                            <th>Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        <MovieTableRow movies={filteredMovies}></MovieTableRow>
                    </tbody>

                </Table>
            </div>

        </>

    )
}




export default MovieTable