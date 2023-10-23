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
import {RiEdit2Line, RiDeleteBin6Line} from 'react-icons/ri'


function GenreTableRow({ genres }) {
    const dispatch = useDispatch()
    const navigate = useNavigate()

    function handleEdit(id, name){
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
                                
                                <RiEdit2Line onClick={() => { handleEdit(el.id, el.name)}} className='icon'></RiEdit2Line>
                                <RiDeleteBin6Line onClick={() => { dispatch(deleteGenre(el.id)) }} className='icon'></RiDeleteBin6Line>
                            </Col>
                        </Row>
                    </td>

                </tr>
            )
        })

    )

}

export default GenreTableRow