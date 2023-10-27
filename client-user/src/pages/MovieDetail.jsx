import { useParams } from "react-router-dom"
import { useSelector, useDispatch } from "react-redux"
import { useEffect } from "react"
import { fetchMovieDetail } from "../../stores/actionCreator"
import { Container, Row, Col, Button } from "react-bootstrap"
import "../assets/movieDetail.css"
import { RxArrowTopRight } from "react-icons/rx";


function MovieDetail() {
    const { id } = useParams()
    const dispatch = useDispatch()
    const { selectedMovie, selectedMovieLoading, selectedMovieError } = useSelector((state) => { return state })

    useEffect(() => {
        dispatch(fetchMovieDetail(id))
    }, [])


    if (selectedMovieLoading) {
        return <div style={{backgroundColor: "black"}}></div>
    } else {
        if (!selectedMovieError) {
            return <>
                <h1 className="text-center">404</h1>
                <p className="text-center">The movie you're looking for does not exist. </p>
            </>
        }
        else if (!selectedMovie.Genre || !selectedMovie.User || !selectedMovie.Casts) {
            return <div style={{backgroundColor: "black"}}></div>
        }
    }



    return (
        <>

            <Container style={{ maxWidth: '100vw', margin: '0', padding: '0' }}>
                <iframe className="embed-responsive-item" src={`https://www.youtube.com/embed/${selectedMovie.trailerUrl}?autoplay=1&controls=0&rel=0&showinfo=0&modestBranding=1`} alt={selectedMovie.trailerUrl} style={{
                    width: "100%",
                    height: "720px"
                }} allowFullScreen  ></iframe>
            </Container>



            <Container className="text-center pt-5">
                <h1> {selectedMovie.title}</h1>
            </Container>

            <Container className="text-left pb-5 pt-5">
                <Row>
                    <Col>
                        {selectedMovie.writer === selectedMovie.director ? (
                            <>
                                <p className="caption">Written and directed by</p>
                                <h4>{selectedMovie.writer}</h4>
                            </>
                        ) : (
                            <>
                                <p className="caption">Written by</p>
                                <h4>{selectedMovie.writer}</h4>
                                <p className="mt-3"></p>
                                <p className="caption">Directed by</p>
                                <h4>{selectedMovie.director}</h4>
                            </>
                        )}
                    </Col>
                    <Col >
                        <p class="caption">Year </p> <h4>{selectedMovie.year}</h4>
                    </Col>

                    <Col>
                        <p class="caption">Genre </p> <h4>{selectedMovie.Genre.name}</h4>
                        <Button variant="outline-dark" onClick="" className="custom-button">
                           <RxArrowTopRight></RxArrowTopRight> Watch Now
                        </Button>


                    </Col>

                </Row>
                <p></p>
                <p class="caption">Starring</p>
                <Row xs={1} md={3} className="g-4">

                    {
                        selectedMovie.Casts.map((cast, index) => {
                            return (
                                <>
                                    <Col key={index}>
                                        <h4>{cast.name}</h4>
                                        <div className="image-wrapper">
                                            <img src={cast.profilePict} className="img-fluid" />
                                        </div>
                                    </Col>
                                </>

                            )
                        })
                    }
                </Row>

            </Container>
            <hr></hr>

            <Container className="d-flex pb-5 pt-5">

                <Col className="text-container">
                    <h3>{selectedMovie.synopsis}</h3>
                </Col>

                <Col className="picture-container">
                    <img src={selectedMovie.imgUrl} className="img-fluid" style={{ width: "300px", height: "428px" }} />
                </Col>
            </Container>


            <Container>
            <Row className="justify-content-center">
        {selectedMovie.Stills &&
            selectedMovie.Stills.map((still, index) => (
                <Col xs={6} md={6} lg={6} key={index}>
                    <div className="stills-wrapper">
                        <img src={still.url} className="img-fluid" />
                    </div>
                </Col>
            ))}
    </Row>

            </Container>

        </>
    )
}

export default MovieDetail