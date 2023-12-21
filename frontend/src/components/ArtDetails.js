import { useArtsContext } from "../hooks/useArtsContext"

//date fns
import formatDistanceToNow from 'date-fns/formatDistanceToNow'


const ArtDetails = ({art}) => {
    const { dispatch } = useArtsContext()
    
    const tags = art.tags
    const maptags = tags.map(tag => {
        return tag.concat(" ")
    })
    
    const handleClick = async () => {
        const response = await fetch('/api/arts/' + art._id, {
            method: 'DELETE'
        })
        const json = await response.json()

        if (response.ok) {
            dispatch({type: 'DELETE_ART', payload: json})
        }

    }

    return (
        <div className="art-details">
            <h2>{art.title}</h2>
            <p><strong>Title: </strong>{art.price} $</p>
            <p><strong>Stock: </strong>{art.stock}</p>
            <p><strong>Tags: </strong>{maptags}</p>
            <p><strong>Description: </strong>{art.description}</p>
            <p>{formatDistanceToNow(new Date(art.createdAt), {addSuffix: true})}</p>
            <span onClick={handleClick}>delete</span>
        </div>
    )
}

export default ArtDetails