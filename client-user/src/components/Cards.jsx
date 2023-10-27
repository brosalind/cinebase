import Card from 'react-bootstrap/Card';
import Button from 'react-bootstrap/Button';
import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row'
import { fetchMovieDetail } from '../../stores/actionCreator';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { Link } from 'react-router-dom';
import "../assets/cards.css"

function Cards({ movieData }) {

    const dispatch = useDispatch()
    const navigate = useNavigate()

    function handleClick(id) {
        dispatch(fetchMovieDetail(id))
        navigate(`/movies/${id}`)
    }

    return (
        <>
            <Row xs={1} md={3} className="g-4">
                {
                    movieData.map((movie, index) => {
                        return (
                            <Col key={index}>
                                <Link onClick={() => (handleClick(movie.id))} className="image-card-link" style={{ textDecoration: 'none' }}>
                                    <Card>
                                        <Card className="image-card">

                                            <div class="card-image-container">
                                                <Card.Img src={movie.imgUrl} alt="Image" />
                                            </div>

                                            <div className="card-overlay">
                                                <div className="card-text">
                                                    {movie.writer === movie.director ? (
                                                        <>
                                                            <p className="caption">Written and directed by</p>
                                                            <h4 className="card-overlay-text">{movie.writer}</h4>
                                                        </>
                                                    ) : (
                                                        <>
                                                            <p className="caption">Written by</p>
                                                            <h4 className="card-overlay-text">{movie.writer}</h4>
                                                            <p className="mt-3"></p>
                                                            <p className="caption">Directed by</p>
                                                            <h4 className="card-overlay-text">{movie.director}</h4>
                                                        </>
                                                    )}
                                                    <p class="caption">Starring</p>
                                                    <h4 className="card-overlay-text">
                                                        {movie.Casts.map((cast, index) => (
                                                            index === 0 ? cast.name : `, ${cast.name}`
                                                        ))}
                                                    </h4>
                                                </div>
                                            </div>
                                        </Card>
                                        {/* <div> */}
                                            <Card.Body>
                                                <Card.Title>
                                                    <p>{movie.title} ({movie.year})</p>
                                                </Card.Title>
                                            </Card.Body>
                                        {/* </div> */}
                                    </Card>
                                </Link>

                            </Col>

                        )


                    })
                }

            </Row>
        </>
    );
}

export default Cards