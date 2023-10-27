import React from "react";
import { useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react";
import { fetchMovies } from "../../stores/actionCreator";
import { useLocation } from "react-router-dom";
import { Container } from "react-bootstrap";
import Cards from "../components/Cards";
function SearchResults() {
    const location = useLocation();
    const query = new URLSearchParams(location.search).get("query");
    
    const { movies, loading, error } = useSelector((state) => { return state })
    const dispatch = useDispatch()
    const [searched, setSearched] = useState([])

    useEffect(() => {

        if (movies) {
            const filtered = movies.filter((movie) =>
                movie.title.toLowerCase().includes(query.toLowerCase())
            );
            setSearched(filtered)
        }
    }, [movies, query]);

    useEffect(() => {
        dispatch(fetchMovies())
    }, [])
    return (
        <Container style={{marginTop: '150px'}}>
            <h2>Search Results for: {query}</h2>
            <hr style={{marginBottom: '40px'}}></hr>
            <Cards movieData={searched}></Cards>
        
        </Container>
    );
}

export default SearchResults;