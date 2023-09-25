import { useState } from "react"
import Form from 'react-bootstrap/Form'
import { Container } from "react-bootstrap"
import Button from 'react-bootstrap/Button'
import { useParams } from "react-router-dom"
import { useDispatch } from "react-redux"
import { useSelector } from "react-redux"
import { editGenre } from "../stores/genreActionCreator"
// import { useNavigate } from "react-router-dom"
import { redirect } from "react-router-dom"


function editGenreForm(){

    const {name, id} = useParams()
    const dispatch = useDispatch()
    // const navigate =useNavigate()
    const {editGenreLoading} = useSelector((state)=> {return state.genre})

const [editGenreForm, setEditGenreForm] = useState({
    name: name
})

function handleSubmit(e, id){
    e.preventDefault()
    dispatch((editGenre(id, editGenreForm)))
}

function handleChange(e){
    const {value, name} = e.target
    console.log(value, name)
    setEditGenreForm({
        ...editGenreForm,
        [name]: value
    })
}

// if(editGenreLoading){
//     return <h1 className="text-center">Processing your request. Please wait.</h1>
// }

return (
    <>
    <h1>Edit Genre Form</h1>
    <Container>
        <div className="m-auto">
        <Form onSubmit={(e) => {handleSubmit(e, id)}}>
                <div className="mb-3">
                  <div className="d-flex justify-content-between">
                    <Form.Label>Genre Name</Form.Label>
                  </div>
                  <Form.Control type="text" className="form-control"
                     value={editGenreForm.name} onChange={handleChange} name="name"/>
                </div>
                <Button className="btn btn-lg btn-primary rounded-pill w-100 p-2 mt-3" type="submit">Sign Up</Button>
                </Form>
                </div>
               
                </Container>
    </>
)


}

export default editGenreForm