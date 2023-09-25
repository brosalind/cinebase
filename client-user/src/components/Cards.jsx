import Card from 'react-bootstrap/Card';
import Button from 'react-bootstrap/Button';
import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row'
import { fetchMovieDetail } from '../../stores/actionCreator';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';

function Cards({movieData}) {

    const dispatch = useDispatch()
    const navigate = useNavigate()

    function handleClick(id){
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
                     <Card>
                <Card.Img variant="top" src={movie.imgUrl} />
                <Card.Body>
                    <Card.Title>{movie.title}</Card.Title>
                    <Card.Text>
                    {movie.synopsis}
                    </Card.Text>
                    <Button variant="primary" onClick={() => (handleClick(movie.id))}>More</Button>
                </Card.Body>
            </Card>
            </Col>

                )
                
                
            })
        }
            
        </Row>
        </>
    );
}

export default Cards