import HistoryTableRow from "../components/HistoryTableRow";
import {useEffect } from "react"
import { useDispatch, useSelector } from "react-redux";
import { Container, Table, Col, Row } from "react-bootstrap";
import { fetchHistory } from '../stores/adminActionCreator'

function History() {
    const { history, historyLoading, historyError } = useSelector((state) => {
        return state.admin
    })
    const dispatch = useDispatch()

    useEffect(() => {
        dispatch(fetchHistory())
    }, [])

    if (historyLoading) {
        return <>
            <Container className="pt-5">
                <Col>
                    <hr></hr>
                    <h1 className="text-center">Looking up history... Please wait.
                    </h1>
                </Col>
            </Container>
        </>
    }


    return (
        <>
            <Container className='d-flex justify-content-center' style={{ margin: '0 auto', marginBottom: '30px', marginTop: '30px' }}>
                <div style={{ width: '100%' }}>
                    <h6
                        className="sidebar-heading px-3 mt-4 mb-1 text-muted text-uppercase" style={{ textAlign: 'center' }}>
                        currently viewing</h6>
                    <h3 style={{ textAlign: 'center', marginBottom: '30px' }}>History</h3>

                    {history.length ? ( <Container className="d-flex justify-content-center align-items-center">
                        <Table className="table-responsive custom-table-container">

                            <thead>
                                <tr>
                                    <th>Date</th>
                                    <th>Description</th>
                                </tr>
                            </thead>
                            <tbody>
                                <HistoryTableRow histories={history}></HistoryTableRow>
                            </tbody>

                        </Table>
                    </Container>  ) : (
                <Container className='justify-content-center'style={{ margin: '0 auto'}} >
                <p className="text-muted text-uppercase" style={{textAlign: 'center'}}>No activity yet.</p>
            </Container>

            )}
                </div>
            </Container>

        </>
    )
}

export default History