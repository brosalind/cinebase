import { useState } from "react"
import Form from 'react-bootstrap/Form'
import { Container } from "react-bootstrap"
import Button from 'react-bootstrap/Button'
import { useParams } from "react-router-dom"
import { useDispatch } from "react-redux"
import { useSelector } from "react-redux"
import { editGenre } from "../stores/genreActionCreator"
import { useNavigate } from "react-router-dom"


function editGenreForm() {
    const url = useParams()
    const dispatch = useDispatch()
    const navigate = useNavigate()
    const { editGenreLoading } = useSelector((state) => { return state.genre })

    const [editGenreForm, setEditGenreForm] = useState({
        name: url.name
    })

    function handleSubmit(e, id) {
        e.preventDefault()
        dispatch((editGenre(url.id, editGenreForm)))
        navigate('/admin/genres')
    }

    function handleChange(e) {
        const { value, name } = e.target
        setEditGenreForm({
            ...editGenreForm,
            [name]: value
        })
    }
    function handleClose() {
        navigate(`/admin/genres`)
    }

    if(editGenreLoading){
        return <h1 className="text-center">Processing your request. Please wait.</h1>
    }

    return (
        <>
            <Container className='d-flex justify-content-center' style={{ margin: '0 auto', marginTop: '30px' }}>
                <div>
                    <h6
                        className="sidebar-heading px-3 mt-4 mb-1 text-muted text-uppercase" style={{ textAlign: 'center' }}>
                        currently editing</h6>
                    <h3 style={{ textAlign: 'center', marginBottom: '40px' }}>{editGenreForm.name}</h3>
                    <Form onSubmit={(e) => { handleSubmit(e, id) }} style={{ width: '800px', margin: '0 auto', marginBottom: '50px' }}>

                        <div className="mb-3">
                            <div className="d-flex justify-content-between">
                                <Form.Label>Genre Name</Form.Label>
                            </div>
                            <Form.Control type="text" className="form-control"
                                value={editGenreForm.name} onChange={handleChange} name="name" />
                        </div>
                        <div className="d-flex justify-content-center">
                   
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

export default editGenreForm