import { Modal } from 'react-bootstrap'
import { Button } from 'react-bootstrap'
import useToggle from '../hooks/useToggle'

function CastList({ cast }) {
    const { show, handleClose, handleShow } = useToggle(false)
    return (
        <>
            <Button variant="primary" onClick={handleShow}>
                Show Casts
            </Button>
            <Modal show={show} onHide={handleClose}>
                <Modal.Header closeButton>
                    <Modal.Title>Cast List</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <div className="container-fluid">
                        <div className="row">
                            {cast.map((actor, index) => {
                                return (
                                    <div className="col-md-6" key={index}>

                                        <p key={actor.id}> {actor.name}
                                            <img src={actor.profilePict} className="img-fluid" />
                                        </p>

                                    </div>

                                )
                            })
                            }
                        </div>

                    </div>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={handleClose}>
                        Close
                    </Button>
                </Modal.Footer>
            </Modal>
        </>

    )

}

export default CastList