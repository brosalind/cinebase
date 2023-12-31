import Banner from '../components/Carousel'
import { useEffect } from "react"
import Cards from "../components/Cards"
import Container from 'react-bootstrap/Container'
import { useSelector, useDispatch } from "react-redux"
import { fetchMovies } from "../../stores/actionCreator"
import MovieRow from '../components/Row'

function Home() {
    const { movies, loading, error } = useSelector((state) => { return state })
    const dispatch = useDispatch()


    useEffect(() => {
        dispatch(fetchMovies())
    }, [])


    if (loading) {
        return <div style={{ backgroundColor: "black" }}></div>
    }
    return (
        <>
            <div className="vh-100 slideshow-container">
                <Banner picture={{ movies }}></Banner>

            </div>


            <MovieRow movies={movies}>

            </MovieRow>
           
        </>
    )
}

export default Home