import { Button } from 'react-bootstrap'
import CastList from './CastList'
import { useDispatch } from 'react-redux'
import { thunkDeleteMovie, thunkGetMovieDetails } from "../stores/movieActionCreator";
import { useNavigate } from 'react-router-dom';
import { RiEdit2Line, RiDeleteBin6Line } from 'react-icons/ri'


function MovieTableRow({ movies }) {
    const dispatch = useDispatch()
    const navigate = useNavigate()

    function handleEdit(id) {
        dispatch(thunkGetMovieDetails(id))
        navigate(`/admin/movies/${id}/edit`)
    }

    return (
        movies.map((mv, index) => {
            return (
                <tr key={mv.id}>
                    <td> {index + 1}</td>
                    <td><img src={mv.imgUrl} className='img-fluid' /> {mv.title} ({mv.year})</td>
                    <td>{mv.synopsis}</td>
                    <td><iframe src={`https://www.youtube.com/embed/${mv.trailerUrl}`}
                        style={{ maxWidth: '150px' }}></iframe>
                      {
                        mv.Stills.map((el) => {
                            return (
                                <>
                                <img src={el.url} width="150px" style={{marginBottom: '10px'}}></img>
                                </>

                            )
                           
                        })
                      }
                        </td>
                    <td>{mv.writer}</td>
                    <td>{mv.director}</td>
                    <td style={{textAlign: 'center'}}>{mv.rating}</td>
                    <td>{mv.Genre.name}</td>
                    <td>{mv.User.username}</td>
                    <td>
                        <CastList cast={mv.Casts}></CastList>
                    </td>
                    <td>
                        {mv.status}
                    </td>
                    <td> <RiEdit2Line onClick={() => handleEdit(mv.id)} className='icon'> </RiEdit2Line>

                        <RiDeleteBin6Line onClick={() => { dispatch(thunkDeleteMovie(mv.id)) }} className='icon'>Delete</RiDeleteBin6Line></td>
                </tr>
            )
        })

    )

}

export default MovieTableRow