import {useState, useEffect} from 'react'
// const serverUrl = 'https://moviesdb.benitarosalind.site/movies'
let serverUrl = 'http://localhost:3000'

function useFetch(entity) {
    const [data, setData] = useState([])
    const [loading, setLoading] = useState(true)
    useEffect(() => {
        fetch(serverUrl + entity)
        .then(async (response) => {
            if(!response.ok){
                throw await response.text()
            }
            return response.json()
        }).
        then((data) => {
            setData(data)
        })
        .catch((err) => {
            console.log(err)
        })
        .finally(() => {
            setLoading(false)
        })
    }, [])
    return [data, loading]
}

export default useFetch