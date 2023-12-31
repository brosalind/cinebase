import { useEffect, useState } from "react"
import Cards from "../components/Cards"
import Container from "react-bootstrap/Container"
import { useSelector, useDispatch } from "react-redux"
import { fetchMovies } from "../../stores/actionCreator"

function Movies() {
    const {movies, loading, error} = useSelector((state) => { return state })
    const dispatch = useDispatch()

    const [upcomingMovies, setUpcomingMovies] = useState([])
    const [allMovies, setAllMovies] = useState([])

    useEffect(() => {
        if (movies) {
            const filtered = movies.filter((movie) => {
                return (
                    movie.status.toLowerCase().includes('coming soon'))})
            setUpcomingMovies(filtered);
        }
    }, [movies]);

    useEffect(() => {
        if (movies) {
            const filtered = movies.filter((movie) => {
                return (
                    movie.status.toLowerCase().includes('archive') ||
                movie.status.toLowerCase().includes('currently showing')) })
            setAllMovies(filtered);
        }
    }, [movies]);

    useEffect(() => {
        dispatch(fetchMovies())
    }, [])

    if (loading){
        return <>
        <div style={{backgroundColor: "black"}}></div>
        </>
    } else {
        if(!error){
            return <>
        <h1 className="text-center">500</h1>
        <p className="text-center">We're sorry. Something went wrong. </p>
        </>
        }
        else if (!movies[0].Genre || !movies[0].User || !movies[0].Casts){
            return <h1 className="text-center">Loading data.. Please wait.</h1>
        }
    }

    return (
        <>
        <Container style={{marginTop: '150px'}}>
            <h2>Upcoming</h2>
            <Cards movieData={upcomingMovies}></Cards>
            <h2 style={{ marginTop: '50px'}}>All Films</h2>
            <Cards movieData={allMovies}></Cards>

        </Container>
        </>
    )
}

export default Movies