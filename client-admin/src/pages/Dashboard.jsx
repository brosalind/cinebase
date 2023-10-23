
import useToggle from '../hooks/useToggle'
import { useState } from "react"
import { useEffect } from "react"
import { useDispatch, useSelector } from "react-redux"
import { thunkFetchMovies } from "../stores/movieActionCreator"
import { thunkFetchGenres } from '../stores/genreActionCreator';
import { fetchHistory } from '../stores/adminActionCreator'
import Container from "react-bootstrap/Container";
import Col from "react-bootstrap/Col"
import Row from 'react-bootstrap/Row'
import Card from 'react-bootstrap/Card'
import Table from 'react-bootstrap/Table'
import Button from 'react-bootstrap/Button'
function Dashboard() {
    const name = localStorage.getItem('name')
    const { movies, loading } = useSelector((state) => {
        return state.movie
    })
    const { genres, fetchGenresLoading, fetchGenresError } = useSelector((state) => {
        return state.genre
    })

    const { history, historyLoading, historyError } = useSelector((state) => {
        return state.admin
    })

    const dispatch = useDispatch()

    let recentHistory;

    useEffect(() => {
        dispatch(thunkFetchMovies())
        dispatch(thunkFetchGenres())
        dispatch(fetchHistory())
    }, [])

    if (loading || fetchGenresLoading) {
        return <>
            <Container className="pt-5">
                <Col>
                    <h1 className="text-center">Loading... Please wait.
                    </h1>
                </Col>
            </Container>
        </>
    }

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


    if (history.length > 0 && !historyLoading) {
        recentHistory = [...history].splice(0, 5)
    } else {
        recentHistory = false
    }


    return (
        <>
            <Container className='d-flex justify-content-center' style={{ margin: '0 auto', marginBottom: '30px', marginTop: '30px' }}>
                <div style={{ textAlign: 'center' }}>
                    <h6
                        className="sidebar-heading px-3 mt-4 mb-1 text-muted text-uppercase" style={{ textAlign: 'center' }}>
                        welcome back
                    </h6>
                    <h3 style={{ textAlign: 'center', marginBottom: '40px' }}>{name}</h3>
                </div>
            </Container>


            <Row className="justify-content-center px-5">

                <Col xs="12" md="6" className="d-flex justify-content-center ">
                    <Card style={{ width: '300px' }}>
                        <Card.Body style={{ textAlign: 'center' }}>
                            <h6
                                className="sidebar-heading text-muted text-uppercase">Total Movies</h6>
                            <h6 className="card-title card-number" id="total-movies">{movies.length}</h6>
                        </Card.Body>
                    </Card>
                </Col>
                <Col xs="12" md="6" className="d-flex justify-content-center">
                    <Card style={{ width: '300px' }}>
                        <Card.Body style={{ textAlign: 'center' }}>
                            <h6
                                className="sidebar-heading text-muted text-uppercase">Total Genres</h6>
                            <h6 className="card-title card-number" id="total-genres">{genres.length}</h6>
                        </Card.Body>
                    </Card>
                </Col>
            </Row>
            <h3 style={{ textAlign: 'center', marginBottom: '20px', marginTop: '60px' }}>recent activity</h3>

            {recentHistory ? (
                <Container className='d-flex justify-content-center' style={{ margin: '0 auto', marginBottom: '30px' }}>
                    <Table className="table-responsive custom-table-dashboard">
                        <thead>
                            <tr>
                                <th>Date</th>
                                <th>Activity</th>
                            </tr>
                        </thead>
                        <tbody>
                            {recentHistory.map((item, index) => (
                                <tr key={index}>
                                    <td>{new Date(item.createdAt).toLocaleString(undefined, {
                                        year: "numeric",
                                        month: "short",
                                        day: "numeric",
                                        hour: "2-digit",
                                        minute: "2-digit"
                                    })}</td>
                                    <td>{item.description} by {item.by}</td>
                                </tr>
                            ))}
                        </tbody>
                    </Table>
                </Container>
            ) : (
                <Container className='justify-content-center'style={{ margin: '0 auto'}} >
                <p className="text-muted text-uppercase" style={{textAlign: 'center'}}>No activity yet.</p>
            </Container>

            )}
        </>
    )
}

export default Dashboard