import { Button } from 'react-bootstrap'
import { useDispatch } from 'react-redux'
import { deleteGenre } from '../stores/genreActionCreator'
import Col from 'react-bootstrap/Col'
import Row from 'react-bootstrap/Row'
import Modal from 'react-bootstrap/Modal'


function HistoryTableRow({ histories }) {
    const dispatch = useDispatch()
    
    return (
        histories.map((el) => {
            return (
                <tr key={el.id}>
                     <td>{new Date(el.createdAt).toLocaleString(undefined, {
                                        year: "numeric",
                                        month: "short",
                                        day: "numeric",
                                        hour: "2-digit",
                                        minute: "2-digit"
                                    })}</td>
                                    <td>{el.description} by {el.by}</td>

                </tr>
            )
        })

    )

}

export default HistoryTableRow