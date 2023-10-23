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
            <Container className='d-flex justify-content-center' style={{ margin: '0 auto', marginBottom: '30px', marginTop: '30px' }}>
                <div style={{width: '100%'}}>
                    <h6
                        className="sidebar-heading px-3 mt-4 mb-1 text-muted text-uppercase" style={{ textAlign: 'center' }}>
                        currently viewing</h6>
                    <h3 style={{ textAlign: 'center', marginBottom: '30px' }}>Genre Database</h3>
                    <div className="d-flex justify-content-center mb-5">
                    <Button variant="outline-dark" onClick={handleShow}>
                        Add Genre
                    </Button>
                    </div>

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
                            <Button variant="dark" onClick={handleSubmit}>
                                Submit
                            </Button>
                            <Button variant="secondary" onClick={handleClose}>
                                Close
                            </Button>

                        </Modal.Footer>
                    </Modal>
                    <GenreTable>
                    </GenreTable>
                </div>
            </Container>
        </>
    )
}

export default Genre