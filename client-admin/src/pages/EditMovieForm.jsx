import { Button } from 'react-bootstrap'
import { Form } from 'react-bootstrap'
import { thunkFetchGenres } from '../stores/genreActionCreator'
import { thunkEditMovie, thunkGetMovieDetails } from '../stores/movieActionCreator'
import { useSelector, useDispatch } from 'react-redux'
import { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { useNavigate } from 'react-router-dom'


function editMovieForm() {

    const { id } = useParams()

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
                trailerUrl: selectedMovie.trailer || '',
                rating: selectedMovie.rating || 0,
                genreId: selectedMovie.genreId || 0,
                authorId: selectedMovie.authorId || 0,
                casts: selectedMovie.Casts || [],
                year: selectedMovie.year || 0,
                director: selectedMovie.director || '',
                writer: selectedMovie.writer || ''
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

    function handleSubmit(e) {
        e.preventDefault()
        console.log("submit", editMovieForm)
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

    function handleClose() {
        navigate(`/admin/movies`)
    }
    if (fetchGenresLoading || !genres.length || selectedMovieLoading || editMovieFormLoading) {
        return <h1 className="text-center">Loading... Please wait.</h1>
    }


    return (
        <>
            <Form onSubmit={handleSubmit}>
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
                <Form.Group className="mb-3">
                    <Form.Label>Movie Rating</Form.Label>
                    <Form.Control type="number" placeholder="Enter a new movie rating..." name="rating" value={editMovieForm.rating} onChange={handleChange} />
                </Form.Group>

                <Form.Label>Select a Movie Genre</Form.Label>
                <Form.Select aria-label="Default select example" value={editMovieForm.genre} onChange={handleChange} name="genreId">
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
                                <Form.Group>

                                    <Form.Label>Cast Name</Form.Label>
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

                <Button variant="primary" onClick={addNewInput}>
                    Add Cast Member
                </Button>
                <Button variant="secondary" onClick={handleSubmit}>
                    Submit
                </Button>
                <Button variant="secondary" onClick={handleClose}>
                    Cancel
                </Button>

            </Form>
        </>
    )
}

export default editMovieForm