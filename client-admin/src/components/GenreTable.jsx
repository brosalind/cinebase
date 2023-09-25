import {Table} from 'react-bootstrap'
import GenreTableRow from '../components/GenreTableRow'
import { useSelector, useDispatch } from "react-redux";
import { useEffect } from "react";
import { thunkFetchGenres } from "../stores/genreActionCreator";

function GenreTable() {
    const {genres, fetchGenresLoading, fetchGenresError} = useSelector((state) => {
        return state.genre
    })
    const dispatch = useDispatch()

    useEffect(() => {
        dispatch(thunkFetchGenres())
    }, [])

    if(fetchGenresLoading || !genres.length){
        return <h1 className="text-center">Loading... Please wait.</h1>
    }


    return (
        <Table>
            <thead>
                <tr>
                    <th>#</th>
                    <th>Name</th>
                    <th>Actions</th>
                </tr>
            </thead>
            <tbody>
                <GenreTableRow genres={genres}></GenreTableRow>
            </tbody>
        </Table>

    )
}

export default GenreTable