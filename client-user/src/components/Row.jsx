import { Container, Row, Col, Image, Card, Button } from 'react-bootstrap';
import "../assets/row.css"
import {BsArrowRight} from 'react-icons/bs'
import { fetchMovieDetail } from '../../stores/actionCreator';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';


function MovieRow({ movies }) {
    const filteredMovies = movies.filter(movie => movie.Stills && movie.Stills.length > 1).slice(0, 4)

    const dispatch = useDispatch()
    const navigate = useNavigate()

    function handleClick(id) {
        dispatch(fetchMovieDetail(id))
        navigate(`/movies/${id}`)
    }
    return (
        <Container>
            {filteredMovies.map((movie, index) => (
                <Row key={index} className={index % 2 === 0 ? 'even' : 'odd'} style={{marginBottom: '50px', marginTop: '50px'}}>
                    <Col sm={6} className="image-col">
                        <Image src={movie.Stills[1].url} alt="Movie Poster" fluid style={{
        objectFit: 'cover',
        width: '100%',
        height: '100vh',
      }} />
                    </Col>
                    <Col sm={6} className="synopsis-col">
                        <Card>
                            <Card.Body>
                            <p class="caption">FILM</p>
                                <h4>{movie.title}</h4>
                                <Button variant="outline-dark" onClick={() => (handleClick(movie.id))}  className="custom-button">
                                    <BsArrowRight></BsArrowRight> Watch Now
                                </Button>
                            </Card.Body>
                        </Card>
                    </Col>
                </Row>
            ))}
        </Container>
    );
};

export default MovieRow;
