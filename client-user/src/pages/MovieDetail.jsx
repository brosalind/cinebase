import { useParams } from "react-router-dom"
import { useSelector, useDispatch } from "react-redux"
import { useEffect } from "react"
import { fetchMovieDetail } from "../../stores/actionCreator"
import { Container, Row, Col } from "react-bootstrap"
import '../assets/movieDetail.css'
function MovieDetail(){
    const {id} = useParams()
    const dispatch = useDispatch()
    const {selectedMovie, selectedMovieLoading, selectedMovieError} = useSelector((state)=> {return state})

    useEffect(() => {
        dispatch(fetchMovieDetail(id))
    }, [])


    if (selectedMovieLoading){
        return <h1 className="text-center">Loading data.. Please wait.</h1>
    } else {
        if(!selectedMovieError){
            return <>
        <h1 className="text-center">404</h1>
        <p className="text-center">The movie you're looking for does not exist. </p>
        </>
        }
        else if (!selectedMovie.Genre || !selectedMovie.User || !selectedMovie.Casts){
            return <h1 className="text-center">Loading data.. Please wait.</h1>
        }
    }


 
    return(
        <>
        <Container className="d-flex justify-content-center align-items-start pt-5">
      <div className="embed-responsive embed-responsive-16by9">
     
        
      </div>
      </Container>

      <Container className="text-center pt-5">
      <h1> {selectedMovie.title}</h1>
      </Container>

      <Container className="text-left pb-5 pt-5">
        <Row>
            <Col>
            <p class="caption">Genre </p> <h4>{selectedMovie.Genre.name}</h4>
            </Col>
            <Col>
            <p class="caption">Added by </p> <h4>{selectedMovie.User.username}</h4>
            </Col>
            <Col>
            <p class="caption">Watch trailer </p>  <iframe className="embed-responsive-item" src={selectedMovie.trailerUrl} alt={selectedMovie.trailerUrl} ></iframe>
            <h5><a href={selectedMovie.trailerUrl}>or here if video does not render.</a></h5>
            
            </Col>
     
      </Row>
      <p></p>
      <p class="caption">Starring</p>
        <Row xs={1} md={3} className="g-4">

            {
                selectedMovie.Casts.map((cast, index)=> {
                    return (
                        <>
                        <Col key={index}>
                        <h4>{cast.name}</h4>
                        <div className="image-wrapper">
                        <img src={cast.profilePict} className="img-fluid"/>
                        </div>
                        </Col>
                        </>
                        
                    )
                })
            }
        </Row>

      </Container>
      <hr></hr>
      
        <Container className="text-container pb-5 pt-5">
   
        <h3>{selectedMovie.synopsis}</h3>
 
        </Container>

        <Container className="text-center">
        <img src={selectedMovie.imgUrl} className="img-fluid" style={{maxWidth: "300px"}} />
        <p>slug: {selectedMovie.slug}</p>
        </Container>

        </>
    )
}

export default MovieDetail