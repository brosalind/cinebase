import { Button } from 'react-bootstrap'
import CastList from './CastList'
import { useDispatch } from 'react-redux'
import { thunkDeleteMovie, thunkGetMovieDetails } from "../stores/movieActionCreator";
import { useNavigate } from 'react-router-dom';

function MovieTableRow({movies}) {
    const dispatch = useDispatch()
    const navigate = useNavigate()
    function handleEdit(id){
        dispatch(thunkGetMovieDetails(id))
        navigate(`/admin/movies/${id}/edit`)
    }
  
    return (
        movies.map((mv, index) => {
            return (
                <tr key={mv.id}>
                    <td> {index + 1}</td>
                    <td>{mv.title}</td>
                    <td><img src={mv.imgUrl} className='img-fluid' /></td>
                    <td>{mv.synopsis}</td>
                    <td><iframe src={mv.trailerUrl}></iframe></td>
                    <td>{mv.rating}</td>
                    <td>{mv.Genre.name}</td>
                    <td>user for now</td>
                    {/* <td>{mv.User.username}</td> */}
                    <td>
                        <CastList cast={mv.Casts}></CastList>
                    </td>
                   {/* <Button onClick={() => {dispatch(thunkGetMovieDetails(mv.id))}}>Edit</Button> */}
                    <td><Button onClick={() => handleEdit(mv.id)}>Edit</Button>
                    
                    <Button onClick={() => {dispatch(thunkDeleteMovie(mv.id))}}>Delete</Button></td>
                </tr>
            )
        })

    )

}

export default MovieTableRow