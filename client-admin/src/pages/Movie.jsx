import MovieTable from "../components/MovieTable"
import { Modal } from 'react-bootstrap'
import { Button } from 'react-bootstrap'
import { Form } from 'react-bootstrap'
import useToggle from '../hooks/useToggle'
import { useState } from "react"
import { useEffect } from "react"
import { useDispatch, useSelector } from "react-redux"
import { thunkAddMovie, thunkFetchMovies } from "../stores/movieActionCreator"
import { thunkFetchGenres } from '../stores/genreActionCreator';
import Container from "react-bootstrap/Container";
import Col from "react-bootstrap/Col"
function Movie() {
    const dispatch = useDispatch()
    const status = ['Currently Showing', 'Archive', 'Coming Soon']
    const { genres, fetchGenresLoading, fetchGenresError } = useSelector((state) => {
        return state.genre
    })
    const { show, handleClose, handleShow } = useToggle(false)
    const [movieForm, setMovieForm] = useState({
        title: '',
        imgUrl: '',
        synopsis: '',
        trailerUrl: '',
        writer: '',
        director: '',
        year: 0,
        rating: 0,
        genreId: 1,
        authorId: 1,
        status: '',
        casts: [],
        stills: []
    })


    useEffect(() => {
        dispatch(thunkFetchGenres())
        dispatch(thunkFetchMovies())
    }, [])



    function handleChange(e) {
        const { value, name } = e.target
        setMovieForm({
            ...movieForm,
            [name]: value
        })
    }

    function handleCastChange(e, index) {
        const { name, value } = e.target
        const cast = [...movieForm.casts];
        cast[index][name] = value
        setMovieForm({
            ...movieForm,
            cast: [
                ...movieForm.casts,
                cast
            ]
        })
    } 

    function handleStillCbange(e, index){
        const {name, value} = e.target
        const still = [...movieForm.stills];
        still[index][name] = value
        setMovieForm({
            ...movieForm,
            still: [
                ...movieForm.stills,
                still
            ]
        })
        }

    

    function handleSubmit(e) {
        e.preventDefault()
        dispatch((thunkAddMovie(movieForm)))
        handleClose()
    }

    function addNewInput() {
        setMovieForm({
            ...movieForm,
            casts: [
                ...movieForm.casts,
                {
                    name: '',
                    profilePict: ''
                }
            ]
        })
    }

    function addNewMedia() {
        setMovieForm({
            ...movieForm,
            stills: [
                ...movieForm.stills,
                {
                    url: ''
                }
            ]
        })
    }

    if (fetchGenresLoading || !genres.length) {
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
            <Container className='d-flex justify-content-center' style={{ margin: '0 auto', marginBottom: '30px', marginTop: '30px' }}>
                <div>
                    <h6
                        className="sidebar-heading px-3 mt-4 mb-1 text-muted text-uppercase" style={{ textAlign: 'center' }}>
                        currently viewing</h6>
                    <h3 style={{ textAlign: 'center', marginBottom: '30px' }}>Movie Database</h3>
                    <div className="d-flex justify-content-center mb-5">
                        <Button variant="outline-dark" onClick={handleShow} className="custom-button" style={{ marginLeft: '10px' }}>
                            Add a New Movie
                        </Button>
                    </div>

                    <Modal show={show} onHide={handleClose}>
                        <Modal.Header closeButton>
                            <Modal.Title>Add a New Movie</Modal.Title>
                        </Modal.Header>
                        <Modal.Body>
                            <Form onSubmit={handleSubmit}>
                                <Form.Group className="mb-3">
                                    <Form.Label>Movie Title</Form.Label>
                                    <Form.Control type="text" placeholder="Enter a new movie name..." name="title" value={movieForm.title} onChange={handleChange} />

                                </Form.Group>
                                <Form.Group className="mb-3">
                                    <Form.Label>Movie Synopsis</Form.Label>
                                    <Form.Control type="text" placeholder="Enter a new movie synopsis..." name="synopsis" value={movieForm.synopsis} onChange={handleChange} />
                                </Form.Group>
                                <Form.Group className="mb-3">
                                    <Form.Label>Movie Poster</Form.Label>
                                    <Form.Control type="text" placeholder="Enter a new movie poster..." name="imgUrl" value={movieForm.imgUrl} onChange={handleChange} />
                                </Form.Group>

                                <Form.Group className="mb-3">
                                    <Form.Label>Movie Trailer</Form.Label>
                                    <Form.Control type="text" placeholder="Enter a new movie trailer..." name="trailerUrl" value={movieForm.trailerUrl} onChange={handleChange} />
                                </Form.Group>
                                <Form.Group className="mb-3">
                                    <Form.Label>Writer</Form.Label>
                                    <Form.Control type="text" placeholder="Enter a new movie writer..." name="writer" value={movieForm.writer} onChange={handleChange} />
                                </Form.Group>
                                <Form.Group className="mb-3">
                                    <Form.Label>Director</Form.Label>
                                    <Form.Control type="text" placeholder="Enter a new movie director..." name="director" value={movieForm.director} onChange={handleChange} />
                                </Form.Group>
                                <Form.Group className="mb-3">
                                    <Form.Label>Year</Form.Label>
                                    <Form.Control type="text" placeholder="Enter a new movie year..." name="year" value={movieForm.year} onChange={handleChange} />
                                </Form.Group>
                                <Form.Label>Status</Form.Label>
                                <Form.Select aria-label="Default select example" value={movieForm.status} onChange={handleChange} name="status" className="mb-3">
                                    {
                                        status.map((el, index) => {
                                            return <option value={el} key={index}>{el}</option>
                                        })
                                    }
                                </Form.Select>
                                <Form.Group className="mb-3">
                                    <Form.Label>Movie Rating</Form.Label>
                                    <Form.Control type="number" placeholder="Enter a new movie rating..." name="rating" value={movieForm.rating} onChange={handleChange} />
                                </Form.Group>

                                <Form.Label>Select a Movie Genre</Form.Label>
                                <Form.Select aria-label="Default select example" value={movieForm.genre} onChange={handleChange} name="genreId" className="mb-3">
                                    <option disabled value="">Open this select menu</option>
                                    {
                                        genres.map((el, index) => {
                                            return <option value={el.id} key={index}>{el.name}</option>
                                        })
                                    }
                                </Form.Select>
                                {
                                    movieForm.casts.map((el, index) => {
                                        return (
                                            <>
                                                <div key={index + 1}>
                                                    <Form.Group key={index} className="mb-3">

                                                        <Form.Label>Cast Name</Form.Label>
                                                        <Form.Control type="text" placeholder="Enter a new cast name..." name="name" value={movieForm.casts[index].name} onChange={(e) => { handleCastChange(e, index) }} />

                                                    </Form.Group>
                                                    <Form.Group className="mb-3" key={index}>
                                                        <Form.Label>Cast Profile Pict</Form.Label>
                                                        <Form.Control type="text" placeholder="Enter a new cast profile pict..." name="profilePict" value={movieForm.casts[index].profilePict} onChange={(e) => { handleCastChange(e, index) }} />
                                                    </Form.Group>
                                                </div>
                                            </>
                                        )
                                    }
                                    )}
                                    
                                    {
                                    movieForm.stills.map((el, index) => {
                                        return (
                                            <>
                                                <div key={index + 1}>
                                                    <Form.Group key={`still-url-${index}`} className="mb-3">

                                                        <Form.Label>Still {index+1} Url</Form.Label>
                                                        <Form.Control type="text" placeholder="Enter a new still..." name="url" value={movieForm.stills[index].url} onChange={(e) => { handleStillCbange(e, index) }} />

                                                    </Form.Group>
                            
                                                </div>
                                            </>
                                        )
                                    }
                                    )}

                            </Form>
                        </Modal.Body>
                        <Modal.Footer>
                            <Button variant="outline-dark" onClick={addNewInput}>
                                Add Cast Member
                            </Button>
                            <Button variant="outline-dark" onClick={addNewMedia}>
                                Add Movie Still
                            </Button>
                            <Button variant="dark" onClick={handleSubmit}>
                                Submit
                            </Button>
                            <Button variant="secondary" onClick={handleClose}>
                                Close
                            </Button>
                        </Modal.Footer>
                    </Modal>

                    <MovieTable></MovieTable>
                </div>
            </Container>
        </>
    )
}

export default Movie