import { Button, Container, Form } from 'react-bootstrap'
import { thunkFetchGenres } from '../stores/genreActionCreator'
import { thunkEditMovie, thunkFetchMovies, thunkGetMovieDetails } from '../stores/movieActionCreator'
import { useSelector, useDispatch } from 'react-redux'
import { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { useNavigate } from 'react-router-dom'


function editMovieForm() {

    const { id } = useParams()
    const status = ['Currently Showing', 'Archive', 'Coming Soon']
    const dispatch = useDispatch()
    const navigate = useNavigate()
    const { genres, fetchGenresLoading, fetchGenresError } = useSelector((state) => {
        return state.genre
    })

    const { selectedMovie, selectedMovieLoading } = useSelector((state) => {
        return state.movie
    })

    const [editMovieForm, setEditMovieForm] = useState(null)
    const [editMovieFormLoading, setEditMovieFormLoading] = useState(true);

    useEffect(() => {
        dispatch(thunkFetchGenres())
        dispatch(thunkGetMovieDetails(id))
    }, [])

    useEffect(() => {
        if (selectedMovie) {
            setEditMovieForm({
                title: selectedMovie.title || '',
                imgUrl: selectedMovie.imgUrl || '',
                synopsis: selectedMovie.synopsis || '',
                trailerUrl: selectedMovie.trailerUrl || '',
                rating: selectedMovie.rating || 0,
                genreId: selectedMovie.genreId || 0,
                authorId: selectedMovie.authorId || 0,
                casts: selectedMovie.Casts || [],
                year: selectedMovie.year || 0,
                status: selectedMovie.status || '',
                director: selectedMovie.director || '',
                writer: selectedMovie.writer || '',
                stills: selectedMovie.Stills || []
            })
            setEditMovieFormLoading(false)
        }
    }, [selectedMovie])



    function handleChange(e) {
        const { value, name } = e.target
        setEditMovieForm({
            ...editMovieForm,
            [name]: value
        })
    }

    function handleCastChange(e, index) {
        const { name, value } = e.target
        const cast = [...editMovieForm.casts];
        cast[index][name] = value
        setEditMovieForm({
            ...editMovieForm,
            cast: [
                ...editMovieForm.casts,
                cast
            ]
        })
    }

    function handleStillChange(e, index) {
        const { name, value } = e.target
        const still = [...editMovieForm.stills];
        still[index][name] = value
        setEditMovieForm({
            ...editMovieForm,
            still: [
                ...editMovieForm.stills,
                still
            ]
        })
    }

    function handleSubmit(e) {
        e.preventDefault()
        dispatch((thunkEditMovie(id, editMovieForm)))
        navigate('/admin/movies')
    }

    function addNewInput() {
        setEditMovieForm({
            ...editMovieForm,
            casts: [
                ...editMovieForm.casts,
                {
                    name: '',
                    profilePict: ''
                }
            ]
        })
    }

    function addNewStill() {
        setEditMovieForm({
            ...editMovieForm,
            stills: [
                ...editMovieForm.stills,
                {
                    url: ''
                }
            ]
        })
    }

    function handleClose() {
        navigate(`/admin/movies`)
    }
    if (fetchGenresLoading || !genres.length || selectedMovieLoading || editMovieFormLoading) {
        return <h1 className="text-center">Loading... Please wait.</h1>
    }


    return (
        <>
            <Container className='d-flex justify-content-center' style={{ margin: '0 auto', marginTop: '30px' }}>
                <div>
                    <h6
                        className="sidebar-heading px-3 mt-4 mb-1 text-muted text-uppercase" style={{ textAlign: 'center' }}>
                        currently editing</h6>
                    <h3 style={{ textAlign: 'center', marginBottom: '40px' }}>{editMovieForm.title}</h3>
                    <Form onSubmit={handleSubmit} style={{ width: '800px', margin: '0 auto', marginBottom: '50px' }}>
                        <Form.Group className="mb-3">
                            <Form.Label>Movie Title</Form.Label>
                            <Form.Control type="text" placeholder="Enter a new movie name..." name="title" value={editMovieForm.title} onChange={handleChange} />

                        </Form.Group>
                        <Form.Group className="mb-3">
                            <Form.Label>Movie Synopsis</Form.Label>
                            <Form.Control type="text" placeholder="Enter a new movie synopsis..." name="synopsis" value={editMovieForm.synopsis} onChange={handleChange} />
                        </Form.Group>
                        <Form.Group className="mb-3">
                            <Form.Label>Movie Poster</Form.Label>
                            <Form.Control type="text" placeholder="Enter a new movie poster..." name="imgUrl" value={editMovieForm.imgUrl} onChange={handleChange} />
                        </Form.Group>

                        <Form.Group className="mb-3">
                            <Form.Label>Movie Trailer</Form.Label>
                            <Form.Control type="text" placeholder="Enter a new movie trailer..." name="trailerUrl" value={editMovieForm.trailerUrl} onChange={handleChange} />
                        </Form.Group>
                        <Form.Group className="mb-3">
                            <Form.Label>Writer</Form.Label>
                            <Form.Control type="text" placeholder="Enter a new movie writer..." name="writer" value={editMovieForm.writer} onChange={handleChange} />
                        </Form.Group>
                        <Form.Group className="mb-3">
                            <Form.Label>Director</Form.Label>
                            <Form.Control type="text" placeholder="Enter a new movie director..." name="director" value={editMovieForm.director} onChange={handleChange} />
                        </Form.Group>
                        <Form.Group className="mb-3">
                            <Form.Label>Year</Form.Label>
                            <Form.Control type="text" placeholder="Enter a new movie year..." name="year" value={editMovieForm.year} onChange={handleChange} />
                        </Form.Group>
                        <Form.Label>Status</Form.Label>
                        <Form.Select aria-label="Default select example" value={editMovieForm.status} onChange={handleChange} name="status" className="mb-3">
                            {
                                status.map((el, index) => {
                                    return <option value={el} key={index}>{el}</option>
                                })
                            }
                        </Form.Select>
                        <Form.Group className="mb-3">
                            <Form.Label>Movie Rating</Form.Label>
                            <Form.Control type="number" placeholder="Enter a new movie rating..." name="rating" value={editMovieForm.rating} onChange={handleChange} />
                        </Form.Group>

                        <Form.Label>Select a Movie Genre</Form.Label>
                        <Form.Select aria-label="Default select example" value={editMovieForm.genreId} onChange={handleChange} name="genreId" className="mb-3">
                            <option disabled value="" key="100">Open this select menu</option>
                            {
                                genres.map((el, index) => {
                                    return <option value={el.id} key={index}>{el.name}</option>
                                })
                            }
                        </Form.Select>

                        {
                            editMovieForm.casts.map((el, index) => {
                                return (
                                    <div key={index}>
                                        <Form.Group className="mb-3">

                                            <Form.Label >Cast Name</Form.Label>
                                            <Form.Control type="text" placeholder="Enter a new cast name..." name="name" value={el.name} onChange={(e) => { handleCastChange(e, index) }} />

                                        </Form.Group>
                                        <Form.Group className="mb-3 ">
                                            <Form.Label>Cast Profile Pict</Form.Label>
                                            <Form.Control type="text" placeholder="Enter a new cast profile pict..." name="profilePict" value={el.profilePict} onChange={(e) => { handleCastChange(e, index) }} />
                                        </Form.Group>
                                    </div>

                                )

                            }
                            )}

{
                            editMovieForm.stills.map((el, index) => {
                                return (
                                    <div key={index}>
                                        <Form.Group className="mb-3">

                                            <Form.Label >Still {index+1}</Form.Label>
                                            <Form.Control type="text" placeholder="Enter a new movie still..." name="url" value={el.url} onChange={(e) => { handleStillChange(e, index) }} />

                                        </Form.Group>
                                    
                                    </div>

                                )

                            }
                            )}

                        <div className="d-flex justify-content-center">
                            <Button variant="outline-dark" onClick={addNewInput} className='mx-2'>
                                Add Cast Member
                            </Button>
                            <Button variant="outline-dark" onClick={addNewStill} className='mx-2'>
                                Add Movie Still
                            </Button>
                            <Button variant="dark" onClick={handleSubmit} className='mx-2'>
                                Submit
                            </Button>
                            <Button variant="secondary" onClick={handleClose} className='mx-2'>
                                Cancel
                            </Button>

                        </div>
                    </Form>
                </div>
            </Container>
        </>
    )
}

export default editMovieForm