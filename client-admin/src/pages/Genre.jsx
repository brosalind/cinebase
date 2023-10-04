import GenreTable from "../components/GenreTable";
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import useToggle from '../hooks/useToggle'
import Form from 'react-bootstrap/Form';
import { useState } from "react"
import { useDispatch } from "react-redux";
import { addGenre } from "../stores/genreActionCreator";
import { Container } from "react-bootstrap";

function Genre() {
    const dispatch = useDispatch()
    const { show, handleShow, handleClose } = useToggle(false)
    const [genreName, setGenreName] = useState('')
    function handleChange(e) {
        setGenreName(e.target.value)
    }
    function handleSubmit(e) {
        e.preventDefault()
        dispatch(addGenre(genreName))
        handleClose()
    }
    return (
        <>
        <Container className="pt-5">
            <Button variant="dark" onClick={handleShow}>
                Add Genre
            </Button>

            <Modal show={show} onHide={handleClose}>
                <Modal.Header closeButton>
                    <Modal.Title>Add a New Genre</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Form onSubmit={handleSubmit}>
                        <Form.Group className="mb-3">
                            <Form.Label>Genre Name</Form.Label>
                            <Form.Control type="text" placeholder="Enter a new genre name..." name="genreName" value={genreName} onChange={handleChange} />
                        </Form.Group>
                    </Form>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="btn btn-outline-secondary" onClick={handleClose}>
                        Close
                    </Button>
                    <Button variant="btn btn-outline-dark" onClick={handleSubmit}>
                        Save Changes
                    </Button>
                </Modal.Footer>
            </Modal>
            <GenreTable>
            </GenreTable>
            </Container>
        </>
    )
}

export default Genre