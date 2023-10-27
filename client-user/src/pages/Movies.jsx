import { useEffect } from "react"
import Cards from "../components/Cards"
import Container from "react-bootstrap/Container"
import { useSelector, useDispatch } from "react-redux"
import { fetchMovies } from "../../stores/actionCreator"

function Movies() {
    const {movies, loading, error} = useSelector((state) => { return state })
    const dispatch = useDispatch()

    useEffect(() => {
        dispatch(fetchMovies())
    }, [])

    if (loading){
        return <h1 className="text-center">Loading data.. Please wait.</h1>
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
        <Container>
            <h1>Upcoming</h1>
            <Cards movieData={movies}></Cards>
            <h1 className="text-center"> All Films</h1>
            <Cards movieData={movies}></Cards>

        </Container>
        </>
    )
}

export default Movies