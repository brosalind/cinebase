import { Button } from 'react-bootstrap'
import { useDispatch } from 'react-redux'
import { deleteGenre } from '../stores/genreActionCreator'
import Col from 'react-bootstrap/Col'
import Row from 'react-bootstrap/Row'
import Modal from 'react-bootstrap/Modal'
import Form from 'react-bootstrap/Form'
import useToggle from '../hooks/useToggle'
import { useState } from 'react'
import { useNavigate } from 'react-router-dom'

function GenreTableRow({ genres }) {
    const dispatch = useDispatch()
    const navigate = useNavigate()

    function handleEdit(id, name){
        console.log(id, name)
        navigate(`/admin/genres/edit/${name}/${id}`)
    }
    
    return (
        genres.map((el) => {
            return (
                <tr key={el.id}>
                    <td> {el.id}</td>
                    <td>{el.name}</td>
                    <td>
                        <Row>
                            <Col>
                                <Button onClick={() => { dispatch(deleteGenre(el.id)) }}>Delete</Button>
                                <Button onClick={() => { handleEdit(el.id, el.name)}}>Edit</Button>
                            </Col>
                        </Row>
                    </td>

                </tr>
            )
        })

    )

}

export default GenreTableRow